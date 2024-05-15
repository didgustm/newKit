<script>
    import '$scss/section/intro.scss'
    import { onMount } from 'svelte'
    import Title from '$comp/common/Title.svelte'
    import Scroll from './Scroll.svelte'
    import { introScr } from '$js/utils';

    let title = {
        text: ['PORT', 'FOLIO'],
        x: 0,
        y: '50%',
        anchor: 'start'
    }
    onMount(() => introScr())
</script>

<section id="intro" class="intro">
    <div class="inner">
        <Title { title } />
        <p class="coment">Website, Landing Page <br>Responsive Web</p>
        <Scroll />
    </div>
</section>