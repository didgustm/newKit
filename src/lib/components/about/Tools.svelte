<script>
    import vscode from '$img/about/vscode.svg'
    import github from '$img/about/github.svg'
    import psd from '$img/about/psd.svg'
    import figma from '$img/about/figma.svg'
    import xd from '$img/about/xd.svg'
    import ai from '$img/about/ai.svg';

    export let toolItems;
    let items = [
        {
            img: vscode,
            text: 'VSCode'
        },
        {
            img: github,
            text: 'Github',
            invert: true
        },
        {
            img: psd,
            text: 'Photoshop'
        },
        {
            img: figma,
            text: 'Figma'
        },
        {
            img: xd,
            text: 'Adobe XD'
        },
        {
            img: ai,
            text: 'Illustrator'
        }
    ]
</script>

<div class="about_list tools aos">
    <div class="shape04">
        <div class="bar bar01"></div>
        <div class="bar bar02"></div>
        <div class="bar bar03"></div>
        <div class="bar bar04"></div>
    </div>
    <dl>
        <dt>TOOLS</dt>
        <dd>
            {#each items as item, idx}
            <div class="item" bind:this={toolItems[idx]}>
                {#if item.invert}
                <img class="invert" src="{item.img}" alt="{item.text}">
                {:else}
                <img src="{item.img}" alt="{item.text}">
                {/if}
                <p>{item.text}</p>
            </div>
            {/each}
        </dd>
    </dl>
</div>