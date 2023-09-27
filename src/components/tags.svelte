<script lang="ts">
    export let tags

    import ProjectsJson from "$lib/json/Projects.json"

    let processedTags = []

    let jsonTags = ProjectsJson.tags

    for (let i = 0; i < Object.keys(jsonTags).length; i++) {
        for (let j = 0; j < tags.length; j++) {
            if(Object.keys(jsonTags)[i] === tags[j]) {
                processedTags.push(jsonTags[Object.keys(jsonTags)[i]])
            }
        }
    }
</script>


<div class="flex flex-wrap">
    {#each processedTags as tag}
        <span class=" ml-2 rounded p-0.5" style="background-color: {tag.color}">{tag.name}</span>
    {/each}
</div>