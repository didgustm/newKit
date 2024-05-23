import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const introScr = () => {
    let g = gsap.timeline({ duration:0.8 });
        g.fromTo('.intro .outline', { strokeDashoffset:`30rem` }, { strokeDashoffset:0, duration:2, ease:'none' })
        .fromTo('.intro .fillText', { opacity:0 }, { opacity:1, ease:'none' }, '-=1')
        .fromTo('.scrollDown', { opacity:0, xPercent:50 }, { opacity:1, xPercent:0 }, '<')
        .fromTo('.intro .coment', { opacity:0, yPercent:100 }, { opacity:1, yPercent:0 }, '-=0.5');
}

export const aboutScr = (motion) => {
    let aos = document.querySelectorAll('.about .aos');
    let motion01 = gsap.timeline({ paused:true }),
        motion02 = gsap.timeline({ paused:true }),
        motion03 = gsap.timeline({ paused:true }),
        motion04 = gsap.timeline({ paused:true }),
        motion05 = gsap.timeline({ paused:true });
    motion01.fromTo('.about .title p', { opacity:0, y:100 }, { opacity:1, y:0, duration:1 })
    .fromTo('.about .title .dot', { scale:0 }, { scale:1, duration:1 }, '<');
    motion02.fromTo('.career dt', { opacity:0, y:50 }, { opacity:1, y:0, duration:0.6 })
    .fromTo('.career dd', { opacity:0, y:50 }, { opacity:1, y:0, duration:0.6 }, '-=0.3');
    motion03.fromTo('.tools dt', { opacity:0, y:50 }, { opacity:1, y:0, duration:0.6 })
    .fromTo('.tools img', { scale:0 }, { scale:1 }, '-=0.3')
    .fromTo('.tools p', { opacity:0, y:50 }, { opacity:1, y:0, duration:0.6 }, '<');
    motion04.fromTo('.edu dt', { opacity:0, y:50 }, { opacity:1, y:0, duration:0.6 })
    .fromTo('.edu .list01', { opacity:0, y:50 }, { opacity:1, y:0, duration:0.6 }, '-=0.3')
    .fromTo('.edu .list02', { opacity:0, y:50 }, { opacity:1, y:0, duration:0.6 }, '-=0.3');
    motion05.fromTo('.skills dt', { opacity:0, y:50 }, { opacity:1, y:0, duration:0.6 })
    .fromTo('.skills dd', { opacity:0, y:50 }, { opacity:1, y:0, duration:0.6 }, '-=0.3')
    .fromTo('.gauge01', { scaleX:0 }, { scaleX:1, duration:0.8, ease:'none' }, '-=0.4')
    .fromTo('.gauge02', { scaleX:0 }, { scaleX:1, duration:0.8, ease:'none' }, '-=0.7')
    .fromTo('.gauge03', { scaleX:0 }, { scaleX:1, duration:0.8, ease:'none' }, '-=0.7')
    .fromTo('.gauge04', { scaleX:0 }, { scaleX:1, duration:0.8, ease:'none' }, '-=0.7')
    .fromTo('.gauge05', { scaleX:0 }, { scaleX:1, duration:0.8, ease:'none' }, '-=0.7')
    .fromTo('.gauge06', { scaleX:0 }, { scaleX:1, duration:0.8, ease:'none' }, '-=0.7')
    .fromTo('.gauge07', { scaleX:0 }, { scaleX:1, duration:0.8, ease:'none' }, '-=0.7')
    
    aos.forEach((x, idx) => {
        ScrollTrigger.create({
            trigger: x,
            start: 'center bottom',
            end: 'bottom top',
            onEnter: () => {
                if(!motion){
                    if(idx == 0){
                        motion01.play()
                    } else if(idx == 1){
                        motion02.play()
                    } else if(idx == 2){
                        motion04.play()
                    } else if(idx == 3){
                        motion03.play()
                    } else if(idx == 4){
                        motion05.play()
                        motion = true
                    }
                }
            },
            onLeaveBack: () => {
                if(idx == 0) {
                    motion = false;
                    motion01.reverse(-1);
                    motion02.reverse(-1);
                    motion03.reverse(-1);
                    motion04.reverse(-1);
                    motion05.reverse(-1);
                }
            }
        })
    })
}

export const pfScr = (motion) => {
    let aos = document.querySelectorAll('.portfolio .aos');
    let motion01 = gsap.timeline({ paused:true }),
    motion02 = gsap.timeline({ paused:true });
    motion01.fromTo('.portfolio .outline', { strokeDashoffset:'51rem' }, { strokeDashoffset:0, duration:2, ease:'none' })
    .fromTo('.portfolio .fillText', { opacity:0 }, { opacity:1, ease:'none' }, '-=1');
    motion02.fromTo('.portfolio swiper-slide:nth-child(odd)', { opacity:0, xPercent:-25 }, { opacity:1, x:0, xPercent:0, duration:1,
        onStart: () => { document.querySelectorAll('.portfolio swiper-slide').forEach(x => x.style.pointerEvents = 'auto') }
     })
    .fromTo('.portfolio swiper-slide:nth-child(even)', { opacity:0, xPercent:25 }, { opacity:1, x:0, xPercent:0, duration:1,
        onStart: () => { document.querySelectorAll('.portfolio swiper-slide').forEach(x => x.style.pointerEvents = 'auto') }
     }, '<');
    
    aos.forEach((x, idx) => {
        ScrollTrigger.create({
            trigger: x,
            start: 'center bottom',
            end: 'bottom top',
            onEnter: () => {
                if(!motion){
                    if(idx == 0){
                        motion01.play();
                    } else if(idx == 1){
                        motion02.play();
                        motion = true
                    }
                }
            },
            onLeaveBack: () => {
                if(idx == 0) {
                    motion = false;
                    motion01.reverse(-1);
                    motion02.reverse(-1);
                }
            }
        })
    })
}

export const contactScr = (motion) => {
    let aos = document.querySelectorAll('.contact .aos');
    let motion01 = gsap.timeline({ paused:true }),
    motion02 = gsap.timeline({ paused:true });
    motion01.fromTo('.contact .outline', { strokeDashoffset:`36rem` }, { strokeDashoffset:0, duration:2, ease:'none' })
    .fromTo('.contact .fillText', { opacity:0 }, { opacity:1, ease:'none' }, '-=1');
    motion02.fromTo('.contact .list01 p', { scale:1.2, y:50, opacity:0 }, { scale:1, y:0, opacity:1 })
    .fromTo('.contact .list01 img', { scale:0 }, { scale:1 }, '<')
    .fromTo('.contact .list02 p', { scale:1.2, y:100, opacity:0 }, { scale:1, y:0, opacity:1 }, '-=0.1')
    .fromTo('.contact .list02 img', { scale:0 }, { scale:1 }, '<')
    .fromTo('.contact .list03 p', { scale:1.2, y:100, opacity:0 }, { scale:1, y:0, opacity:1 }, '-=0.1')
    .fromTo('.contact .list03 img', { scale:0 }, { scale:1 }, '<')
    .fromTo('.contact .list04 p', { scale:1.2, y:100, opacity:0 }, { scale:1, y:0, opacity:1 }, '-=0.1')
    .fromTo('.contact .list04 img', { scale:0 }, { scale:1 }, '<');
    
    aos.forEach((x, idx) => {
        ScrollTrigger.create({
            trigger: x,
            start: 'center bottom',
            end: 'bottom top',
            onEnter: () => {
                if(!motion){
                    if(idx == 0){
                        motion01.play();
                    } else if(idx == 1){
                        motion02.play();
                        motion = true
                    }
                }
            },
            onLeaveBack: () => {
                if(idx == 0) {
                    motion = false;
                    motion01.reverse(-1);
                    motion02.reverse(-1);
                }
            }
        })
    })
}