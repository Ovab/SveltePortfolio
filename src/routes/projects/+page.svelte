<script>
    import ProjectBlock from "../../components/ProjectBlock.svelte";

    export const tags = [
        {
            "color": '#00dc82',
            "name": "Nuxt"
        },
        {
            "color":'#38bdf8',
            "name": "Tailwind"
        }
    ]
</script>

<div class="ml-10">
    <h1 class="text-3xl">
        Projecten
    </h1>

    <div class="grid col-span-3 grid-rows-3 mt-3">
        <ProjectBlock korteBeschrijving="yeyeyey" tags="{tags}" url="/projects"/>
    </div>
</div>