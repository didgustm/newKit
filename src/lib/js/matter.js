import Matter from 'matter-js';

function Physics(target){
    // set
    let t = this, particles = [], frameCount = 0;
    const { Common, Constraint, Events } = Matter;
    this.Engine = Matter.Engine;
    this.Runner = Matter.Runner;
    this.Render = Matter.Render;
    this.Bodies = Matter.Bodies;
    this.Body = Matter.Body;
    this.Composite = Matter.Composite;
    this.Constraint = Matter.Constraint;
    this.engine = this.Engine.create(),
    this.runner = this.Runner.create();
    this.world = this.engine.world;
    this.render = this.Render.create({
        element: target,
        engine: this.engine,
        pixelRatio: window.devicePixelRatio,
        options: {
            width: innerWidth > 1600? innerWidth: 1600,
            height: innerHeight,
            wireframes: false,
            background: 'transparent'
        }
    });
    this.Render.run(this.render);
    this.Runner.run(this.runner, this.engine);

    // Floor
    this.floor = this.Bodies.rectangle(innerWidth / 2, innerHeight+10, 1600, 20, {
        isStatic: true,
        label: 'static',
        render: { fillStyle: '#fff' }
    });
    // Circle
    let circleA = this.Bodies.circle(800, innerHeight * 0.35, 100, {
        slop: 0.1,
        restitution: 0.8,
        label: 'part01',
        render: { fillStyle: '#74F0ED' }
    }),
    circleAC = Constraint.create({
        pointA: Matter.Vector.clone(circleA.position),
        bodyB: circleA,
        stiffness: 0.001,
        damping: 0.001,
        render: { visible: false }
    });
    // Triangles
    let triA = this.Bodies.polygon(950, innerHeight*0.6, 3, 100, {
        slop: 0.1,
        label: 'part01',
        chamfer: { radius:10 },
        restitution: 0,
        friction: 0,
        inertia: 6400,
        render: { fillStyle: '#EA445A' }
    }),
    triAC = Constraint.create({
        pointA: Matter.Vector.clone(triA.position),
        bodyB: triA,
        render: { visible: false }
    });
    let triB = this.Bodies.polygon(1070, innerHeight*0.48, 3, 80, {
        slop: 0.1,
        label: 'part01',
        chamfer: { radius:10 },
        restitution: 0,
        friction: 0,
        inertia: 3200,
        render: { fillStyle: '#74F0ED' }
    }),
    triBC = Constraint.create({
        pointA: Matter.Vector.clone(triB.position),
        bodyB: triB,
        render: { visible: false }
    });
    this.introShapes = [ circleA, circleAC, triA, triAC, triB, triBC ]

    // Stack
    this.stack = Matter.Composites.stack(50, 80, 20, innerHeight / 65 - 3, 80, 60, function(x, y, row, column){
        if(column % 2 == 0){
            return t.Bodies.circle(x, y, 2, { restitution:1, friction:1, isStatic:true, label:'static', render: { fillStyle: 'rgba(255,255,255,.1)' } })
        } else{
            return t.Bodies.circle(100+(row*83), y, 2, { restitution:1, friction:1, isStatic:true, label:'static', render: { fillStyle: 'rgba(255,255,255,.1)' } })
        }
    });
    
    // Shapes
    let circleB = this.Bodies.circle(800, innerHeight / 3.3, 50, {
        friction:0,
        label: 'part03',
        render: { fillStyle: '#fff' }
    }),
    circleBC = Constraint.create({
        pointA: Matter.Vector.clone(circleB.position),
        bodyB: circleB,
        stiffness: 0.001,
        damping: 0.01,
        render: { visible: false }
    });
    let triC = this.Bodies.polygon(680, innerHeight / 2.5, 3, 80, {
        slop: 0.8,
        chamfer: { radius:10 },
        friction: 0,
        inertia: innerWidth * 10,
        label: 'part03',
        render: { fillStyle: '#EA445A' }
    }),
    triCC = Constraint.create({
        pointA: Matter.Vector.clone(triC.position),
        bodyB: triC,
        render: { visible: false }
    });
    let partA = this.Bodies.rectangle(920, innerHeight / 2.3, 140, 30, {
        chamfer: { radius: 8 },
        render: { fillStyle: '#74F0ED' }
    }),
    partB = this.Bodies.rectangle(920, innerHeight / 2.3, 30, 140, {
        chamfer: { radius: 8 },
        render: { fillStyle: partA.render.fillStyle }
    }),
    compound = this.Body.create({
        friction: 0,
        inertia: 1600,
        label: 'part03',
        parts: [ partA, partB ],
        inertia: innerWidth * 10
    }),
    comp = Constraint.create({
        pointA: Matter.Vector.clone(compound.position),
        bodyB: compound,
        render: { visible: false }
    });
    this.contShapes = [ circleB, circleBC, triC, triCC, compound, comp ];
    

    // Add
    this.Composite.add(this.world, this.floor);
    this.Composite.add(this.world, this.introShapes);

    // Events
    Events.on(this.engine, 'collisionStart', e => {
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

    // Drop Particles
    Events.on(this.engine, 'afterUpdate', () => {
        frameCount++;
        if(frameCount % 40 == 0){
            newParticle();
        }
        particles.forEach((x, idx) => {
            if(x.isOffScreen()){
                this.Composite.remove(this.world, x.body)
                particles.splice(idx, 1);
            }
        });
    });


    function Particle(x, y, r){
        let options = {
            restitution:0.4,
            friction: 0,
            label: 'particle',
            slop: 0.01,
            render: { fillStyle: '#fff' }
        }
        this.body = Matter.Bodies.circle(x, y, r, options);
        this.r = r;
        Matter.Composite.add(t.world, this.body);
        this.isOffScreen = () => {
            let pos = this.body.position;
            let speed = this.body.speed
            return (pos.x < -50 || pos.x > 1650 || (speed < 0.08 && pos.y > 100))
        }
    }
    function newParticle(){
        let p = new Particle(Common.random(600, 1000), 0, Common.random(18,30));
        particles.push(p);
    }

}

export { Physics }