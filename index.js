/*

Ejercicio Node.js

var http = require('http');
var url = require('url');
var fs = require('fs');


http.createServer(function (req, res) {
	if (req.url =="/"){
		res.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"})
		var data = fs.readFileSync("index.html", "utf8");
		res.write(data);
	}else if(req.url=="/generic"){
		res.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"})
		var data = fs.readFileSync("generic.html", "utf8");
		res.write(data);
	}else if(req.url=="/elements"){
		res.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"})
		var data = fs.readFileSync("elements.html", "utf8");
		res.write(data);
	}else{
		res.writeHead(404, {'Content-Type': 'text/html;charset=UTF-8'});
		res.write("404, Page not Found!");
	}
	res.end();
}).listen(8080);
*/


//Express

// const express = require('express')
// const app = express()
// app.get('/', function (req, res) {
// res.send('¡Hola mundo!')
// })
// app.listen(8080, function () {
// console.log('Servidor activo en http://localhost:8080!')
// })

// app.get('/:name?', function (req, res) {
// if (req.params.name){
// res.send("Hola " + req.params.name)
// }else{
// res.send("Hola anónimo")
// }
// })


//Ejemplo de Middleware: Contador de visitas

// app.locals.counter = 0;
// app.use(function(req, res, next) {
// app.locals.counter += 1;
// next();
// });
// app.get('*', function(req, res){
// res.send("Número de visitas: "+app.locals.counter);
// });

// app.listen(8080, function () {
//  console.log('Servidor activo en http://localhost:8080!')
//  });



var express = require('express');
var path = require('path');
var nunjucks  = require('nunjucks');
var app = express();

// Middleware que permite usar archivos locales estaticos como .css
// Es necesario crear la carpeta public e incluir en ellas las carpetas css, js, etc
app.use(express.static(path.join(__dirname, 'public')));

// Setup nunjucks templating engine
nunjucks.configure('views', {
   autoescape: true,
   express: app,
   watch: true,
   noCache: false
});

// Set Nunjucks as rendering engine for pages with .html suffix
app.engine( 'html', nunjucks.render ) ;
app.set( 'view engine', 'html' );

app.get("/", function(req, res) {
    res.render("layouts/index.html", null);
})

app.get("/generic", function(req, res) {
    res.render("layouts/generic.html", null);
})

app.get("/elements", function(req, res) {
 res.render("layouts/elements.html", null);
})



// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('layouts/404.html');
// });

// bind the app to listen for connections on a specified port
var port = process.env.PORT || 3000;
app.listen(port);

// Render some console log output
console.log("Listening on port " + port);

module.exports = app;