var express = require('express')
var http = require('http')
var logger = require('morgan')
var fs = require('fs')
var pug = require('pug')
var formidable = require('formidable')

var app = express()

app.use(logger('combined'))

app.all('*', (req,res,next) => {
    if(req.url != '/w3.css') res.writeHead(200, {'Content-Type': "text/html"})
    next()
})

app.get('/', (req,res) => {
    res.write(pug.renderFile('form-ficheiro.pug'))
    res.end()
})

app.get('/w3.css', (req,res) => {
    res.writeHead(200, {'Content-Type': "text/css"})
    fs.readFile('stylesheets/w3.css', (erro, dados) => {
        if(!erro) res.write(dados)
        else res.write(pug.renderFile('erro.pug', {e: erro}))
        res.end()
    })
})

app.post('/processaForm', (req,res) => {
    var form = new formidable.IncomingForm()
        form.parse(req, function (err, fields, files) {
            console.dir(fields)
            console.dir(files)
            res.write('File uploaded')
            res.end()
        })
})

http.createServer(app).listen(4007)