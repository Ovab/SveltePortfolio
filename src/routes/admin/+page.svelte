<script>
    import {ofetch} from "ofetch";
    import {PUBLIC_API_URL} from "$env/static/public";

    let projRes = null;
    let werkRes = null;

    async function getTags() {
        const resTags = await ofetch(PUBLIC_API_URL + `getTags`, {
            method: 'POST',
        }).catch((err) => {
            err.data;
            alert('Er is iets misgegaan, stuur aub handmatig een email met de gegevens hier naast')
        });
    }

    async function getProjects() {
        await ofetch(PUBLIC_API_URL + `getProjects`, {
            method: 'POST',
        }).then((res) => {
            projRes = res.projects;
            werkRes = res.werk;
            console.log(projRes[0], werkRes);
            return res;
        })
            .catch((err) => {
                err.data;
                alert('Er is iets misgegaan, stuur aub handmatig een email met de gegevens hier naast')
            });
    }

    getProjects();

</script>


<div class="bg-blue-300 w-screen text-center p-[1vh]">
    DASHBOARD
</div>

<div class="flex flex-row w-screen min-h-[95vh]">
    <div class="bg-green-300 w-[15%] flex flex-col gap-8 pl-2">
        {#if projRes != null}
            <div>
                Werk
                <div class="flex flex-col ml-2">
                    {#each werkRes as werk}
                        {werk.projName}
                    {/each}
                </div>
            </div>

            <div>
                Projecten
                <div class="flex flex-col ml-2">
                    {#each projRes as project}
                        {project.projName}
                    {/each}
                </div>
            </div>
        {/if}
    </div>

    <div class="bg-purple-500 w-full">
        yeyegtfyud
    </div>
</div>