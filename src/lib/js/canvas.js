import { throttle } from './throttle';
import Matter from 'matter-js';

function DrawCanvas(canvas){
    let frameCount = 0;
    let particles = [];
    let pass01 = false, pass02 = false, pass03 = false;
    // setup
    this.Engine = Matter.Engine;
    this.Runner = Matter.Runner;
    this.Render = Matter.Render;
    const { Bodies, Body, Common, Composite, Constraint, Events } = Matter;
    this.engine = this.Engine.create(),
    this.runner = this.Runner.create();
    const world = this.engine.world;
    this.render = this.Render.create({
        element: canvas,
        engine: this.engine,
        pixelRatio: window.devicePixelRatio,
        options: {
            width: 1600,
            height: innerHeight,
            wireframes: false,
            background: 'transparent'
        }
    });
    this.Render.run(this.render);
    this.Runner.run(this.runner, this.engine);
    // let group = Body.nextGroup(true);

    // floor
    let floor = Bodies.rectangle(800, innerHeight+10, 1600, 20, {
        isStatic: true,
        label: ['floor', 'static'],
        render: { fillStyle: '#000' }
    });

    // circle
    let circleA = Bodies.circle(800, innerHeight * 0.4, 100, {
        slop: 0.8,
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
            return Bodies.circle(x, y, 1, { isStatic:true, render: { fillStyle: 'rgba(255,255,255,.4)' } })
        } else{
            return Bodies.circle(100+(row*81), y, 1, { isStatic:true, render: { fillStyle: 'rgba(255,255,255,.4)' } })
        }
    });

    // add
    Composite.add(world, [floor, circleA, circleAC, triA, triAC, triB, triBC]);
    // Composite.add(world, stack)
    newParticle();

    Events.on(this.engine, 'afterUpdate', throttle(() => {
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

    // particles
    function Particle(x, y, r){
        let options = {
            restitution: 0.6,
            friction: 0,
            frictionStatic: 0.1,
            label: ['particle', 'static'],
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

}

export { DrawCanvas }