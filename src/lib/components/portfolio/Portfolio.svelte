<script>
    import '$scss/section/portfolio.scss'
    import Title from './Title.svelte'
    import List from './List.svelte';

    export let data;
</script>

<section id="portfolio" class="portfolio">
    <div class="grdBg"></div>
    <div class="inner">
        <Title />
        <List { data } />
    </div>
</section>