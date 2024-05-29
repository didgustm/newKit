<script>
    import '$scss/section/contact.scss'
    import { onMount } from 'svelte'
    import Title from '$comp/common/Title.svelte'
    import List from './List.svelte'
    import { gsap } from 'gsap'
    import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

    gsap.registerPlugin(ScrollTrigger);
    let title = {
        text: ['CONTACT'],
        x: '100%',
        y: '100%',
        anchor: 'end'
    }
    onMount(() => {
        let cctMotion = gsap.timeline({ paused:true });
        cctMotion.to('.contact .outline', { strokeDashoffset:0, duration:2, ease:'none' })
        .fromTo('.contact .list li', { y:50, opacity:0 }, {  y:0, opacity:1 }, '-=1.5')
        .fromTo('.contact .fillText', { opacity:0 }, { opacity:1, ease:'none' }, '-=1');

        let ctx = gsap.context(() => {
            let scr = ScrollTrigger.create({
                trigger:'#contact',
                // start: 'center bottom',
                // end: 'bottom top',
                onEnter:() => {
                    cctMotion.play()
                },
                onLeaveBack:() => {
                    cctMotion.reverse(-1)
                }
            })
        });
        return () => ctx.revert();
    })
</script>

<section id="contact" class="contact">
    <div class="inner">
        <Title { title } />
        <List />
        <footer class="footer">
            <p>Copyright ©2024. my worklist</p>
        </footer>
    </div>
</section>