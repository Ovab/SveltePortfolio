<script lang="ts">
    import {browser} from '$app/environment';
    import * as THREE from "three";
    import studio from '@theatre/studio'
    import {getProject, types} from '@theatre/core'

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


    if (browser) {
        studio.initialize()

        const project = getProject('THREE.js x Theatre.js')

        const sheet = project.sheet('Animated scene')


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
        })
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

        // Scene
        const scene = new THREE.Scene()

        const loader = new GLTFLoader();
        loader.load('src/3d/projectRoom.glb', function (gltf) {

            gltf.scene.traverse(function (child) {
                if ((child as THREE.Mesh).isMesh) {
                    const m = child as THREE.Mesh;
                    m.castShadow = true;
                    m.receiveShadow = true;
                }
            })

            const gltfObj = sheet.object('model', {
                rotation: types.compound({
                    xR: types.number(gltf.scene.rotation.x, {range: [-2, 2]}),
                    yR: types.number(gltf.scene.rotation.y, {range: [-2, 2]}),
                    zR: types.number(gltf.scene.rotation.z, {range: [-2, 2]}),
                }),
                scale: types.compound({
                    scale: types.number(gltf.scene.scale.y, {range: [-1000, 1000]})
                })
            })

            gltfObj.onValuesChange((values) => {
                const {scale, zSc} = values.scale
                gltf.scene.scale.set(scale, scale, scale)


                const {xR, yR, zR} = values.rotation
                gltf.scene.rotation.set(xR * Math.PI, yR * Math.PI, zR * Math.PI)
            })

            scene.add(gltf.scene);

        }, undefined, function (error) {

            console.error(error);

        });


        /*        const geometryKnot = new THREE.TorusKnotGeometry(10, 3, 300, 16)
                const materialKnot = new THREE.MeshStandardMaterial({
                    color: '#049ef4',
                    metalness: 0.3,
                    roughness: 0.5,
                })
                const mesh = new THREE.Mesh(geometryKnot, materialKnot)
                mesh.castShadow = true
                mesh.receiveShadow = true
                scene.add(mesh)

                const geometryCone = new THREE.ConeGeometry(5, 20, 32);
                const materialCone = new THREE.MeshStandardMaterial({
                    color: 0xffff00,
                    metalness: 0.3,
                    roughness: 0.99,
                });
                const cone = new THREE.Mesh(geometryCone, materialCone);
                cone.castShadow = true
                cone.receiveShadow = true
                scene.add(cone);


                const torusKnotObj = sheet.object('Torus Knot', {
                    // Note that the rotation is in radians
                    // (full rotation: 2 * Math.PI)
                    rotation: types.compound({
                        x: types.number(mesh.rotation.x, {range: [-2, 2]}),
                        y: types.number(mesh.rotation.y, {range: [-2, 2]}),
                        z: types.number(mesh.rotation.z, {range: [-2, 2]}),
                    }),
                })
                const coneObj = sheet.object('Cone', {
                    rotation: types.compound({
                        xR: types.number(cone.rotation.x, {range: [-2, 2]}),
                        yR: types.number(cone.rotation.y, {range: [-2, 2]}),
                        zR: types.number(cone.rotation.z, {range: [-2, 2]}),
                    }),

                    position: types.compound({
                        xP: types.number(0, {nudgeMultiplier: 0.1}),
                        yP: types.number(0, {nudgeMultiplier: 0.1}),
                        zP: types.number(0, {nudgeMultiplier: 0.1})
                    })
                })
                torusKnotObj.onValuesChange((values) => {
                    const {x, y, z} = values.rotation

                    mesh.rotation.set(x * Math.PI, y * Math.PI, z * Math.PI)
                })
                coneObj.onValuesChange((values) => {
                    const {xP, yP, zP} = values.position
                    cone.position.set(xP, yP, zP)


                    const {xR, yR, zR} = values.rotation
                    cone.rotation.set(xR * Math.PI, yR * Math.PI, zR * Math.PI)
                })*/


        /*
        * Fog
        */

        const fog = new THREE.Fog('#1f30b2', 1, 15)
        const fogObj = sheet.object('Fog', {
            color: types.rgba(),
            near: 0,
            far: 100,
        })

        fogObj.onValuesChange((values) => {
            const {color, near, far} = values
            fog.color.set(rgbToHex(color.r, color.g, color.b))
            fog.near = near
            fog.far = far
            scene.fog = fog
        })

        scene.fog = fog

        /*
         * Lights
         */
        // Ambient Light
        const ambientLight = new THREE.AmbientLight('#ffffff', 0.5)
        scene.add(ambientLight)

        // Point light
        const directionalLight = new THREE.DirectionalLight('#ffffff', 10 /* , 0, 1 */)
        directionalLight.position.y = 20
        directionalLight.position.z = 20

        directionalLight.castShadow = true

        directionalLight.shadow.mapSize.width = 2048
        directionalLight.shadow.mapSize.height = 2048
        directionalLight.shadow.camera.far = 50
        directionalLight.shadow.camera.near = 1
        directionalLight.shadow.camera.top = 20
        directionalLight.shadow.camera.right = 20
        directionalLight.shadow.camera.bottom = -20
        directionalLight.shadow.camera.left = -20

        const directionalLightObj = sheet.object('Directional Light', {
            color: types.rgba(),
            intensity: types.number(1, {range: [0, 10]}),
            position: types.compound({
                x: types.number(directionalLight.position.x, {nudgeMultiplier: 0.1}),
                y: types.number(directionalLight.position.y, {nudgeMultiplier: 0.1}),
                z: types.number(directionalLight.position.z, {nudgeMultiplier: 0.1})
            }),
        })

        directionalLightObj.onValuesChange((values) => {
            const {x, y, z} = values.position
            directionalLight.position.set(x, y, z)

            directionalLight.color.set(rgbToHex(values.color.r, values.color.g, values.color.b))
            directionalLight.intensity = values.intensity
        })

        scene.add(directionalLight)

        // RectAreaLight
        const rectAreaLight = new THREE.RectAreaLight('#ff0', 1, 50, 50)

        const rectAreaLightObj = sheet.object('Rect Area Light', {
            color: types.rgba(),
            intensity: types.number(1, {range: [0, 10]}),
            position: types.compound({
                x: types.number(rectAreaLight.position.x, {nudgeMultiplier: 0.1}),
                y: types.number(rectAreaLight.position.y, {nudgeMultiplier: 0.1}),
                z: types.number(rectAreaLight.position.z, {nudgeMultiplier: 0.1})
            }),
        })

        rectAreaLightObj.onValuesChange((values) => {
            const {x, y, z} = values.position
            rectAreaLight.position.set(x, y, z)

            rectAreaLight.color.set(rgbToHex(values.color.r, values.color.g, values.color.b))
            rectAreaLight.intensity = values.intensity
        })

        scene.add(rectAreaLight)

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
        renderer.shadowMap.type = THREE.PCFSoftShadowMap
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.render(scene, camera)

        document.getElementById('threeBody').appendChild(renderer.domElement)

        // Update the screen
        function tick(): void {
            renderer.render(scene, camera)

            window.requestAnimationFrame(tick)
        }

        tick()
    }
</script>

<div class="fixed" id="threeBody">

</div>