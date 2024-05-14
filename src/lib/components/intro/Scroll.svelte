<script>
    import Fa from 'svelte-fa'
    import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
</script>

<div class="scrollDown">
    <p>SCROLL DOWN</p>
    <div class="shape">
        <svelte:component this={ Fa } icon={ faArrowDown } size="1x" />
    </div>
</div>