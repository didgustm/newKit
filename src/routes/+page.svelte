<script>
    import Matter from '$comp/common/Matter.svelte'
    import Intro from '$comp/intro/Intro.svelte'
    import About from '$comp/about/About.svelte'
    import Portfolio from '$comp/portfolio/Portfolio.svelte'
    import Contact from '$comp/contact/Contact.svelte'

    export let data;
    let w = 0, h = 0;
</script>

<svelte:window
    bind:innerWidth={w}
    bind:innerHeight={h}
/>

<Matter />
<Intro { w } { h } />
<About { w } { h } />
<Portfolio { data } />
<Contact />