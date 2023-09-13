<script>
    import ProjectBlock from "../../components/ProjectBlock.svelte";
    import NavArrow from "../../components/NavArrow.svelte";

    export const tags = [
        {
            "name": "Nuxt",
            "color": '#00dc82'
        },
        {
            "name": "Tailwind",
            "color": '#38bdf8'

        },
        {
            "name": "Svelte",
            "color": '#ff0080'

        },
        {
            "name": "Laravel",
            "color": "#ff2e63"
        }
    ]
</script>

<div class="h-full w-full flex flex-row">
    <NavArrow message="Home" url="/"/>
    <div class="flex flex-col w-full mx-2">
        <h1 class="text-3xl">
            Projecten
        </h1>

        <h2 class="text-2xl text-center">Werk</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 grid-rows-1 mt-3 gap-2">
            <ProjectBlock name="Jaspers Media" korteBeschrijving="sample text" tags="{tags}" img="/assets/logo-jm.png"
                          url="/projects"/>
            <ProjectBlock korteBeschrijving="yeyeyey" tags="{tags}" img="/assets/test.jpg" url="/projects"/>
            <ProjectBlock korteBeschrijving="yeyeyey" tags="{tags}" img="/assets/test.jpg" url="/projects"/>
        </div>
        <h2 class="text-2xl text-center">Projecten</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 grid-rows-1 mt-3 gap-2">
            <ProjectBlock korteBeschrijving="yeyeyey" tags="{tags}" img="/assets/test.jpg" url="/projects"/>
            <ProjectBlock korteBeschrijving="yeyeyey" tags="{tags}" img="/assets/test.jpg" url="/projects"/>
            <ProjectBlock korteBeschrijving="yeyeyey" tags="{tags}" img="/assets/test.jpg" url="/projects"/>
        </div>
    </div>
    <NavArrow message="Contact" url="/contact" arrowRight="true"/>
</div>