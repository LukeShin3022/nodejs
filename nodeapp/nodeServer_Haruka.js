//create server
let http = require('http'); //import http from http
let dt = require('./module/Date');
let filesystem = require('fs');
let url = require('url');

// let fakeurl = 'http:///www.henry.com:80/home.html?byear=1901&month=01';
//host: address and port
//hostname: address
//query: object
//path name: type of request and file

//if(req.url=='/favicon.ico')()
http.createServer((req,res)=>{
  if(req.url==="/favicon.ico") res.end();
  else{
    let parsedurl = url.parse(req.url,true);
    console.log(parsedurl.query);
    const file1 = parsedurl.query.file;
    const data1 = parsedurl.query.data1;
    const file2 = parsedurl.query.file2;
    const data2 = parsedurl.query.data2;
    
    if(req.url.search != null){
        filesystem.writeFile('./files/'+file1+'.txt',data1,(error)=>{ 
            if(error) throw error.message;
            console.log('saved');
        });
        filesystem.writeFile('./files/'+file2+'.txt',data2,(error)=>{ 
            if(error) throw error.message;
            console.log('saved');
        });
    }

    const path = parsedurl.pathname;
    console.log(path);
    switch(path){
      case '/myname' :
        filesystem.readFile('./files/myname.txt',(err,data)=>{
          res.writeHead(200,{'Context-Type':'text/html'});
          res.write(data);
          if(err){
            // throw err.message;
            res.writeHead(404,{'Context-Type':'text/html'});
            return res.end('err');
          }
          return res.end();
        });
        break;
      case '/mycountry':
        filesystem.readFile('./files/mycountry.txt',(err,data)=>{
          res.writeHead(200,{'Context-Type':'text/html'});
          res.write(data);

          if(err){
            // throw err.message;
            res.writeHead(404,{'Context-Type':'text/html'});
            return res.end('error');
          }
          return res.end();
        });
        break;
      default:
        
        return res.end('page not found');
    }
  }
  }).listen(8080,console.log("server start listening on 8080")); 
  //on terminal 8080,443 is http request