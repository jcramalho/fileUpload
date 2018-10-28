var express = require('express')
var http = require('http')

var app = express()

// Vamos adicionar o nosso inspector como Middleware
app.use((req, res, next) => {
    console.log('--------------------------------------')
    console.log('Pedido feito com o método: ' + req.method)
    console.log('Pedido: ' + req.url)
    console.log('--------------------------------------')
    next()
})

app.use((req,res) => {
    res.writeHead(200, {'Content-Type': "text/plain"})
    res.end('Olá!')
})

http.createServer(app).listen(4007)