<script>
    import '$scss/section/contact.scss'
    import { onMount } from 'svelte'
    import Title from '$comp/common/Title.svelte'
    import List from './List.svelte'
    import { contactScr } from '$js/utils';

    let motion = false;
    let title = {
        text: ['CONTACT'],
        x: '100%',
        y: '100%',
        anchor: 'end'
    }
    onMount(() => contactScr(motion))
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