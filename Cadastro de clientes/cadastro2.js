class setNewClient{

    //RECEBE OS DADOS INFORMADOS NO FORMULARIO
    constructor(nome, tel, zap, bike, service, data, maisinfo, valor){
        this.nome = nome
        this.tel = tel
        this.zap = zap
        this.bike = bike
        this.service = service
        if(data.length != 0){
        this.data = data
        }else{this.data = "A data não foi informada"}
        this.maisinfo = maisinfo
        this.valor = valor
    }
    criar(){
        //CRIA O BLOCO COM O CLIENTE CADASTRADO E SUAS INFORMAÇÕES
        const base = document.querySelector(".clientes")

        const clientInfo = document.createElement("div")
        clientInfo.classList.add("client_info")

        const infoFast = document.createElement("div")
        infoFast.classList.add("infoFast")

        const inputRadio = document.createElement('input')
        inputRadio.setAttribute("type", "radio")
        inputRadio.setAttribute("class", "radio")
        inputRadio.setAttribute("name", "radio")
        inputRadio.setAttribute("value", this.valor)
        
        const boxDados = document.createElement("div")
        boxDados.classList.add("box_dados")
        
        const boxDados1 = document.createElement("div")
        boxDados1.classList.add("box_dados")

        const boxDados2 = document.createElement("div")
        boxDados2.classList.add("box_dados")

        const boxs = [boxDados, boxDados1, boxDados2]
        
        const name = document.createElement("div")
        name.classList.add("client_name")
        name.innerHTML=`<p>Nome: <span>${this.nome}</span></p>`
        
        const contato = document.createElement("div")
        contato.classList.add("client_contact")
        contato.innerHTML=`<p>Contato: ${this.tel}</p>`+`<p>WhatsApp: ${this.zap}</p>`
        
        const bikeC = document.createElement("div")
        bikeC.classList.add("client_bike")
        bikeC.innerHTML=`<p>Bike: ${this.bike}</p>`
        
        const serviceU = document.createElement("div")
        serviceU.classList.add("client_service")
        serviceU.innerHTML=`<p>Ultimo serviço: ${this.service}</p>`+`<p>Data: ${this.data}`

        const moreInfo = document.createElement("div")
        moreInfo.classList.add("client_moreinfo")
        moreInfo.innerHTML=`<button class="btn_moreInfo">Mais informações</button>`
        
        const moreInfoContent = document.createElement("article")
        moreInfoContent.classList.add("moreInfoContent")
        moreInfoContent.innerHTML=`<h3>Mais informações:</h3><br/>${this.maisinfo}`
        
        

        clientInfo.appendChild(infoFast)
        clientInfo.appendChild(moreInfoContent)
        infoFast.appendChild(inputRadio)
        boxs[0].appendChild(name)
        boxs[0].appendChild(contato)
        boxs[1].appendChild(bikeC)
        boxs[1].appendChild(serviceU)
        boxs[2].appendChild(moreInfo)
        boxs.map((e)=>{
            infoFast.appendChild(e)
        })
        base.appendChild(clientInfo)
        console.log(clientInfo);
        
    }
}

const abrirMaisInfo=function(){
    const client_moreinfo = [...document.querySelectorAll(".btn_moreInfo")]
    client_moreinfo.map((e)=>{
        e.addEventListener("click", ({target})=>{
            target.parentElement.parentElement.parentElement.parentElement.classList.toggle("moreInfoContentOn")
        })
    })
}

const adicionarStorage=function(){
    //FUNÇÃO PARA ARMAZENAR TODOS OS DADOS DO CLIENTE CADASTRADO NO LOCALSTORAGE DA PAGINA
    let dadosOBJ = {
        nome  : dados[0].children[1].value,
        contato  : dados[1].children[1].value,
        zap : dados[2].children[1].value,
        bike  : dados[3].children[1].value,
        servico  : dados[4].children[1].value,
        data  : dados[5].children[1].value,
        maisInfo: dados[6].children[1].value,
        id: id
    }

    const dados_json = JSON.stringify(dadosOBJ)
    localStorage.setItem("id"+id, dados_json )
    const dadosReturn = JSON.parse(localStorage.getItem('id'+id))
    clientesArmazenados.push(dadosReturn)

}

//EVENTO PARA CARREGAR TODOS OS CLIENTES CADASTRADOS NA PAGINA
window.addEventListener("load", (evt)=>{
    for(let i = 1;i<=id ; i++){
        const dadosRecebidos = JSON.parse(localStorage.getItem('id'+i))
        clientesArmazenados.push(dadosRecebidos)
    }
    clientesArmazenados.map((el)=>{
        const confirm = new setNewClient(el.nome, el.contato, el.zap, el.bike, el.servico, el.data, el.maisInfo, el.id)
        confirm.criar()
    })
    abrirMaisInfo()
})

const readicionarStorage = function(){
    clientesArmazenados.map((e)=>{
        id++
        const dadosArmazenados = JSON.stringify(e)
        localStorage.setItem("id"+id, dadosArmazenados)

    })
}

const boxRemoveClient = function(el, i){

    const conteiner_confirm = document.querySelector(".sumiu")
    conteiner_confirm.classList.add("conteiner_confirm")
    
    const box_confirm = document.querySelector(".box_confirm h1").innerHTML=`Deseja mesmo excluir ${el.parentElement.children[1].childNodes[0].children[0].lastChild.innerText}`

    const main = document.querySelector("main")
        main.classList.add("embasou")


    const confirm = document.querySelector(".confirm_remove")
    confirm.addEventListener("click", (evt)=>{
            
        el.parentElement.parentElement.remove()
           
        clientesArmazenados.splice(i, 1)
            
        localStorage.clear()
            
        id = localStorage.length
            
        readicionarStorage()
            
        location.reload()
           
    }) 


    const cancel = document.querySelector(".cancel_remove")
    cancel.addEventListener("click",(evt)=>{

        const main = document.querySelector("main")
        main.classList.remove("embasou")
            
        const conteiner_confirm = document.querySelector(".sumiu")
        conteiner_confirm.classList.remove("conteiner_confirm")

    })
}

const boxEditarCliente = function(){
    
    const box_editclient = document.querySelector(".box_editclient")
    clientes.classList.add("sumiu")
    box_editclient.classList.add("ativado")
    const main = document.querySelector("main")
    main.appendChild(box_editclient)

}

const editandoCliente = function(el){
    const id = Number(el.value)

    let dadosOBJ = {
            nome  : dados_edit[0].children[1].value,
            contato  : dados_edit[1].children[1].value,
            zap : dados_edit[2].children[1].value,
            bike  : dados_edit[3].children[1].value,
            servico  : dados_edit[4].children[1].value,
            data  : dados_edit[5].children[1].value,
            maisInfo: dados_edit[6].children[1].value,
            id: id
    }
    const dadosArmazenados = JSON.stringify(dadosOBJ)
    localStorage.setItem("id"+id, dadosArmazenados)
    console.log(localStorage);
    
}