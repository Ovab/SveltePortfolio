<script lang="ts">
    export let tags

    export let allTags

    import ProjectsJson from "$lib/json/projects.json"
    function getTags() {
        let processedTags = []
        for (let i = 0; i < allTags.length; i++) {
            for (let j = 0; j < tags.length; j++) {
                if(allTags[i].id === tags[j].id) {
                    processedTags.push(allTags[i])
                }
            }
        }

        return processedTags
    }
</script>


<div class="flex flex-wrap h-fit gap-1.5 mt-0.5">
    {#each getTags() as tag}
        <span class="rounded p-0.5" style="background-color: {tag.color}">{tag.name}</span>
    {/each}
</div>