<script>
    import ProjectBlock from "../../components/ProjectBlock.svelte";
    import NavArrow from "../../components/NavArrow.svelte";
    import ProjectsJson from "$lib/json/projects.json";
    import ProjectBg from "../../components/projectBg.svelte";
</script>

<svelte:head>
    <title>Projecten</title>
    <meta name="description" content="Dit is de projecten pagina, zeer epik" />
</svelte:head>

<div class="h-full w-full flex flex-row fixed z-10">
    <NavArrow message="Home" url="/"/>
    <div class="flex flex-col w-full
                max-w-[74%] max-h-[50vh] md:max-h-[45vh]
                mt-[32%] md:mt-[25%] xl:mt-[15%] 2xl:mt-[20vh]
                overflow-y-auto overflow-x-clip">
        <h2 class="text-2xl text-center">Werk</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 grid-rows-1 mt-3 mx-2 gap-2">
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
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 grid-rows-1 mt-3 mx-4 gap-2">
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
    <NavArrow message="Contact" url="/contact" arrowRight=true/>
</div>

<ProjectBg/>