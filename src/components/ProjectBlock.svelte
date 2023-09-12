<script lang="ts">
    import Tags from "./tags.svelte";
    export let korteBeschrijving;
    export let tags;
</script>

<div class="w-[500px] h-[250px] rounded">
    <img class="rounded" src="/assets/test.jpg" alt="yYEET">
    <div class="relative -translate-y-[70px] bg-gray-800/70 h-[70px] rounded">
        <p class="text-white ml-2">{korteBeschrijving}</p>

        <Tags tagName="nuxt" tags="{tags}"/>
    </div>
</div>