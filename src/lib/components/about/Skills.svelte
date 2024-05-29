<script>
    export let gauges;
    let skills = ['HTML', 'CSS', 'SCSS', 'JS', 'jQuery', 'Svelte', 'Vite']
</script>

<div class="about_list skills aos">
    <dl>
        <dt>SKILLS</dt>
        <dd>
            {#each skills as skill, idx}
            <div bind>
                <p>{skill}</p>
                <div class="track">
                    <div class="gauge gauge0{idx+1}" bind:this={gauges[idx]}></div>
                </div>
            </div>
            {/each}
        </dd>
    </dl>
</div>