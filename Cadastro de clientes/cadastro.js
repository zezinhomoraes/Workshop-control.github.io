// COLOCAR FORMULARIO PARA ADICIONAR CLIENTES NA TELA

const addCliente = document.querySelector(".add_cliente")
const clientes = document.querySelector(".principal")
const novoClienteBox = document.querySelector(".box_addclient")
addCliente.addEventListener("click",(evt)=>{
clientes.classList.add("sumiu")
novoClienteBox.classList.add("ativado")
})


// FORMULARIO PARA ADICIONAR NOVOS CLIENTES


//AÇÃO DO BOTÃO CANCELAR
const inputNew = [...document.querySelectorAll(".box_addclient input")]
const btnCancel = document.querySelector(".cancel")
btnCancel.addEventListener("click", (evt)=>{
    clientes.classList.remove("sumiu")
    novoClienteBox.classList.remove("ativado")
    inputNew.map((e)=>{
        e.value=""
    })
    const textArea = document.querySelector("textarea")
    textArea.value=""
})


//AÇÃO DO BOTÃO CONFIRMAR


let clientesArmazenados = []
let id = localStorage.length
const dados = [...document.querySelectorAll('.content')]

const btn_confirm = document.querySelector(".ok")
btn_confirm.addEventListener("click", (evt)=>{

    const nomeInput = document.querySelector('#nomeI').value
    if(nomeInput.length > 2 ){

        //ARMAZENAR NOVOS CLIENTES NO LOCALSTORAGE
        id++
        adicionarStorage()

        //FECHAR O FORMULARIO
        clientes.classList.remove("sumiu")
        novoClienteBox.classList.remove("ativado")
        inputNew.map((e)=>{
            e.value=""
        })
        location.reload()
    }else{
        alert("Defina o nome do cliente a ser cadastrado")
    }
})


//BUSCAR POR CLIENTE

const busca_i = document.getElementById('busca_i')
const icone_b = document.querySelector('#icone_b')
icone_b.addEventListener("click", (evt)=>{

    const clienteBuscado = busca_i.value.toLowerCase()
    const enc_clientes = [...document.querySelectorAll('.client_name span')]
    const busca = enc_clientes.find((el)=>{

        if(clienteBuscado === el.innerHTML.toLowerCase()){
            return el
        }
    })

    try{
        if(busca){
            const arrClientesNaoBuscados = [...document.querySelectorAll(".client_info")]
            arrClientesNaoBuscados.map((el)=>{el.classList.add("sumiu")})
        }
        busca.parentElement.parentElement.parentElement.parentElement.parentElement.classList.remove('sumiu')
    }catch(error){
        alert("Não foi possivel encontrar nenhum cliente com esse nome. Pesquise novamente.")
    }
})

busca_i.addEventListener("input", (evt)=>{
    if(busca_i.value.length == 0){
        const arrClientesNaoBuscados = [...document.querySelectorAll(".client_info")]
        arrClientesNaoBuscados.map((el)=>{el.classList.remove("sumiu")})

    }
})


//BOTÃO PARA EDITAR CLIENTES
const dados_edit = [...document.querySelectorAll('.content_edit')]
const edit_cliente = document.querySelector(".edit_cliente")
edit_cliente.addEventListener("click", (evt)=>{

    const client_info = [...document.querySelectorAll(".client_info input")]
    const cli = client_info.find((el)=>{

        if(el.checked){
            
            return el         
        }

    })

    if(cli){
        const edit = new boxEditarCliente
            edit.open()
            const cancel = document.querySelector(".cancelar")
            cancel.addEventListener("click",(evt)=>{
                edit.close()
            })
            const confirm = document.querySelector(".confirmar")
            confirm.addEventListener("click",()=>{
                edit.editandoCliente(cli)
                console.log(cli);
                edit.close()
            })
    }

    const nada = client_info.every((el)=>{
        if(el.checked==false){
            return true
        }
    })
    if(nada){
        alert("Selecione um cliente para edita-lo!")
    }
})


//BOTÃO PARA REMOVER CLIENTES
const button_remove = document.querySelector('.remove_cliente')
button_remove.addEventListener("click",()=>{

    const client_info = [...document.querySelectorAll(".client_info input")]
    client_info.find((el, i)=>{
        if(el.checked){
            boxRemoveClient(el, i)
        }
    })
    const nada = client_info.every((el)=>{
        if(el.checked==false){
            return true
        }
    })
    if(nada){
        alert("Selecione o cliente que sera removido!")
    }
})

//ABRINDO MAIS INFORMAÇÕES SOBRE O CLIENTE
