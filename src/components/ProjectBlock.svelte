<script lang="ts">
    import Tags from "./tags.svelte";
    export let name
    export let korteBeschrijving;
    export let tags;

    export let img
</script>
<div class="group">
<div class=" h-[250px] rounded bg-gray-500 group-hover:scale-105 transition-all">
    <div class="flex justify-center overflow-hidden">
            <img class="rounded object-cover h-[250px] group-hover:scale-110 transition-all" src="{img}" alt="yYEET">
    </div>
    <div class="relative -translate-y-[70px] bg-gray-800/70 h-[70px] rounded flex flex-row">
        <div class="w-[50%]">
            <p class="text-white ml-2 font-semibold">{name}</p>
            <Tags tagName="nuxt" tags="{tags}"/>
        </div>

        <p class="text-white ml-2">{korteBeschrijving}</p>
    </div>
</div>
</div>