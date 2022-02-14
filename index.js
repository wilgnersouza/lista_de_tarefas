const express = require('express');
var bodyParser = require('body-parser')
const path = require('path')
const app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.engine('html', require('ejs').renderFile);
app.set('view engine','html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

var tarefas = ['Arrumar o quarto', 'colocar comida para o gato'];

app.post('/', (req,res)=>{
    tarefas.push(req.body.tarefa);
    res.render('index', {tarefas:tarefas});
})

app.get('/', (req, res)=>{

    res.render('index', {tarefas:tarefas});
});

app.get('/deletar/:id', (req,res)=>{
    tarefas = tarefas.filter((val,index)=>{
        if(index != req.params.id){
            return val;
        }
    })
    res.render('index', {tarefas:tarefas})
})

app.listen(3000,()=>{
    console.log('server rodando');
})