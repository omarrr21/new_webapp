const cab = document.getElementById('headbar')

window.addEventListener('scroll',()=>{
    if (window.scrollY>50){
        if (! cab.classList.contains('cab-scroll')) cab.classList.add('cab-scroll')
    }else {
        if (cab.classList.contains('cab-scroll')) cab.classList.remove('cab-scroll')
    }

})

