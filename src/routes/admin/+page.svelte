<script>
    import {ofetch} from "ofetch";
    import {PUBLIC_API_URL} from "$env/static/public";

    let availableTags = null;
    let projRes = null;
    let werkRes = null;

    let activeTags = [];
    let addMode = false
    let tagAdderMode = false;

    let editorMode = false;
    let editingID = null;

    let newWerk = false;

    let checkBoxValue = newWerk;


    function checkIfActive(name) {
        let toCheck = newWerk ? werkRes : projRes;
        // get the project you're editing by the id
        let project = toCheck.find((project) => {
            return project.id === editingID;
        });

        // check if the project has the tag
        for (let i = 0; i < project.tags.length; i++) {
            if (project.tags[i].name === name) {
                // if so, add it to the activeTags array and return true to add the active class
                activeTags.push(project.tags[i].id);
                return true
            }
        }
        return false;
    }
    function activateButt(id) {
        // check if the button is already active, if so remove it from the activeTags array
        if (activeTags.includes(id)) {
            activeTags.splice(activeTags.indexOf(id), 1);
        } else {
            activeTags.push(id);
        }
        document.getElementById(id).classList.toggle('!brightness-100');
    }

    function startAdd(werk, tagEdit = false) {
        addMode = true;
        newWerk = werk;
        checkBoxValue = werk;
        tagAdderMode = tagEdit;

        editorMode = false;
        editingID = null;
        // check if form needs to be cleared
        setTimeout(() => {
            let form = document.forms[0];
            if (form[0].value !== '') {
                for (let i = 0; i < form.length; i++) {
                    if (form[i].name === 'submit') continue;
                    form[i].value = '';
                }
            }
        }, 0)
    }

    function startEdit(project = null, werk = false, tagEdit = false) {
        editorMode = true;
        tagAdderMode = tagEdit;
        newWerk = werk;
        checkBoxValue = werk;
        editingID = project.id;
        activeTags = [];

        // timeout van 0ms zodat de form al gerenderd is (zodat het aan het einde van de event loop staat)
        setTimeout(() => {
            let form = document.forms[0];

            for (let i = 0; i < form.length; i++) {
                if (form[i].name === 'submit') continue;
                if (form[i].name === 'to' || form[i].name === 'from') {
                    if (project[form[i].name] === null) continue;

                    const inputDate = new Date(project[form[i].name]);

                    function padNumber(num) {
                        return num.toString().padStart(2, '0');
                    }

                    const year = inputDate.getUTCFullYear();
                    const month = padNumber(inputDate.getUTCMonth() + 1); // Months are zero-based
                    const day = padNumber(inputDate.getUTCDate());

                    project[form[i].name] = `${year}-${month}-${day}`;
                }

                form[i].value = project[form[i].name];
            }
        }, 0)
    }

    async function getTags() {
        await ofetch(PUBLIC_API_URL + `getTags`, {
            method: 'GET',
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
            method: 'GET',
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
        formValues.werk = checkBoxValue ? 1 : 0;


        // add tags to formValues
        formValues.tags = activeTags;

        if(editorMode){
            await deleteThing(editingID, true);
        }

        // send formValues to api
        await ofetch(PUBLIC_API_URL + `addProject`, {
            method: 'POST',
            body: JSON.stringify(formValues)
        }).then((res) => {
            getProjects();
            alert('project ' + (editorMode ? 'edited' : 'added') + ' successfully')
            return res;
        })
            .catch((err) => {
                alert('project not ' + (editorMode ? 'edited' : 'added') + ' successfully')
                err.data;
            });

        activeTags = [];
        addMode = false
        tagAdderMode = false;

        editorMode = false;
        editingID = null;

        newWerk = false;
    }

    async function addTags() {
        let form = document.forms[0];
        let formValues = {};
        for (let i = 0; i < form.length; i++) {
            if (form[i].value !== '') formValues[form[i].name] = form[i].value;
            else formValues[form[i].name] = null;
        }

        if(editorMode){
            await deleteThing(editingID, false);
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

    async function deleteThing(id, project = false) {
        let API = project ? 'removeProject' : 'removeTag';

        // send formValues to api
        await ofetch(PUBLIC_API_URL + API, {
            method: 'POST',
            body: JSON.stringify({id: id})
        }).then((res) => {
            getTags();
            if(!editorMode)alert((project ? 'project' : 'tag') + ' deleted')
            return res;
        })
            .catch((err) => {
                if(!editorMode)alert((project ? 'project' : 'tag') + ' not deleted')
                err.data;
            });

        if(editorMode) return;

        await getProjects();
        await getTags();
    }

    // get the data needed to render the page
    getTags();
    getProjects();
</script>


<div class="bg-blue-300 max-w-screen flex justify-center p-[0.8vh] h-[4vh]">
    SUPER EPIK GAMER DASHBOARD
</div>

<div class="flex flex-row max-w-screen h-full">
    <!--Sidebar-->
    <div class="bg-gray-300 w-[15%] min-h-[96vh] overflow-y-auto flex flex-col gap-8 pl-2">
        {#if projRes != null}
            <div>
                <div class="flex justify-between mr-5">
                    Werk
                    <button class="hover:text-green-600 hover:font-semibold hover:scale-150 transition-all"
                            on:click={()=>{
                        startAdd(1);
                    }}>+
                    </button>
                </div>
                <div class="flex flex-col gap-2 ml-2">
                    {#each werkRes as werk}
                            <span class="flex justify-between bg-gray-800 text-white rounded p-1 w-[60%]">
                            <button on:click={
                                ()=>{
                                    if(!editorMode) startEdit(werk, true);
                                    else {
                                        editorMode = false;
                                        setTimeout(() => {startEdit(werk, true)}, 0)
                                    }
                                }}>
                                {werk.projName}
                            </button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 class="cursor-pointer hover:fill-red-500 hover:scale-[1.3] transition-all" viewBox="0 0 16 16"
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
                    <button class="hover:text-green-600 hover:font-semibold hover:scale-150 transition-all"
                            on:click={()=>{
                        startAdd(0);
                    }}>+
                    </button>
                </div>
                <div class="flex flex-col gap-2 ml-2">
                    {#each projRes as project}
                        <span class="flex justify-between bg-purple-500 rounded p-1 w-[60%]">
                                <button on:click={()=>{
                                    if(!editorMode) startEdit(project, false);
                                    else {editorMode = false; setTimeout(() => {startEdit(project, false)}, 0)}
                                }}>
                                {project.projName}
                            </button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 class="cursor-pointer hover:fill-red-500 hover:scale-[1.3] transition-all" viewBox="0 0 16 16"
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
                    <button class="hover:text-green-600 hover:font-semibold hover:scale-150 transition-all"
                        on:click={()=>{startAdd(false, true)}}>+</button>
                </div>
                <div class="flex flex-col ml-2 gap-1 pb-2">
                    {#each availableTags as tag}
                        <button style="background-color: {tag.color}"
                              on:click={
                                ()=>{
                                    if(!editorMode) startEdit(tag, true, true);
                                    else {
                                        editorMode = false;
                                        setTimeout(() => {startEdit(tag, true, true)}, 0)
                                    }
                                }}
                              class="bg-pink-300 p-1 rounded w-[60%] flex justify-between">
                            {tag.name}
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 class="cursor-pointer hover:scale-[1.3] transition-all" viewBox="0 0 16 16" on:click={()=>deleteThing(tag.id, false)}>
                                  <path
                                      d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                            </svg>
                        </button>
                    {/each}
                </div>
            </div>
        {/if}
    </div>

    <!--Editor-->
    <div class="w-full h-fit min-h-[96vh] pl-2 py-2 bg-gray-100 border-l-2 overflow-y-auto border-black">
        {#if (addMode || editorMode) && !tagAdderMode}
            {editorMode ? 'EDIT' : 'NIEUW'} {newWerk ? 'WERK' : 'PROJECT'} ITEM:
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
                                                                       maxlength="255"
                                                                       name="korteBeschrijving"
                                                                       class="rounded ml-2 w-fit">

                <span class="text-xs">Lange beschrijving</span> <textarea name="langeBeschrijving"
                                                                          class="rounded ml-2"
                                                                          rows="4" cols="50"></textarea>

                <span class="text-xs">img</span> <input type="text"
                                                        name="img"
                                                        class="rounded ml-2 w-fit">

                <span class="text-xs">Alt</span> <input type="text"
                                                        maxlength="150"
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
                        <span class="text-xs w-fit">Werk</span>
                        <input type="checkbox"
                               name="werk"
                               class="w-fit ml-2 mt-px"
                               bind:checked = {checkBoxValue}
                        />

                    {:else}
                        <span class="text-xs w-fit">Werk</span>
                        <input type="checkbox"
                               name="werk"
                               class="w-fit ml-2 mt-px"
                               bind:checked = {checkBoxValue}
                        />
                    {/if}
                </div>

                <span class="text-xs w-fit">Tags</span>
                <div class="w-fit ml-2 mt-1 flex gap-2">
                    {#if availableTags != null && editorMode}
                        {#each availableTags as tag}
                            <div class="bg-pink-300 p-1.5 rounded cursor-pointer brightness-50 select-none {checkIfActive(tag.name) ? '!brightness-100' : ''}"
                                 on:click={() => {activateButt(tag.id)}}
                                 id="{tag.id}" style="background-color: {tag.color}">
                                {tag.name}
                            </div>
                        {/each}

                        {:else}
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

        {:else if (addMode || editorMode) && tagAdderMode}
            TAG EDITOR

            <form class="flex flex-col mt-5 ml-2 gap-2 w-fit" on:submit={addTags}>
                <span class="text-xs">Naam</span> <input name="name" class="rounded ml-2 w-fit" type="text" required>
                <span class="text-xs">Kleur</span> <input name="color" class="rounded ml-2 border-black" type="color"
                                                          required>
                <span class="text-xs">ordering</span> <input name="ordering" class="rounded ml-2 w-fit"
                                                                  type="number" placeholder="default = 999">

                <input type="submit" class="bg-gradient-to-r from-[#eda4b2] to-[#58c8f2]
                                            rounded cursor-pointer mt-3" name="submit" value="submit">
            </form>
        {:else}
            <h3 class="text-3xl font-semibold">Select function in side bar</h3>

        {/if}
    </div>
</div>

<style>
    input, textarea {
        @apply border border-gray-500;
    }
</style>