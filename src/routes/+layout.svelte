<script>
    import '$scss/set/common.scss'
    import { onMount } from 'svelte'
    import { spring } from 'svelte/motion'
    import Lenis from '@studio-freight/lenis'
    import { gsap } from 'gsap'
    import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
    import ScrollToPlugin from 'gsap/dist/ScrollToPlugin'
    import { throttle } from '$js/throttle'
    import Quick from '$comp/quick/Quick.svelte';
    
    gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);
    let isMobile, cursor, cc = '';
    let strokeOffset = 160;
    let lenis = new Lenis({
        syncTouch: true,
        syncTouchLerp: 0.1
    });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1400)
    });
    gsap.ticker.lagSmoothing(0)
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
            document.querySelector('main').setAttribute('data-lenis-prevent', true)
        } else{
            document.querySelector('main').removeAttribute('data-lenis-prevent')
        }
    }
    function matches(){
        return window.matchMedia('(pointer:coarse)').matches
    }
    const onScroll = () => {
        let progress = scrollY / (document.querySelector('main').offsetHeight - innerHeight);
        strokeOffset = 160 - progress*160;
    }
    function scrollTo(target){
        gsap.to(window, { scrollTo: target })
    }
    onMount(() => {
        isMobile = matches();
        if(isMobile){
            document.querySelectorAll('.fillText').forEach(x => {
                x.style.setProperty('--x', `1.5rem`)
                x.style.setProperty('--y', `-1.5rem`);
            });
            document.querySelector('main').setAttribute('data-lenis-prevent', true)
        } else{
            document.querySelector('main').removeAttribute('data-lenis-prevent')
        }
    })
</script>

<svelte:head>
    <title>Portfolio</title>
</svelte:head>
<svelte:window
    on:mousemove={onMouseMove}
    on:resize={onResize}
    on:scroll={throttle(onScroll, 50)}
/>

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
<Quick { strokeOffset } { scrollTo } />
<main>
    <slot />
</main>