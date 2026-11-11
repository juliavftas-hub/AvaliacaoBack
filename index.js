import express from 'express'
import banco from './repository/index.js'

const app =express()
app.use(express.json());

/* isso é um post com body 
 OU SEJA é pra cadastrar alguma coisa, pelo corpo da requisição*/
app.post("/lista/tarefas", (req, res) => {
    const {id, descricao, data, concluido} = req.body;

    if (!id || !descricao || !data || !concluido) {
        res.send({message: "Informe todos os dados!"})
        return
    }

    banco.push ({id, descricao, data, concluido})
    res.send({message:"Tarefa criada com sucesso!"})
})
// para d mexe fia

/*este é pra ser na rota (pelo params) POST */
app.post("/lista/tarefas/:id/:descricao/:data/:concluido", (req, res) => {
    const {id, descricao, data, concluido} = req.params;

    if (!id || !descricao || !data || !concluido) {
        res.send({message: "Informe todos os dados"})
        return
    }

    banco.push ({id, descricao, data, concluido})
    res.send({message:"Tarefa criada com sucesso!"})
})

/* PUT == updade */
app.put("/tarefa/update", (req, res) => {
    const{ id, descricao, data, concluido} = req.body;

    const index = banco.findIndex(p=> p.id==id)

    if(index ==-1){
        res.send({message:"id da tarefa não encontrada!"})
        return
    }

    banco[index].descricao = descricao;
    banco[index].data = data;
    banco[index].concluido = concluido;

    res.send ({message: "Tarefa atualizada com sucesso!"})
})

/* Para exibir */
// Esse GET pega todos os cadastros 
app.get("/tarefa", (req, res) => {
    res.json(banco)
})
 
/* GET pega o id preenchido na URL
Se quiser pegar pelo Body utiliza Const id = req.body.id e troca a rota para /tarefa/buscar */
app.get("/tarefa/:id", (req, res) => {
    const id = req.params.id
 
    if(!id){
        res.send({message: "Id não encontrado!"})
        return
    }
 
    const tarefa = banco.find(p => p.id == id)
 
    if(!tarefa){
        res.send({message: "Id não encontrado!"})
        return
    }
 
    res.send({message: tarefa})
 
})
 
// DELETE com os dados da tarefa na URL por exemplo: /tarefa/1
/*app.delete("/tarefa/:id", (req, res) => {
    const id = req.params.id
 
    if(!id){
        res.send({message: "Id não encontrado!"})
        return
    }
 
    // buscar pelo id, pra achar a posição no array
    const index = banco.findIndex(p => p.id == id)
 
    if(index == -1){
        res.send({message: "Id não encontrado!"})
        return
    }
})*/
 
// DELETE com os dados da tarefa no corpo / body
app.delete("/tarefa/delete", (req, res) => {
    const id = req.body.id
 
    if(!id){
        res.send({message: "Id não encontrado!"})
        return
    }

    // buscar pelo id, pra achar a posição no array
    const index = banco.findIndex(p => p.id == id)
 
    if(index == -1){
        res.send({message: "Id não encontrado!"})
        return
    }
    banco.splice(index, 1)
 
    res.send({message: "Tarefa removida"})
 
})
    app.put("/tarefa/:id", (req, res) => {
    const id = Number(req.params.id);
    
    const tarefa = banco.find(tarefa => tarefa.id === id);

        tarefa.concluido = req.body.concluido;
        res.send(tarefa);

    }) // é algo aqui, num sei se te ajuda mas pas


app.listen(3000, () =>{
    console.log("servidor rodando na porta 3000")
})


