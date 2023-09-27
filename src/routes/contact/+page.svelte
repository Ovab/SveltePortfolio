<script>
    import TextArea from "../../components/TextAreaAutoResize.svelte";
    import NavArrow from "../../components/NavArrow.svelte";
    import ContactBg from "../../components/contactBg.svelte";
    import { PUBLIC_API_URL } from '$env/static/public'
    import { ofetch } from "ofetch";

    let naam = "";
    let email = "";
    let bericht = "";

    async function submit() {
        console.log(PUBLIC_API_URL)
        const res = await ofetch(PUBLIC_API_URL+`sendContactMail`, {
            method: 'POST',
            body: {
                naam:naam,
                email: email,
                bericht: bericht
            }
        }).catch((err) => {
            err.data; alert('Er is iets misgegaan, stuur aub handmatig een email met de gegevens hier naast')
        });

        if(res==='success') {
            alert('Het bericht is verstuurd')
        }
    }
</script>

<svelte:head>
    <title>Contact</title>
    <meta name="description" content="Dit is de contact pagina, zeer epik" />
</svelte:head>

<div class="flex flex-row fixed z-10 w-full fadeIn">
    <NavArrow message="Projects" url="/projects"/>
    <div class="flex flex-col md:flex-row
                md:place-self-center justify-center
                gap-2 w-full">

        <div class="flex flex-col
                    bg-gray-300 min-h-[222px]
                    md:w-[30vw] rounded-lg
                    p-3 gap-2">
            <span class="font-semibold text-xl text-center">Dit stuurt mij een email.</span>
            <input bind:value={naam} type="text" class="bg-gray-100 rounded w-full p-0.5 pl-2" placeholder="Naam">
            <input bind:value={email} type="email" class="bg-gray-100 rounded w-full p-0.5 pl-2" placeholder="E-mail">
            <TextArea bind:value={bericht}
                    minRows={4}
                    maxRows={20}/>
            <button on:click={submit} type="submit" class="border text-center bg-gray-100" value="Verstuur" aria-roledescription="click to send">Verstuur</button>
        </div>


        <div class="flex flex-col gap-2
                    md:w-[30vw]
                    bg-gray-300 rounded-lg p-3">
            <p class="font-semibold text-md text-center">
                Werkt die niet of wil je gewoon een mailtje sturen op de normale manier?
            </p>

            <p class="mt-auto"> Dat kan naar <a class="w-fit text-blue-400 underline" href="mailto:bavo.knol@student.hu.nl">bavo.knol@student.hu.nl</a><br>
                Of stuur een berichtje via <a class="w-fit text-blue-400 underline" href="https://www.linkedin.com/in/bavo/">LinkedIn</a><br>
                Of bel/whatsapp naar <a class="w-fit text-blue-400 underline" href="tel:+31619541435">+31 6 19541435</a>
            </p>


        </div>
    </div>


</div>

<ContactBg/>

<style>
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    .fadeIn{
        animation: fadeIn 6s;
    }
</style>