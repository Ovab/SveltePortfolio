<script>
    import ProjectBlock from "../../components/ProjectBlock.svelte";
    import NavArrow from "../../components/NavArrow.svelte";
    import ProjectsJson from "$lib/json/projects.json";
</script>

<svelte:head>
    <title>Projecten</title>
    <meta name="description" content="Dit is de projecten pagina, zeer epik" />
</svelte:head>

<div class="h-full w-full flex flex-row">
    <NavArrow message="Home" url="/"/>
    <div class="flex flex-col w-full mx-2">
        <h1 class="text-3xl">
            Projecten
        </h1>
        <h2 class="text-2xl text-center">Werk</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-1 mt-3 gap-2">
            {#each Object.values(ProjectsJson.werk) as project}
                <ProjectBlock
                    name={project.name}
                    from="{project.from}"
                    to="{project.to}"
                    korteBeschrijving={project.korteBeschrijving}
                    langeBeschrijving={project.langeBeschrijving}
                    tags={project.tags}
                    img={project.img}
                    webUrl={project.webUrl}
                    gitUrl={project.gitUrl}
                />
            {/each}
        </div>
        <h2 class="text-2xl text-center">Projecten</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-1 mt-3 gap-2">
            {#each Object.values(ProjectsJson.projecten) as project}
                <ProjectBlock
                    name={project.name}
                    from="{project.from}"
                    to="{project.to}"
                    korteBeschrijving={project.korteBeschrijving}
                    langeBeschrijving={project.langeBeschrijving}
                    tags={project.tags}
                    img={project.img}
                    webUrl={project.webUrl}
                    gitUrl={project.gitUrl}
                />
            {/each}
        </div>
    </div>
    <NavArrow message="Contact" url="/contact" arrowRight="true"/>
</div>