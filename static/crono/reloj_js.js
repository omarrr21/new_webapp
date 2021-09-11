const lateral=document.getElementById('lateral');
const world_t=document.getElementById('world_t');
const stop_w=document.getElementById('stop_w');
world_t.style.transition='width 1s, font-size .5s';
stop_w.style.transition='width 1s, font-size .5s';
lateral.addEventListener('mouseenter',()=>{
    world_t.style.fontSize='18px';
    stop_w.style.fontSize='18px';
    setTimeout(()=>{
        if (lateral.offsetWidth==150){
            world_t.innerHTML='<i class="bi bi-globe2"></i>World time';
            stop_w.innerHTML='<i class="bi bi-stopwatch-fill"></i>Stopwatch';
        }else{
            world_t.innerHTML='<i class="bi bi-globe2"></i>';
            stop_w.innerHTML='<i class="bi bi-stopwatch-fill"></i>';
        }
    },500)

});
lateral.addEventListener('mouseleave',()=>{
    world_t.innerHTML='<i class="bi bi-globe2"></i>';
    stop_w.innerHTML='<i class="bi bi-stopwatch-fill"></i>';
    world_t.style.fontSize='36px';
    stop_w.style.fontSize='36px';
});

const rj_hora = document.getElementById('rj_hora');
const rj_hora_pm=document.getElementById('rj_hora_pm');
const rj_local=document.getElementById('rj_lugar_local');

setInterval(()=>{
    let time=new Date(Date.now());
    let hh = time.getHours().toString().padStart(2,'0');
    let mm= time.getMinutes().toString().padStart(2,'0');
    let ss=time.getSeconds().toString().padStart(2,'0');
    rj_hora.innerText=hh +':'+ mm +':'+ ss;
},25);