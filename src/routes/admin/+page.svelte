<script>
    import {ofetch} from "ofetch";
    import {PUBLIC_API_URL} from "$env/static/public";

    let availableTags = null;
    let projRes = null;
    let werkRes = null;

    let activeTags = [];
    let editorMode = false
    let tagEditorMode = false;
    let newWerk = false;

    function activateButt(id) {
        // check if the button is already active, if so remove it from the activeTags array
        if (activeTags.includes(id)) {
            activeTags.splice(activeTags.indexOf(id), 1);
        } else {
            activeTags.push(id);
        }
        document.getElementById(id).classList.toggle('!brightness-100');
    }

    function fillEdit(project){
        editorMode = true;
        tagEditorMode = false;
        newWerk = 1;

        setTimeout(()=>{
            let form = document.forms[0];

            for (let i = 0; i < form.length; i++) {
                if(form[i].name === 'to' || project[form[i].name] === 'from'){
                    console.log(project, form[i].name, project[form[i].name]);
                }

                form[i].value = project[form[i].name];
            }
        }, 100)
    }

    async function getTags() {
        await ofetch(PUBLIC_API_URL + `getTags`, {
            method: 'POST',
        }).then((res) => {
            availableTags = res.tags;
            return res;
        })
            .catch((err) => {
                err.data;
            });
    }

    async function getProjects() {
        await ofetch(PUBLIC_API_URL + `getProjects`, {
            method: 'POST',
        }).then((res) => {
            projRes = res.projects;
            werkRes = res.werk;
            return res;
        })
            .catch((err) => {
                err.data;
            });
    }

    async function addProject() {
        // get all the values from the form and put in object
        let form = document.forms[0];
        let formValues = {};
        for (let i = 0; i < form.length; i++) {
            if (form[i].value !== '') formValues[form[i].name] = form[i].value;
            else formValues[form[i].name] = null;
        }

        // set werk tag to 0 or 1
        formValues.werk = newWerk ? 1 : 0;


        // add tags to formValues
        formValues.tags = activeTags;

        // send formValues to api
        await ofetch(PUBLIC_API_URL + `addProject`, {
            method: 'POST',
            body: JSON.stringify(formValues)
        }).then((res) => {
            getProjects();
            alert('project added')
            return res;
        })
            .catch((err) => {
                alert('project not added')
                err.data;
            });
    }

    async function addTags() {
        let form = document.forms[0];
        let formValues = {};
        for (let i = 0; i < form.length; i++) {
            if (form[i].value !== '') formValues[form[i].name] = form[i].value;
            else formValues[form[i].name] = null;
        }

        // send formValues to api
        await ofetch(PUBLIC_API_URL + `addTag`, {
            method: 'POST',
            body: JSON.stringify(formValues)
        }).then((res) => {
            getTags();
            return res;
        })
            .catch((err) => {
                err.data;
            });
    }

    async function deleteThing (id, project = false) {
        let API = project ? 'removeProject' :'removeTag';

        // send formValues to api
        await ofetch(PUBLIC_API_URL + API, {
            method: 'POST',
            body: JSON.stringify({id:id})
        }).then((res) => {
            getTags();
            alert((project ? 'project': 'tag') + ' deleted')
            return res;
        })
            .catch((err) => {
                alert((project ? 'project': 'tag') + ' not deleted')
                err.data;
            });

        await getProjects();
        await getTags();
    }

    // get the data needed to render the page
    getTags();
    getProjects();
</script>


<div class="bg-blue-300 w-screen text-center p-[1vh]">
    DASHBOARD
</div>

<div class="flex flex-row w-screen h-full">
    <div class="bg-green-300 w-[15%] flex flex-col gap-8 pl-2">
        {#if projRes != null}
            <div>
                <div class="flex justify-between mr-5">
                    Werk
                    <button on:click={
                    ()=>{
                        editorMode = true;
                        tagEditorMode = false;
                        newWerk = 1;
                    }
                        }>+
                    </button>
                </div>
                <div class="flex flex-col gap-2 ml-2">
                    {#each werkRes as werk}
                        <span class="flex justify-between bg-purple-500 rounded p-1 w-[60%]">
                            <button on:click={
                                ()=>{
                                    fillEdit(werk);
                                }}>
                                {werk.projName}
                            </button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 class="cursor-pointer" viewBox="0 0 16 16"
                                 on:click={()=>deleteThing(werk.id, true)}>
                                <path
                                    d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                            </svg>
                        </span>
                    {/each}
                </div>
            </div>

            <div>
                <div class="flex justify-between mr-5">
                    Projecten
                    <button on:click={
                    ()=>{
                        editorMode = true;
                        tagEditorMode = false;
                        newWerk = 0;
                    }
                        }>+
                    </button>
                </div>
                <div class="flex flex-col ml-2">
                    {#each projRes as project}
                        <span class="flex justify-between bg-purple-500 rounded p-1 w-[60%]">
                            {project.projName}
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 class="cursor-pointer" viewBox="0 0 16 16"
                                 on:click={()=>deleteThing(project.id, true)}>
                                <path
                                    d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                            </svg>
                        </span>
                    {/each}
                </div>
            </div>
        {/if}

        {#if availableTags != null }
            <div>
                <div class="flex justify-between mr-5">
                    Tags
                    <button on:click={()=>{editorMode=true; tagEditorMode=true}}>+</button>
                </div>
                <div class="flex flex-col ml-2 gap-1 pb-2">
                    {#each availableTags as tag}
                        <span style="background-color: {tag.color}"
                              class="bg-pink-300 p-1 rounded w-[60%] flex justify-between">{tag.name}
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 class="cursor-pointer" viewBox="0 0 16 16" on:click={()=>deleteThing(tag.id, false)}>
                                  <path
                                      d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                            </svg>
                        </span>
                    {/each}
                </div>
            </div>
        {/if}
    </div>

    <div class="w-full py-2 bg-gray-300 border-l-2 border-black">
        {#if editorMode && !tagEditorMode}
            NIEUW {newWerk ? 'WERK' : 'PROJECT'} ITEM:
            <form class="flex flex-col mt-5 ml-2 gap-2 w-fit" on:submit={addProject}>
                <span class="text-xs">Naam</span><input type="text"
                                                        name="projName"
                                                        class="rounded ml-2 w-fit" required>

                <span class="text-xs">From Date</span> <input type="date"
                                                              name="from"
                                                              class="rounded ml-2 w-fit"/>

                <span class="text-xs">To Date</span> <input type="date"
                                                            name="to"
                                                            class="rounded ml-2 w-fit"/>

                <span class="text-xs">Korte beschrijving</span> <input type="text"
                                                                       name="korteBeschrijving"
                                                                       class="rounded ml-2 w-fit">

                <span class="text-xs">Lange beschrijving</span> <textarea name="langeBeschrijving"
                                                                          class="rounded ml-2"
                                                                          rows="4" cols="50"></textarea>

                <span class="text-xs">img</span> <input type="text"
                                                        name="img"
                                                        class="rounded ml-2 w-fit">

                <span class="text-xs">Alt</span> <input type="text"
                                                        name="alt"
                                                        class="rounded ml-2 w-fit">

                <span class="text-xs">Git url</span> <input type="text"
                                                            name="giturl"
                                                            class="rounded ml-2 w-fit">

                <span class="text-xs">Web url</span> <input type="text"
                                                            name="weburl"
                                                            class="rounded ml-2 w-fit">
                <div class="flex">
                    {#if newWerk}
                        <span class="text-xs w-fit">Werk</span><input type="checkbox" name="werk" class="w-fit ml-2 mt-px" checked/>

                    {:else}
                        <span class="text-xs w-fit">Werk</span>
                        <input type="checkbox"
                               name="werk"
                               class="w-fit ml-2 mt-px"/>
                    {/if}
                </div>

                <span class="text-xs w-fit">Tags</span>
                <div class="w-fit ml-2 mt-1 flex gap-2">
                    {#if availableTags != null}
                        {#each availableTags as tag}
                            <div class="bg-pink-300 p-1.5 rounded cursor-pointer brightness-50 select-none"
                                 on:click={() => {activateButt(tag.id)}}
                                 id="{tag.id}" style="background-color: {tag.color}">
                                {tag.name}
                            </div>
                        {/each}
                    {/if}
                </div>

                <input type="submit" class="bg-gradient-to-r from-[#eda4b2] to-[#58c8f2]
                                            rounded cursor-pointer mt-3" name="submit" value="submit">
            </form>
        {:else if editorMode && tagEditorMode}
            TAG EDITOR

            <form class="flex flex-col mt-5 ml-2 gap-2 w-fit" on:submit={addTags}>
                <span class="text-xs">Naam</span> <input name="name" class="rounded ml-2 w-fit" type="text" required>
                <span class="text-xs">Kleur</span> <input name="color" class="rounded ml-2 border-black" type="color"
                                                          required>

                <input type="submit" class="bg-gradient-to-r from-[#eda4b2] to-[#58c8f2]
                                            rounded cursor-pointer mt-3" name="submit" value="submit">
            </form>
        {:else}
            <h3 class="text-3xl font-semibold">Select function in side bar</h3>

        {/if}
    </div>
</div>