<script>
    import '$scss/section/about.scss'
    import Title from './Title.svelte'
    import Career from './Career.svelte'
    import Edu from './Edu.svelte'
    import Tools from './Tools.svelte'
    import Skills from './Skills.svelte'
</script>

<section id="about" class="about">
    <div class="bg02">
        <svg>
            <pattern id="dots" width="50" height="50" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="rgba(0,0,0,.3)" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
    </div>
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