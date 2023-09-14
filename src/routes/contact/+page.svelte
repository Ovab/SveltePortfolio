<script>
    import TextArea from "../../components/TextAreaAutoResize.svelte";
    import NavArrow from "../../components/NavArrow.svelte";
    let val = "";

    function submit() {
        const email = document.getElementById('email').value;
        const naam = document.getElementById('naam').value;
        const bericht = document.getElementById('bericht').value;

        console.log(email, naam, bericht);
    }
</script>

<div class="flex flex-row">
    <NavArrow message="Projects" url="/projects"/>
    <div class="flex place-self-center justify-center w-full">
        <div class="flex flex-col bg-gray-300 min-h-[222px] h-fit w-[30vw] rounded p-3 gap-2">
            <input type="text" class="bg-gray-100 rounded w-full p-0.5 pl-2" placeholder="Naam" id="naam">
            <input type="email" class="bg-gray-100 rounded w-full p-0.5 pl-2" placeholder="E-mail" id="email">
            <TextArea bind:value={val}
                    minRows={4}
                    maxRows={20}/>
            <button on:click={submit} type="submit" class="border text-center bg-gray-100" value="Verstuur" aria-roledescription="click to send">Verstuur</button>
        </div>


        <div class=" ml-10 flex flex-col bg-gray-300 h-[222px] w-[30vw] rounded p-3 gap-2">
            <p>
                Werkt die niet of wil je gewoon een mailtje sturen?
            </p>

            <p class="mt-auto"> Dat kan naar <a class="w-fit text-blue-400 underline" href="mailto:bavo.knol@student.hu.nl">bavo.knol@student.hu.nl</a><br>
                Of stuur een berichtje via <a class="w-fit text-blue-400 underline" href="https://www.linkedin.com/in/bavo/">LinkedIn</a><br>
                Of bel/whatsapp naar <a class="w-fit text-blue-400 underline" href="tel:+31619541435">+31 6 19541435</a>
            </p>


        </div>
    </div>
</div>