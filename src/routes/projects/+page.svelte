<script>
    import ProjectBlock from "../../components/ProjectBlock.svelte";

    export const tags = [
        {
            "name": "Nuxt",
            "color": '#00dc82'
        },
        {
            "name": "Tailwind",
            "color":'#38bdf8'

        },
        {
            "name": "Svelte",
            "color":'#ff0080'
            
        },
        {
            "name": "Laravel",
            "color": "#ff2e63"
        }
    ]
</script>

<div class="mx-10">
    <h1 class="text-3xl">
        Projecten
    </h1>

    <h2 class="text-2xl text-center">Werk</h2>
    <div class="grid grid-cols-3 grid-rows-1 mt-3 gap-2">
        <ProjectBlock name="Jaspers Media" korteBeschrijving="sample text" tags="{tags}" img="/assets/logo-jm.png" url="/projects"/>
        <ProjectBlock korteBeschrijving="yeyeyey" tags="{tags}" img="/assets/test.jpg" url="/projects"/>
        <ProjectBlock korteBeschrijving="yeyeyey" tags="{tags}" img="/assets/test.jpg" url="/projects"/>
    </div>
    <h2 class="text-2xl text-center">Projecten</h2>
    <div class="grid grid-cols-3 grid-rows-1 mt-3 gap-2">
        <ProjectBlock korteBeschrijving="yeyeyey" tags="{tags}" img="/assets/test.jpg" url="/projects"/>
        <ProjectBlock korteBeschrijving="yeyeyey" tags="{tags}" img="/assets/test.jpg" url="/projects"/>
        <ProjectBlock korteBeschrijving="yeyeyey" tags="{tags}" img="/assets/test.jpg" url="/projects"/>
    </div>
</div>