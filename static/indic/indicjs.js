const fond=document.getElementById('fondo-pantalla')
let seed=Math.floor(Math.random() * 1000) + 2;
fond.style.backgroundImage='url("https://picsum.photos/seed/'+seed+'/1920/1080")';

