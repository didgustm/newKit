<script>
    import { onMount } from 'svelte'
    import { gsap } from 'gsap'
    import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
    import { Physics } from '$js/matter';

    export let h;

    let diff = '', canvas, ph;
    gsap.registerPlugin(ScrollTrigger);

    onMount(() => {
        ph = new Physics(canvas);
        const sections = document.querySelectorAll('section');
        let ctx = gsap.context(() => {
            sections.forEach((x, idx) => {
                let section = x.getAttribute('id');
                ScrollTrigger.create({
                    trigger: x,
                    start: () => {
                        if(idx >= 2){
                            return `top+=${3000} center`
                        } else{
                            return 'top center'
                        }
                    },
                    end: () => {
                        if(idx >= 1){
                            return `bottom+=${3000} center`
                        } else{
                            return 'bottom center'
                        }
                    },
                    onEnter: () => {
                        if(section == 'about'){
                            canvas.style.opacity = 0.3;
                            ph.Composite.remove(ph.world, ph.introShapes);
                            ph.Composite.add(ph.world, ph.stack);
                            ph.Composite.allBodies(ph.stack).forEach(x => x.render.fillStyle = `rgba(255,255,255,.1)`)
                        } else if(section == 'portfolio'){
                            ph.Composite.remove(ph.world, ph.stack);
                            setTimeout(() => {
                                ph.Render.stop(ph.render);
                                ph.Runner.stop(ph.runner);
                            }, 10)
                        } else if(section == 'contact'){
                            
                            ph.Render.run(ph.render);
                            ph.Runner.run(ph.runner, ph.engine);
                            ph.Composite.add(ph.world, ph.contShapes);
                        }
                    },
                    onEnterBack: () => {
                        if(section == 'intro'){
                            canvas.style.opacity = 1;
                            ph.Composite.add(ph.world, ph.introShapes);
                            ph.Composite.remove(ph.world, ph.stack)
                        } else if(section == 'about'){
                            ph.Render.run(ph.render);
                            ph.Runner.run(ph.runner, ph.engine);
                            ph.Composite.add(ph.world, ph.stack);
                            ph.Composite.allBodies(ph.stack).forEach(x => x.render.fillStyle = `rgba(255,255,255,.1)`)
                        } else if(section == 'portfolio'){
                            ph.Composite.remove(ph.world, ph.contShapes)
                            setTimeout(() => {
                                ph.Render.stop(ph.render);
                                ph.Runner.stop(ph.runner);
                            }, 10);
                        }
                    }
                })
            });
        })

        window.addEventListener('resize', () => {
            ph.render.canvas.height = h;
            ph.render.canvas.width = innerWidth > 1600? innerWidth: 1600;
            ph.Body.setPosition(ph.floor, { x:innerWidth / 2, y:h+10 });
            ph.introShapes.forEach((obj, idx) => {
                if(obj.label == 'part01'){
                    idx == 0? ph.Body.setPosition(obj, {x:obj.position.x, y:h * 0.35}):
                    idx == 2? ph.Body.setPosition(obj, {x:obj.position.x, y:h*0.6}):
                    ph.Body.setPosition(obj, {x:obj.position.x, y:h*0.48});
                } else{
                    obj.pointA = ph.Constraint.pointBWorld(obj);
                }
            });
            ph.contShapes.forEach((obj, idx) => {
                if(obj.label == 'part03'){
                    idx == 0? ph.Body.setPosition(obj, {x:obj.position.x, y:h / 3.3}):
                    idx == 2? ph.Body.setPosition(obj, {x:obj.position.x, y:h / 2.5}):
                    ph.Body.setPosition(obj, {x:obj.position.x, y:h / 2.3});
                } else{
                    obj.pointA = ph.Constraint.pointBWorld(obj);
                }
            });
        });
        
        return () => ctx.revert()
    })
</script>

<div class="fixBg { diff }">
    <div class="canvas" bind:this={canvas}></div>
</div>