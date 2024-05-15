<script>
    import Intro from '$comp/intro/Intro.svelte'
    import About from '$comp/about/About.svelte'
    import Portfolio from '$comp/portfolio/Portfolio.svelte'
    import Contact from '$comp/contact/Contact.svelte'

    export let data;
</script>

<Intro />
<About />
<Portfolio { data } />
<Contact />