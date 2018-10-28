var express = require('express')
var http = require('http')
var logger = require('morgan')

var app = express()

// Vamos adicionar o nosso inspector como Middleware
app.use(logger('combined'))

app.use((req,res) => {
    res.writeHead(200, {'Content-Type': "text/plain"})
    res.end('Olá!')
})

http.createServer(app).listen(4007)