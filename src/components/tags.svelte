<div class="flex flex-wrap">
    {#each tags as tag}
        <span class=" ml-2 rounded p-0.5" style="background-color: {tag.color}">{tag.name}</span>
    {/each}
</div>

<script lang="ts">
    export let tags
</script>