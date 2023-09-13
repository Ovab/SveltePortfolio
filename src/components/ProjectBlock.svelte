<script lang="ts">
    import Tags from "./tags.svelte";

    export let name
    export let korteBeschrijving;
    export let tags;

    export let img;

    let openMore = false;
    function openMoreHandler() {
        openMore = true;
    }

    function closeMoreHandler(event = event) {
        // make sure you're clicking the black stuff and not inside the info box
        if(event.target.id == "outerDiv") openMore = false;
    }
</script>

<div class="group cursor-pointer" on:click={openMoreHandler}>
    <div class="h-[250px] rounded bg-gray-500 group-hover:scale-105 transition-all">
        <div class="flex justify-center overflow-hidden">
            <img class="rounded object-cover h-[250px] group-hover:scale-110 transition-all" src="{img}" alt="yYEET">
        </div>
        <div class="relative -translate-y-[70px] bg-gray-800/70 h-[70px] rounded grid grid-cols-2">
            <div>
                <p class="text-white ml-2 font-semibold">{name}</p>
                <Tags tagName="nuxt" tags="{tags}"/>
            </div>

            <p class="text-white ml-2">{korteBeschrijving}</p>
        </div>
    </div>
</div>

{#if openMore}
    <div class="absolute z-50 h-screen w-screen bg-black/40 top-0 left-0" id="outerDiv" on:click={closeMoreHandler}>
        <div class="bg-white h-[40vw] w-[60vw] rounded translate-x-[33%] translate-y-[10%] flex p-2" id="innerDiv">
            <img class="rounded object-scale-down w-[40%] group-hover:scale-110 transition-all bg-gray-500" src="{img}" alt="yYEET">
        </div>
    </div>
{/if}