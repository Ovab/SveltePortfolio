<script>
    import {ofetch} from "ofetch";
    import {PUBLIC_API_URL} from "$env/static/public";

    async function getTags() {
        const resTags = await ofetch(PUBLIC_API_URL + `getTags`, {
            method: 'POST',
        }).catch((err) => {
            err.data;
            alert('Er is iets misgegaan, stuur aub handmatig een email met de gegevens hier naast')
        });
    }

    async function getProjects() {
        const resProj = await ofetch(PUBLIC_API_URL + `getProjects`, {
            method: 'POST',
        }).catch((err) => {
            err.data;
            alert('Er is iets misgegaan, stuur aub handmatig een email met de gegevens hier naast')
        });
        return resProj;
    }

</script>


<div class="bg-blue-300 w-screen text-center p-[1vh]">
    DASHBOARD
</div>

<div class="flex flex-row w-screen min-h-[95vh]">
    <div class="bg-green-300 w-[15%]">
        haii :3
    </div>
    <div class="bg-purple-500 w-full">
        yeyegtfyud
    </div>
</div>