const bir=document.getElementById('birth')
const gen=document.getElementById('gender')

if (bir.innerText==='None'){
    bir.innerText='Not specified'
}
if (gen.innerText==='M'){
    gen.innerText='Male'
}else if (gen.innerText==='O'){
    gen.innerText='Other / Not specified'
}else if (gen.innerText==='F'){
    gen.innerText='Female'
}




