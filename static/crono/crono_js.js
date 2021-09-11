
const big_number = document.getElementById('big_number');
const small_number = document.getElementById('small_number');
const tabla=document.getElementById('tabla_vlt');
const vuelta_btn=document.getElementById('vuelta_btn');
const btn_iniciar=document.getElementById('iniciar');
const btn_parar=document.getElementById('parar');
const btn_reset=document.getElementById('reset');
const div_vueltas=document.getElementById('vueltas');

// inicio vuelta vuelta vuela parar iniciar vuelta reiniciar
// inicio barra lateral
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
// fin barra lateral
let guardado = 0;
let intervalo;
let cadena;


let count=1;

let vuelta_guard=new Date(0);

let cadena_vuelta;

const mostrar=(time)=>{
    let hh = time.getUTCHours().toString().padStart(2,'0');
    let mm= time.getUTCMinutes().toString().padStart(2,'0');
    let ss=time.getUTCSeconds().toString().padStart(2,'0');
    let ml=time.getUTCMilliseconds().toString().padStart(3,'0').substring(0,3);
    return [hh+':'+mm+':'+ss,'.'+ml]
}



const time_start=()=>{

    let inicio =new Date(Date.now()-guardado);
    intervalo=setInterval(()=>{

        guardado= new Date(Date.now()-inicio);
        cadena = mostrar(guardado);
        big_number.innerText=cadena[0];
        small_number.innerText=cadena[1];
    },10
    );
}


const pausa=()=>{
    clearInterval(intervalo);
}

const reset=()=>{
    clearInterval(intervalo);
    big_number.innerText='00:00:00';
    small_number.innerText='.00';
    guardado=0;
    vuelta_guard=new Date(0);
}



document.addEventListener('click',(e)=>{
    const el = e.target;
    if(el.id==='iniciar'){
        time_start();
        btn_iniciar.classList.toggle('escondido');
        btn_parar.classList.toggle('escondido');
        vuelta_btn.classList.toggle('escondido');
        btn_reset.classList.toggle('escondido');

    }
    if(el.id==='parar'){
        pausa();
        btn_iniciar.classList.toggle('escondido');
        btn_reset.classList.toggle('escondido');
        btn_parar.classList.toggle('escondido');
        vuelta_btn.classList.toggle('escondido');
    } ;
    if(el.id==='reset'){
        reset();
        div_vueltas.classList.add('escondido');
        let elem_count = tabla.childElementCount -1;
        for (let i=0;i<elem_count;i++){
            console.log('removido '+i);
            tabla.removeChild(tabla.children[1]);
        }
        count=1;
    } ;
})

vuelta_btn.addEventListener('click',(e)=>{
    div_vueltas.classList.remove('escondido')
    let brecha = new Date(guardado.getTime() - vuelta_guard.getTime());
    const new_row=document.createElement('tr');
    const td_1=new_row.insertCell(0);
    const td_2=new_row.insertCell(1);
    const td_3=new_row.insertCell(2);
    cadena_vuelta=mostrar(brecha);
    td_1.innerText=count;
    td_2.innerText=cadena_vuelta[0]+cadena_vuelta[1];
    td_3.innerText=cadena[0]+cadena[1];
    tabla.insertBefore(new_row,tabla.children[1]);
    count +=1;

    vuelta_guard = new Date(vuelta_guard.getTime()+ brecha.getTime());

})

