<script>
    import '$scss/section/about.scss'
    import { onMount } from 'svelte'
    import Title from './Title.svelte'
    import Career from './Career.svelte'
    import Edu from './Edu.svelte'
    import Tools from './Tools.svelte'
    import Skills from './Skills.svelte'
    import { aboutScr } from '$js/utils';

    let motion = false;
    onMount(() => aboutScr(motion))
</script>

<section id="about" class="about">
    <div class="inner">
        <Title />
        <div class="c_info">
            <div class="left">
                <Career />
                <Edu />
            </div>
            <div class="right">
                <Tools />
                <Skills />
            </div>
        </div>
    </div>
</section>