<script>
    import ProjectBlock from "../../components/ProjectBlock.svelte";
    import NavArrow from "../../components/NavArrow.svelte";
    import ProjectsJson from "$lib/json/projects.json";
    import ProjectBg from "../../components/projectBg.svelte";

    import {PUBLIC_API_URL} from '$env/static/public';
    import {onMount} from "svelte";
    import {ofetch} from "ofetch";

    let animationDone = false;

    let passwordTries = 0

    async function checkPassword(retrying = false) {
        if(passwordTries === 5) {alert('You have tried to many times'); return;}

        const triesLeft = 5 - passwordTries

        const wrongPassString = "Wrong password, please try again, you have " + triesLeft + " tries left"

        const pass = prompt(retrying ? wrongPassString : "enter password")

        if(pass === null) return;

        await ofetch(PUBLIC_API_URL+`checkPassword`, {
            method: 'POST',
            body: {
                password:pass
            }
        }).catch((err) => {
            err.data; alert('Er is iets misgegaan, stuur aub handmatig een email met de gegevens hier naast')
        }).then((res) => {
            if(res.status === 'succes'){
                window.open('/admin', '_blank')
            }
            else{
                passwordTries++;
                checkPassword(true)
            }
        })
    }

    const fetchAll = (async () => {
        const responseProj = await fetch(PUBLIC_API_URL+'getProjects',
            {
                method: 'GET',
            })
        const responseTags = await fetch(PUBLIC_API_URL+'getTags',
            {
                method: 'GET',
            })

        const projects = await responseProj.json()
        const tags = await responseTags.json()

        const response = {'getProjects':projects, tags}

        return await response
    })

    onMount(() => {
        const pattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        let current = 0;
        let startInterval = false

        function setToZero() {
            current = 0;
            startInterval = false

            clearInterval(setToZero)
        }

        if(startInterval) {
            setInterval(setToZero, 5000)
        }

        const keyHandler = function (event) {
            // If the key isn't in the pattern, or isn't the current key in the pattern, reset
            if (pattern.indexOf(event.key) < 0 || event.key !== pattern[current]) {
                current = 0;
                return;
            }

            // Update how much of the pattern is complete
            current++;

            if(current === 1) {
                startInterval = true
            }

            // If complete, alert and reset
            if (pattern.length === current) {
                current = 0;
                clearInterval(setToZero)
                checkPassword()
            }

        };

// Listen for keydown events
        document.addEventListener('keydown', keyHandler, false);
    })
</script>

<svelte:head>
    <title>Projecten</title>
    <meta name="description" content="Dit is de projecten pagina, zeer epik"/>
</svelte:head>

<div class="h-full w-full flex flex-row fixed z-10">
    <NavArrow message="Home" url="/"/>
    {#await fetchAll()}
        {:then data}
            <div class="flex flex-col w-full
                        max-w-[74%] max-h-[50vh] md:max-h-[45vh]
                        mt-[32%] md:mt-[25%] xl:mt-[15%] 2xl:mt-[20vh]
                        overflow-y-auto overflow-x-clip">
                <h2 class="text-2xl text-center">Werk</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 grid-rows-1 mt-3 mx-2 gap-2">
                    {#each Object.values(data.getProjects.werk) as project, counter}
                        <div class="h-[250px] md:h-[10vh] xl:h-[30vh]">
                            <ProjectBlock
                                name={project.name}
                                from="{project.from}"
                                to="{project.to}"
                                korteBeschrijving={project.korteBeschrijving}
                                langeBeschrijving={project.langeBeschrijving}
                                tags={project.tags}
                                allTags={data.tags.tags}
                                img={project.img}
                                alt={project.alt}
                                webUrl={project.webUrl}
                                gitUrl={project.gitUrl}
                                animationDone={animationDone}
                                counter="{counter}"
                            />
                        </div>
                    {/each}
                </div>
                <h2 class="text-2xl text-center">Projecten</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 grid-rows-1 mt-3 mx-4 gap-2">
                    {#each Object.values(data.getProjects.projects) as project, counter}
                        <div class="h-[250px] md:h-[10vh] xl:h-[30vh]">
                            <ProjectBlock
                                name={project.name}
                                from="{project.from}"
                                to="{project.to}"
                                korteBeschrijving={project.korteBeschrijving}
                                langeBeschrijving={project.langeBeschrijving}
                                tags={project.tags}
                                allTags={data.tags.tags}
                                img={project.img}
                                alt={project.alt}
                                webUrl={project.webUrl}
                                gitUrl={project.gitUrl}
                                animationDone={animationDone}
                                counter="{counter}"
                            />
                        </div>
                    {/each}
                </div>
            </div>
        {:catch error}
            <p>{error.message}</p>
    {/await}
    <NavArrow message="Contact" url="/contact" arrowRight=true/>
</div>

<ProjectBg bind:animationDone={animationDone}/>