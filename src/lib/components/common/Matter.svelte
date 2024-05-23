<script>
    import { onMount } from 'svelte'
    import { gsap } from 'gsap'
    import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
    import Matter from 'matter-js'
    import { throttle } from '$js/throttle';

    let canvas;
    let frameCount = 0;
    let particles = [], diff;
    gsap.registerPlugin(ScrollTrigger);
    onMount(() => {
        const sections = document.querySelectorAll('section');
        // setup
        const { Engine, Runner, Render, Bodies, Body, Common, Composite, Constraint, Svg, Events } = Matter;
        const engine = Engine.create(),
                    runner = Runner.create(),
                    world = engine.world,
                    render = Render.create({
                        element: canvas,
                        engine: engine,
                        pixelRatio: window.devicePixelRatio,
                        options: {
                            width: 1600,
                            height: innerHeight,
                            wireframes: false,
                            background: 'transparent'
                        }
                    });
        Render.run(render);
        Runner.run(runner, engine);
        let group = Body.nextGroup(true);

        // floor
        let floor = Bodies.rectangle(800, innerHeight+10, 1600, 20, {
            isStatic: true,
            label: 'floor',
            render: { fillStyle: '#fff' }
        });

        // circle
        let circleA = Bodies.circle(800, innerHeight * 0.4, 100, {
            slop: 0.8,
            label: 'part01',
            render: {
                fillStyle: '#74F0ED'
            }
        }),
        circleAC = Constraint.create({
            pointA: Matter.Vector.clone(circleA.position),
            bodyB: circleA,
            stiffness: 0.01,
            damping: 0.5,
            render: {
                visible: false
            }
        });

        // triangle
        let triA = Bodies.polygon(950, innerHeight*0.6, 3, 100, {
            slop: 0.8,
            label: 'part01',
            chamfer: { radius:10 },
            restitution: 0,
            friction: 0,
            inertia: 3200,
            render: {
                fillStyle: '#EA445A'
            }
        }),
        triAC = Constraint.create({
            pointA: Matter.Vector.clone(triA.position),
            bodyB: triA,
            render: {
                visible: false
            }
        });
        let triB = Bodies.polygon(1070, innerHeight*0.48, 3, 80, {
            slop: 1,
            label: 'part01',
            chamfer: { radius:10 },
            restitution: 0,
            friction: 0,
            render: {
                fillStyle: '#74F0ED'
            }
        }),
        triBC = Constraint.create({
            pointA: Matter.Vector.clone(triB.position),
            bodyB: triB,
            render: {
                visible: false
            }
        });

        // stack
        let stack = Matter.Composites.stack(50, 80, 20, innerHeight / 60 - 3, 80, 60, function(x, y, row, column){
            if(column % 2 == 0){
                return Bodies.circle(x, y, 1, { restitution:1, friction:1, isStatic:true, label:'static', collisionFilter: { group }, render: { fillStyle: 'rgba(255,255,255,.3)' } })
            } else{
                return Bodies.circle(100+(row*81), y, 1, { restitution:1, friction:1, isStatic:true, label:'static', collisionFilter: { group }, render: { fillStyle: 'rgba(255,255,255,.3)' } })
            }
        });

        // mobil
        let moA = Bodies.circle(800, 0, 50, {
            restitution:0,
            friction:1,
            render: {
                fillStyle: '#fff'
            }
        }),
        moAC = Constraint.create({
            pointA: Matter.Vector.clone(moA.position),
            bodyB: moA,
            length: innerHeight / 4,
            stiffness: 0.001,
            damping: 0.01,
            render: {
                type: 'line',
                anchors: false
            }
        }),
        partA = Bodies.rectangle(900, 0, 140, 30, {
            chamfer: { radius: 10 },
            render: { fillStyle: '#74F0ED' }
        }),
        partB = Bodies.rectangle(900, 0, 30, 140, {
            chamfer: { radius: 10 },
            render: { fillStyle: partA.render.fillStyle }
        }),
        compound = Body.create({
            restitution: 0,
            inertia: 1600,
            parts: [ partA, partB ],
            inertia: innerWidth * 10
        }),
        comp = Constraint.create({
            pointA: Matter.Vector.clone(compound.position),
            bodyB: compound,
            length: innerHeight / 2.3,
            stiffness: 0.003,
            render: { 
                type: 'line',
                anchors: false
            }
        }),
        moC = Bodies.polygon(700, 0, 3, 80, {
            slop: 0.8,
            chamfer: { radius:10 },
            restitution: 0,
            friction: 0,
            inertia: 0,
            render: {
                fillStyle: '#EA445A'
            }
        }),
        moCC = Constraint.create({
            pointA: Matter.Vector.clone(moC.position),
            bodyB: moC,
            length: innerHeight / 2.5,
            stiffness: 0.005,
            damping: 0.05,
            render: {
                type: 'line',
                anchors: false
            }
        })
        
        // add
        Composite.add(world, floor);
        Composite.add(world, [circleA, circleAC, triA, triAC, triB, triBC]);

        Events.on(engine, 'collisionStart', e => {
            let pairs = e.pairs;
            for(var i = 0, j = pairs.length; i != j; ++i){
                let pair = pairs[i];
                if(pair.bodyA.label != 'static' && pair.bodyB.label != 'static'){
                    if(pair.bodyA.label == 'particle' && pair.bodyB.label != 'particle'){
                        pair.bodyA.render.fillStyle = pair.bodyB.render.fillStyle
                    } else if(pair.bodyB.label == 'particle' && pair.bodyA.label != 'particle'){
                        pair.bodyB.render.fillStyle = pair.bodyA.render.fillStyle
                    }
                }
                if(pair.bodyA.label == 'static' && pair.bodyB.label != 'static'){
                    pair.bodyA.render.fillStyle = '#fff'
                }
            }
        });

        // particles
        newParticle();
        Events.on(engine, 'afterUpdate', throttle(() => {
            frameCount++;
            if(frameCount % 10 == 0){
                newParticle();
            }
            particles.forEach((x, idx) => {
                if(x.isOffScreen()){
                    Composite.remove(world, x.body)
                    particles.splice(idx, 1);
                }
            });
        }, 100));

        function Particle(x, y, r){
            let options = {
                restitution: 0.6,
                friction: 0,
                frictionStatic: 0.1,
                label: 'particle',
                slop: 0.1,
                render: { fillStyle: '#fff' }
            }
            this.body = Bodies.circle(x, y, r, options);
            this.r = r;
            Composite.add(world, this.body);

            this.isOffScreen = () => {
                let pos = this.body.position;
                let speed = this.body.speed
                return (pos.x < -50 || pos.x > 1650 || (speed < 0.1 && pos.y > 100))
            }
        }
        function newParticle(){
            let p = new Particle(Common.random(600, 1000), 0, Common.random(18,30));
            particles.push(p);
        }

        sections.forEach((x, idx) => {
            ScrollTrigger.create({
                trigger: x,
                start: 'top center',
                end: 'bottom center',
                scrub: 0,
                onEnter: () => {
                    if(idx == 1){
                        Composite.remove(world, [circleA, circleAC, triA, triAC, triB, triBC]);
                        setTimeout(() => {
                            Render.stop(render);
                            Runner.stop(runner);
                        }, 100);
                        diff = 'diff';
                    } else if(idx == 2){
                        Render.run(render);
                        Runner.run(runner, engine);
                        Composite.add(world, stack);
                        Composite.allBodies(stack).forEach(x => x.render.fillStyle = `rgba(255,255,255,.3)`)

                    } else if(idx == 3){
                        Composite.remove(world, stack);
                        Composite.add(world, [ moA, moAC, compound, comp, moC, moCC ]);
                    }
                },
                onEnterBack: () => {
                    if(idx == 0){
                        Render.run(render);
                        Runner.run(runner, engine);
                        Composite.add(world, [circleA, circleAC, triA, triAC, triB, triBC]);
                        diff = '';
                    } else if(idx == 1){
                        Composite.remove(world, stack);
                        setTimeout(() => {
                            Render.stop(render);
                            Runner.stop(runner);
                        }, 100);
                    } else if(idx == 2){
                        Composite.add(world, stack);
                        Composite.allBodies(stack).forEach(x => x.render.fillStyle = `rgba(255,255,255,.3)`)
                        Composite.remove(world, [ moA, moAC, compound, comp, moC, moCC ]);
                    }
                }
            })
        });

        window.addEventListener('resize', () => {
            render.canvas.height = innerHeight;
            Body.setPosition(floor, { x:800, y:innerHeight+10 })
        })
    })
</script>

<div class="fixBg { diff }">
    <div class="canvas" bind:this={canvas}></div>
</div>