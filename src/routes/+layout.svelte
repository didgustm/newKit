<script>
    import '$scss/set/common.scss'
    import { onMount } from 'svelte'
    import { spring } from 'svelte/motion'
    import { gsap } from 'gsap'
    import Fixed from '$comp/fixed/Fixed.svelte'

    let isMobile, w = 0, h = 0, cursor, cc = '';
    const mousePos = spring({ x:0, y:0 }, { stiffness:0.5 });
    const onMouseMove = (event) => {
        if(!isMobile){
            $mousePos = { x:event.x, y:event.y }
            document.querySelectorAll('.fillText').forEach(x => {
                x.style.setProperty('--x', `${(innerWidth/2 - $mousePos.x) * 0.03}px`)
                x.style.setProperty('--y', `${(innerHeight/2 - $mousePos.y) * 0.03}px`)
            });
            if(event.target.classList.contains('over')){
                cc = 'overlay'
            } else{
                cc = ''
            }
        }
    }
    const onResize = () => {
        isMobile = matches();
        if(isMobile){
            document.querySelectorAll('.fillText').forEach(x => {
                x.style.setProperty('--x', `1.5rem`)
                x.style.setProperty('--y', `-1.5rem`);
            });
        }
    }
    function matches(){
        return window.matchMedia('(pointer:coarse)').matches
    }
    onMount(() => {
        isMobile = matches();
        if(isMobile){
            document.querySelectorAll('.fillText').forEach(x => {
                x.style.setProperty('--x', `1.5rem`)
                x.style.setProperty('--y', `-1.5rem`);
            });
        }
    })
</script>

<svelte:head>
    <title>Portfolio</title>
</svelte:head>
<svelte:window
    on:mousemove={onMouseMove}
    on:resize={onResize}
    bind:innerWidth={w}
    bind:innerHeight={h}
/>

<Fixed { w } { h } />
{#if !isMobile}
<div 
    class="cursor { cc }"
    style:--x={`${$mousePos.x}px`}
    style:--y={`${$mousePos.y}px`}
    bind:this={cursor}
>
    <div class="scale"></div>
</div>
{/if}
<main>
    <slot />
</main>