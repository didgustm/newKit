<script>
    import { onMount } from 'svelte'
    import { gsap } from 'gsap'
    import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
    import Fixed from '$comp/fixed/Fixed.svelte'
    import Intro from '$comp/intro/Intro.svelte'
    import About from '$comp/about/About.svelte'
    import Portfolio from '$comp/portfolio/Portfolio.svelte'
    import Contact from '$comp/contact/Contact.svelte'

    export let data;
    gsap.registerPlugin(ScrollTrigger);
    let w=0, h=0;
    onMount(() => {
        let pin = gsap.timeline({
            scrollTrigger: {
                trigger: '.fixBg',
                pin: true,
                scrub: 0,
                // end: `+=${document.querySelector('main').offsetHeight}`,
                onUpdate: ({ progress }) => {
                    console.log(progress)
                   // rx = progress*2* 150
                    //gsap.to('.rect01', { rx:progress*150 })
                }
            }
        });
        
    })
</script>

<svelte:window
    bind:innerWidth={w}
    bind:innerHeight={h}
/>

<Fixed { w } { h } />
<Intro />
<About />
<Portfolio { data } />
<Contact />