<script>
    import '$scss/set/common.scss'
    import { spring } from 'svelte/motion';

    let isMobile;
    const mousePos = spring({ x:0, y:0 }, { stiffness:0.5 });
    const onLoad = () => {
        isMobile = window.matchMedia('(pointer:coarse)').matches;
    }
    const onMouseMove = (event) => {
        $mousePos = { x:event.x, y:event.y }
    }
    const onResize = () => {
        isMobile = window.matchMedia('(pointer:coarse)').matches;
    }
</script>

<svelte:head>
    <title>Portfolio</title>
</svelte:head>
<svelte:window
    on:mousemove={onMouseMove}
    on:load={onLoad}
    on:resize={onResize}
/>

{#if !isMobile}
<div 
    class="cursor"
    style:--x={`${$mousePos.x}px`}
    style:--y={`${$mousePos.y}px`}
>
</div>
{/if}
<main>
    <slot />
</main>