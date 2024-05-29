<script>
    import '$scss/section/about.scss'
    import { onMount } from 'svelte'
    import Title from './Title.svelte'
    import Career from './Career.svelte'
    import Edu from './Edu.svelte'
    import Tools from './Tools.svelte'
    import Skills from './Skills.svelte'
    import { gsap } from 'gsap'
    import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

    export let h;

    gsap.registerPlugin(ScrollTrigger);
    let mm = gsap.matchMedia();
    let toolItems = [], gauges = [];
    onMount(() => {
        let ctx = gsap.context(() => {        
            let pin = gsap.timeline({
                scrollTrigger: {
                    trigger: '#about',
                    pin: true,
                    scrub: 0.5,
                    end: `+=${3000}`,
                    endTrigger: '.about'
                }
            });

            mm.add('(min-width:768px)', () => {
                pin.fromTo('.about .title .dot', {scale:0}, {scale:1, ease:'none', duration:2})
                .to('.about .title', {xPercent:-80, delay:1, duration:3})
                .fromTo('.career', {yPercent:100, opacity:0}, {yPercent:-50, opacity:1, delay:1, duration:2})
                .to('.career', {yPercent:-150, opacity:0, delay:2, duration:2})
                .fromTo('.edu', {yPercent:100, opacity:0}, {yPercent:-50, opacity:1, delay:1, duration:2}, '<')
                .to('.edu', {yPercent:-150, opacity:0, delay:2, duration:2})
                .fromTo('.tools', {yPercent:100, opacity:0}, {yPercent:-50, opacity:1, delay:1, duration:2,
                    onStart: () => {
                        toolItems.forEach(x => {
                            gsap.fromTo(x.querySelector('img'), {scale:0}, {scale:1, delay:0.3})
                            gsap.fromTo(x.querySelector('p'), {yPercent:100, opacity:0}, {yPercent:0, opacity:1, delay:0.6})
                        })
                    }
                }, '<')
                .to('.tools', {yPercent:-150, opacity:0, delay:2, duration:2})
                .fromTo('.skills', {yPercent:100, opacity:0}, {yPercent:-50, opacity:1, delay:1, duration:2,
                    onStart: () => {
                        gauges.forEach((x, idx) => {
                            gsap.fromTo(x, {scaleX:0}, {scaleX:1, duration:0.8, ease:'none', delay:(idx+1)*0.15})
                        })
                    }
                }, '<')
            });
            mm.add('(max-width:768px)', () => {
                pin.fromTo('.about .title .dot', {scale:0}, {scale:1})
                .to('.about .title', {yPercent:-100, delay:1, duration:3})
                .to('.about .title', {scale:0.7, delay:1, duration:2})
                .fromTo('.career', {xPercent:100, opacity:0}, {xPercent:5, opacity:1, delay:1, duration:2}, '<')
                .to('.career', {xPercent:-100, opacity:0, delay:2, duration:2})
                .fromTo('.edu', {xPercent:100, opacity:0}, {xPercent:5, opacity:1, delay:1, duration:2})
                .to('.edu', {xPercent:-100, opacity:0, delay:2, duration:2})
                .fromTo('.tools', {xPercent:100, opacity:0}, {xPercent:5, opacity:1, delay:1, duration:2,
                    onStart: () => {
                        toolItems.forEach(x => {
                            gsap.fromTo(x.querySelector('img'), {scale:0}, {scale:1, delay:0.3})
                            gsap.fromTo(x.querySelector('p'), {yPercent:100, opacity:0}, {yPercent:0, opacity:1, delay:0.6})
                        })
                    }
                }, '<')
                .to('.tools', {xPercent:-100, opacity:0, delay:2, duration:2})
                .fromTo('.skills', {xPercent:100, opacity:0}, {xPercent:5, opacity:1, delay:1, duration:2,
                    onStart: () => {
                        gauges.forEach((x, idx) => {
                            gsap.fromTo(x, {scaleX:0}, {scaleX:1, duration:0.8, ease:'none', delay:(idx+1)*0.15})
                        })
                    }
                }, '<')
            })
        });
        return () => ctx.revert();

    })
</script>

<section id="about" class="about">
    <div class="inner">
        <Title />
        <Career />
        <Edu />
        <Tools { toolItems } />
        <Skills { gauges } />
    </div>
</section>