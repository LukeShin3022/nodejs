let http = require('http');
let filesystem = require('fs');
let dt = require('./module/Date');
// let fName = require('./module/Name');
let url = require('url');
let fakeUrl = "http://www.luke.com:80/home.html?byear=1990&month=01";
// let fileUrl = "http://localhost:8080?file=myname&data1=luke&file2=mycounrtyname&data2=korea"

http.createServer((req,res)=>{
    if(req.url==="/favicon.ico") res.end();
     else{
    let parsedUrl = url.parse(req.url,true);
    // console.log(parsedUrl.query);
    let query = parsedUrl.query;
    let file = query.file;
    let file2 = query.file2;
    let data1 = query.data1;
    let data2 = query.data2;
    let filename = parsedUrl.pathname +"."+ query.type;
    // console.log(parsedUrl.query);
    console.log(filename);
    // console.log(parsedUrl.pathname);
    if(!filesystem.existsSync("./page"+filename)){
        filesystem.writeFile('./files/'+filename,'test',(err)=>{
            if(err){
                throw err;
                // return res.end();
            }
            console.log("Saved");
        })

    }else{
            filesystem.readFile('./files/'+filename,(err,data)=>{
                res.writeHead(200,{'Content-Type':'text/html'});
                res.write("<h1>"+data+"</h1>");
                return res.end();
            });
    }

    if(file != null){
    
            filesystem.writeFile('./files/'+file+'.txt',''+data1+'',(err)=>{
                if(err){
                    throw err;
                    // return res.end();
                }
                console.log("Saved");
            })
            filesystem.writeFile('./files/'+file2+'.txt',''+data2+'',(err)=>{
                if(err){
                    throw err;
                    // return res.end();
                }
                console.log("Saved");
            })
        
       
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
    }else{
        if(parsedUrl.pathname == "/myname"){
            filesystem.readFile('./files/myname.txt',(err,data)=>{
                res.writeHead(200,{'Content-Type':'text/html'});
                res.write("<h1>"+data+"</h1>");
                return res.end();
            });
        }else if(parsedUrl.pathname == "/mycounrtyname"){
            filesystem.readFile('./files/mycounrtyname.txt',(err,data)=>{
                res.writeHead(200,{'Content-Type':'text/html'});
                res.write("<h1>"+data+"</h1>");
                return res.end();
            });
        }
        else{
            res.writeHead(404,{'Content-Type':'text/html'});
            return res.end();
        }
     
    }
}
    // res.write("<h1>"+dt.Date()+"</h1>");
    // res.write("<h1>Today is: "+dt.Date()+"</h1>");
    // res.write("<h3>"+fName.Name()+"</h3>");
    // res.end(); // close pakage
}).listen(8080,console.log("server start listening on 8080"));