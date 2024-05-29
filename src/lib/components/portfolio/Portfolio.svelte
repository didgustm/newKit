<script>
    import '$scss/section/portfolio.scss'
    import { onMount } from 'svelte'
    import Title from '$comp/common/Title.svelte'
    import List from './List.svelte'
    import { gsap } from 'gsap'
    import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

    export let data;
    gsap.registerPlugin(ScrollTrigger);
    let title = {
        text: ['WORK LIST'],
        x: 0,
        y: '100%',
        anchor: 'start'
    }
    onMount(() => {
        let pfMotion = gsap.timeline({ paused:true });
        pfMotion.to('.portfolio .outline', { strokeDashoffset:0, duration:2, ease:'none' })
        .fromTo('.portfolio swiper-slide:nth-child(odd)', { opacity:0, xPercent:-50 }, { opacity:1, x:0, xPercent:0, duration:1 }, '-=1.5')
        .fromTo('.portfolio swiper-slide:nth-child(even)', { opacity:0, xPercent:50 }, { opacity:1, x:0, xPercent:0, duration:1 }, '<')
        .fromTo('.portfolio .fillText', { opacity:0 }, { opacity:1, ease:'none' }, '-=1');

        let ctx = gsap.context(() => {
            let scr = ScrollTrigger.create({
                trigger:'#portfolio',
                onEnter:() => {
                    pfMotion.play()
                },
                onLeaveBack:() => {
                    pfMotion.reverse(-1)
                }
            })
        });
        return () => ctx.revert();
    })
</script>

<section id="portfolio" class="portfolio">
    <div class="inner">
        <Title { title } />
        <List { data } />
    </div>
</section>