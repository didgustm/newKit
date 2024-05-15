<script>
    import '$scss/section/portfolio.scss'
    import { onMount } from 'svelte'
    import Title from '$comp/common/Title.svelte'
    import List from './List.svelte'
    import { pfScr } from '$js/utils';

    export let data;
    let motion = false;
    let title = {
        text: ['WORK LIST'],
        x: 0,
        y: '100%',
        anchor: 'start'
    }
    onMount(() => pfScr(motion))
</script>

<section id="portfolio" class="portfolio">
    <div class="inner">
        <Title { title } />
        <List { data } />
    </div>
</section>