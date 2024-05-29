<script>
    import '$scss/section/intro.scss'
    import { onMount } from 'svelte'
    import Title from '$comp/common/Title.svelte'
    import Scroll from './Scroll.svelte'
    import GridBg from '$comp/common/GridBg.svelte'
    import { gsap } from 'gsap'
    import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

    gsap.registerPlugin(ScrollTrigger);
    export let w, h;
    let title = {
        text: ['PORT', 'FOLIO'],
        x: 0,
        y: '50%',
        anchor: 'start'
    }
    onMount(() => {
        let ctx = gsap.context(() => {
            let g = gsap.timeline({ duration:0.8 });
            g.to('.intro .outline', { strokeDashoffset:0, duration:2, ease:'none' })
            .fromTo('.intro .fillText', { opacity:0 }, { opacity:1, ease:'none' }, '-=1')
            .fromTo('.scrollDown', { opacity:0, xPercent:50 }, { opacity:1, xPercent:0 }, '<')
            .fromTo('.intro .coment', { opacity:0, yPercent:100 }, { opacity:1, yPercent:0 }, '-=0.5');
        });
        return () => ctx.revert()
    })
</script>

<section id="intro" class="intro">
    <GridBg { w } { h } />
    <div class="inner">
        <Title { title } />
        <p class="coment">Website, Landing Page <br>Responsive Web</p>
        <Scroll />
    </div>
</section>