<script>
    export let title;
</script>

<h2 class="title aos">
    <svg class="svgText">
        <text class="outline"
            x={title.x} y={title.y} text-anchor={title.anchor} fill="#000" stroke="#fff" stroke-width="1.5" paint-order="stroke"
        >
            {#each title.text as text, idx}
                <tspan x="0" dy={`${idx*50}%`} alignment-baseline="text-top">{text}</tspan>
            {/each}
        </text>
    </svg>
    <div class="fillText">
        {#each title.text as text}
        <p>{text}</p>
        {/each}
    </div>
</h2>