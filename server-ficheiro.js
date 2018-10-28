// Servidor com persistência de dados em JSON

var http = require('http')
var url = require('url')
var fs = require('fs')
var pug = require('pug')
var formidable = require('formidable')

var { parse } = require('querystring')

http.createServer((req,res) =>{
    var purl = url.parse(req.url, true)

    console.log('Recebi o pedido: ' + req.url)
    console.log('Método: ' + req.method)

    if (req.method === 'POST') {
        var form = new formidable.IncomingForm()
        form.parse(req, function (err, fields, files) {
            console.dir(fields)
            console.dir(files)
            res.write('File uploaded')
            res.end()
        })
    } 
    else if(purl.pathname == '/w3.css'){
        res.writeHead(200, {'Content-Type': 'text/css'})
        fs.readFile('stylesheets/w3.css', (erro, dados) => {
            if(!erro) res.write(dados)
            else res.write(pug.renderFile('erro.pug', {e: erro}))
            res.end()
        })
    }
    else{
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write(pug.renderFile('form-ficheiro.pug'))
        res.end()
    }
}).listen(4007, ()=>{
    console.log('Servidor à escuta na porta 4007...')
})
