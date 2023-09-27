<script lang="ts">
    import {browser} from '$app/environment';
    import {onMount} from "svelte";
    import * as THREE from "three";
    // import studio from '@theatre/studio'
    import {getProject, types} from '@theatre/core'
    import projectState from '$lib/json/homeIntroAnimation.json'

    import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';

    function rgbToHex(r, g, b) {
        const toHex = (value) => {
            const hex = Math.round(value * 255).toString(16);
            return hex.length === 1 ? "0" + hex : hex;
        };

        const redHex = toHex(r);
        const greenHex = toHex(g);
        const blueHex = toHex(b);

        return `#${redHex}${greenHex}${blueHex}`;
    }
    onMount(() => {
        if (browser) {
        // studio.initialize()

        const project = getProject('THREE.js x Theatre.js', { state: projectState })
        const sheet = project.sheet('Animated scene')
        const scene = new THREE.Scene()

        const camera = new THREE.PerspectiveCamera()
        camera.aspect = window.innerWidth / window.innerHeight
        const cameraObj = sheet.object("camera", {
            controls: types.compound({
                fov: types.number(70, {range: [10, 200]}),
                near: types.number(10, {range: [0, 100]}),
                far: types.number(200, {range: [0, 1000]}),
            }),

            position: types.compound({
                x: types.number(0, {nudgeMultiplier: 0.1}),
                y: types.number(0, {nudgeMultiplier: 0.1}),
                z: types.number(0, {nudgeMultiplier: 0.1})
            }),

            rotation: types.compound({
                xR: types.number(0, {range: [-2, 2]}),
                yR: types.number(0, {range: [-2, 2]}),
                zR: types.number(0, {range: [-2, 2]})
            })
        }, {reconfigure: true})
        cameraObj.onValuesChange((values) => {
            const {x, y, z} = values.position
            const {xR, yR, zR} = values.rotation
            camera.position.set(x, y, z)
            camera.rotation.set(xR * Math.PI, yR * Math.PI, zR * Math.PI)

            const {fov, aspect, near, far} = values.controls
            camera.fov = fov
            camera.near = near
            camera.far = far
            camera.updateProjectionMatrix()
        })

        const loader = new GLTFLoader();

        let modelLoaded = false
        loader.load('assets/projectRoom.glb', function (gltf) {

            const gltfObj = sheet.object('model', {
                rotation: types.compound({
                    xR: types.number(gltf.scene.rotation.x, {range: [-2, 2]}),
                    yR: types.number(gltf.scene.rotation.y, {range: [-2, 2]}),
                    zR: types.number(gltf.scene.rotation.z, {range: [-2, 2]}),
                }),
                scale: types.compound({
                    scale: types.number(gltf.scene.scale.y, {range: [-1000, 1000]})
                })
            }, {reconfigure: true})

            gltfObj.onValuesChange((values) => {
                const {scale} = values.scale
                gltf.scene.scale.set(scale, scale, scale)


                const {xR, yR, zR} = values.rotation
                gltf.scene.rotation.set(xR * Math.PI, yR * Math.PI, zR * Math.PI)
            })

            scene.add(gltf.scene);

            modelLoaded = true;
        }, undefined, function (error) {
            console.error(error);
        });

        const overHeadLight = new THREE.DirectionalLight('#ffffff', 10 /* , 0, 1 */)
        overHeadLight.castShadow = true

        overHeadLight.shadow.mapSize.width = 200
        overHeadLight.shadow.mapSize.height = 200
        overHeadLight.shadow.camera.far = 50
        overHeadLight.shadow.camera.near = 1
        overHeadLight.shadow.camera.top = 20
        overHeadLight.shadow.camera.right = 20
        overHeadLight.shadow.camera.bottom = -20
        overHeadLight.shadow.camera.left = -20

        const overHeadLightObj = sheet.object('Overhead Light', {
            color: types.rgba(),
            intensity: types.number(1, {range: [0, 10]}),
            position: types.compound({
                x: types.number(overHeadLight.position.x, {nudgeMultiplier: 0.1}),
                y: types.number(overHeadLight.position.y, {nudgeMultiplier: 0.1}),
                z: types.number(overHeadLight.position.z, {nudgeMultiplier: 0.1})
            }),
        }, {reconfigure: true})
        overHeadLightObj.onValuesChange((values) => {
            const {x, y, z} = values.position
            overHeadLight.position.set(x, y, z)

            overHeadLight.color.set(rgbToHex(values.color.r, values.color.g, values.color.b))
            overHeadLight.intensity = values.intensity
        })
        scene.add(overHeadLight)

        const certsLight = new THREE.RectAreaLight('#00ffff', 1, 50, 50)
        const certsLightObj = sheet.object('certsLight', {
            color: types.rgba(),
            intensity: types.number(1, {range: [0, 10]}),
            position: types.compound({
                x: types.number(certsLight.position.x, {nudgeMultiplier: 0.1}),
                y: types.number(certsLight.position.y, {nudgeMultiplier: 0.1}),
                z: types.number(certsLight.position.z, {nudgeMultiplier: 0.1})
            }),
            rotation: types.compound({
                xR: types.number(certsLight.rotation.x, {range: [-2, 2]}),
                yR: types.number(certsLight.rotation.y, {range: [-2, 2]}),
                zR: types.number(certsLight.rotation.z, {range: [-2, 2]}),
            })
        }, {reconfigure: true})
        certsLightObj.onValuesChange((values) => {
            const {x, y, z} = values.position
            certsLight.position.set(x, y, z)

            certsLight.color.set(rgbToHex(values.color.r, values.color.g, values.color.b))
            certsLight.intensity = values.intensity

            const {xR, yR, zR} = values.rotation
            certsLight.rotation.set(xR * Math.PI, yR * Math.PI, zR * Math.PI)
        })
        scene.add(certsLight)

        const bg = new THREE.Color();
        const bgObj = sheet.object('Background', {
            color: types.rgba(),
        })
        bgObj.onValuesChange((values) => {
            const {color} = values
            bg.set(rgbToHex(color.r, color.g, color.b))
            scene.background = bg
        })



        // Renderer
        const renderer = new THREE.WebGLRenderer({antialias: true})

        renderer.shadowMap.enabled = true
        renderer.shadowMap.type = THREE.VSMShadowMap
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio,1))
        renderer.render(scene, camera)

        document.getElementById('threeBody').appendChild(renderer.domElement)

        // Update the screen
        function tick(): void {
            renderer.render(scene, camera)

            window.requestAnimationFrame(tick)
        }

        function onWindowResize() {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize( window.innerWidth, window.innerHeight );

        }

        function controlAnimation(e) {
            if (e.key === "r") {
                sheet.sequence.play()
            }
            else if (e.key === "p") {
                sheet.sequence.play()
                sheet.sequence.pause()
            }
        }


            addEventListener('resize', onWindowResize)

        window.addEventListener("keydown", controlAnimation);

        tick()

        project.ready.then(() => {
            for (let i = 0; i < i; i++) {
                if(modelLoaded) break;
            }
            sheet.sequence.play()
        })
    }
    })
</script>

<div class="fixed" id="threeBody">

</div>