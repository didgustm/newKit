<script>
    import { onMount } from 'svelte'
    import Canvas from './Canvas.svelte'
    import Bg01 from './Bg01.svelte'
    import Bg02 from './Bg02.svelte'
    import Bg03 from './Bg03.svelte';

    export let w, h;
    onMount(() => {
        
    })
</script>

<div class="fixBg">
    <Canvas />
    <Bg01 { w } { h } />
    <Bg02 />
    <!-- <Bg03 /> -->
</div>