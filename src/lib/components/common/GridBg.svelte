<script>    
    export let w, h
</script>

<div class="grid_bg">
    <svg>
        <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <rect width="100" height="100" fill="none"/>
                <path d="M 100 0 L 0 0 0 100" fill="#000" stroke="rgba(255,255,255,.25)" stroke-width="1"/>
            </pattern>
            <linearGradient id="grd" x1="0%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stop-color="transparent" />
                <stop offset="100%" stop-color="#000" />
            </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <g class="lines" stroke-width="1" fill="transparent">
            <path
                class="line01"
                d="M150,0 L150,150 300,150 300,300 450,300 450,500 350,500 350,650 300,650 300,{h}"
                stroke="#74F0ED"
                opacity="0.8"
                fill="transparent"
            />
            <path 
                class="line02"
                d="M0,250 L{w},250"
                stroke="#fff"
                opacity="0.3"
            />
            <path 
                class="line03"
                d="M{w},400 0,400"
                stroke="#74F0ED"
                opacity="0.3"
            />
            <path 
                class="line04"
                d="M{Math.floor( (w/1.2) / 100 ) * 100},0 {Math.floor((w/1.2)/100) * 100},{h}"
                stroke="#fff"
                opacity="0.5"
            />
            <path 
                class="line05"
                d="M{Math.floor( (w/2) / 100 ) * 100},0 L{Math.floor( (w/2) / 100 ) * 100},50 {Math.floor( (w/2) / 100 ) * 100 + 50},50 {Math.floor( (w/2) / 100 ) * 100 + 50},100 {Math.floor( (w/2) / 100 ) * 100 + 150},100, {Math.floor( (w/2) / 100 ) * 100 + 150},150 {Math.floor( (w/2) / 100 ) * 100 + 250},150 {Math.floor( (w/2) / 100 ) * 100 + 250},50 {Math.floor( (w/2) / 100 ) * 100 + 300},50 {Math.floor( (w/2) / 100 ) * 100 + 300},0"
                stroke="#74F0ED"
                opacity="0.5"
            />
        </g>
        <rect width="100%" height="100%" fill="url(#grd)" />
    </svg>
</div>