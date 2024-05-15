<script>
    import '$scss/set/canvas.scss'
    import { onMount } from 'svelte'
    import { Canvas } from '$js/canvas';

    let canvas;
    onMount(() => {
        let m = new Canvas(canvas)
    })
</script>

<div class="canvas" bind:this={canvas}></div>