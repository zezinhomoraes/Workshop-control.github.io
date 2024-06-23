
const p_descritivos = [...document.querySelectorAll(".btn_f")]
p_descritivos.map((e)=>{
    e.addEventListener("mouseover", ({target})=>{
        const textMain = document.querySelector(".principal")
        textMain.classList.add("text")
        if(target.textContent == "Cadastro" ){    
            const descritionH2 = document.querySelector('.descrition h2')
            descritionH2.innerHTML="Cadastro"
            const descritivo = document.querySelector(".p_cadastro")
            descritivo.classList.add("text_ativo")

        }else if(target.textContent == "Insumos" ){
            const descritionH2 = document.querySelector('.descrition h2')
            descritionH2.innerHTML="Insumos"
            const descritivo = document.querySelector(".p_insumos")
            descritivo.classList.add("text_ativo")
        }else if(target.textContent == "Contabio" ){
            const descritionH2 = document.querySelector('.descrition h2')
            descritionH2.innerHTML="Contabio"
            const descritivo = document.querySelector(".p_contabio")
            descritivo.classList.add("text_ativo")
        }
    })
    e.addEventListener("mouseout", ({target})=>{
        const descritionH2 = document.querySelector('.descrition h2')
        descritionH2.innerHTML="Escolha sua função"
        const textMain = document.querySelector(".principal")
        textMain.classList.remove("text")
        const descritivoAll = [...document.querySelectorAll(".text")]
        descritivoAll.map((e)=>{
            e.classList.remove("text_ativo")
        })
    })
})