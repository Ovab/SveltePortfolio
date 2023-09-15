<script>
    import NavRight from "../components/NavArrow.svelte";
</script>

<svelte:head>
    <title>Home | Bavo</title>
    <meta name="description" content="Bavo's personal website">
</svelte:head>

<div class="h-full w-full flex flex-row">
    <div class="flex flex-col justify-center items-center h-screen w-full">
        <h1>Heya 👋, it is I Bavo</h1>
        <div class="flex flex-row gap-2">
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