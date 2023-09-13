<script>
    export let value = '';
    export let minRows = 1;
    export let maxRows;

    $: minHeight = `${1 + minRows * 1.2}em`;
    $: maxHeight = maxRows ? `${1 + maxRows * 1.2}em` : `auto`;
</script>

<div class="relative">
	<pre
            aria-hidden="true"
            style="min-height: {minHeight}; max-height: {maxHeight}"
            class="rounded"
    >{value + '\n'}</pre>

    <textarea bind:value class="bg-gray-100 rounded p-0.5" id="bericht" placeholder="Bericht"></textarea>
</div>

<style>
    pre, textarea {
        font-family: inherit;
        padding: 0.5em;
        box-sizing: border-box;
        border: 1px solid #eee;
        line-height: 1.2;
        overflow: hidden;
    }

    textarea {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        resize: none;
    }
</style>