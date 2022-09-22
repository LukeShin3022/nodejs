let http = require('http');
let filesystem = require('fs');
let dt = require('./module/Date');
let fName = require('./module/Name');
let fakeUrl = "http://www.luke.com:80/home.html?byear=1990&month=01";

http.createServer((req,res)=>{
    // res.writeHead(200,{'Content-Type':'text/html'});
    // filesystem.writeFile('./files/newText.txt','\n File created by Node Server. new line',(err)=>{
    //     if(err) throw err;
    //     console.log("Saved");
    // })
    filesystem.appendFile('./files/newText.txt','\n File created by Node Server. new line',(err)=>{
        if(err) throw err;
        console.log("Saved");
    });
    
    filesystem.readFile('./pages/home.html',(err,data)=>{
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write(data);
        return res.end();
    });
    // res.write("<h1>"+dt.Date()+"</h1>");
    // res.write("<h1>Today is: "+dt.Date()+"</h1>");
    // res.write("<h3>"+fName.Name()+"</h3>");
    // res.end(); // close pakage
}).listen(8080,console.log("server start listening on 8080"));