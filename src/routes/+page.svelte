<script lang="ts">
    import NavRight from "../components/NavArrow.svelte";

    import { browser } from '$app/environment';
    import * as THREE from "three"

    if(browser) {
        let camera : THREE.PerspectiveCamera;
        let scene : THREE.Scene;
        let renderer : THREE.WebGLRenderer;
        let cube : THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>;

        const init = () => {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

            renderer = new THREE.WebGLRenderer();
            renderer.setSize( window.innerWidth, window.innerHeight );
            document.getElementById('threeBody').appendChild( renderer.domElement );

            const geometry = new THREE.BoxGeometry( 2, 2, 2 );
            const material = new THREE.MeshBasicMaterial( { color: 0x9c332c } );
            cube = new THREE.Mesh( geometry, material );
            scene.add( cube );

            camera.position.z = 5;
        }

        const render = () => {
            renderer.clear()
            renderer.render(scene, camera);
        }

        const animate = () => {
            requestAnimationFrame(animate)

            cube.rotation.x += 0.005
            cube.rotation.y += 0.005

            render()
        }

        init()
        animate()
    }
</script>

<svelte:head>
    <title>Home | Bavo</title>
    <meta name="description" content="Bavo's personal website">
</svelte:head>

<div class="relative z-10 h-full w-full flex flex-row">
    <div class="flex flex-col justify-center items-center h-screen w-full">
        <h1>Heya 👋, it is I Bavo</h1>
        <div class="flex flex-row gap-2 bg-white">
            <div>Ik ben een:</div>
            <ul>
                <li>Ict'er</li>
                <li class="opacity-80">Computer Tovenaar</li>
                <li class="opacity-60">Professionele idioot Googler</li>
                <li class="opacity-40">Doodad doer</li>
                <li class="opacity-20">Funni maker</li>
                <li class="opacity-10">Idk what to put here</li>
            </ul>
        </div>
    </div>

    <NavRight message="projects" url="/projects" arrowRight="true"/>
</div>


<div class="-translate-y-full" id="threeBody">

</div>