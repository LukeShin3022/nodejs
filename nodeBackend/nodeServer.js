var http = require('http');
var formidable = require('formidable'); //if you wanna use formidable : npm install formidable
// var dt = require('./modules/Date');
var fs = require('fs');
var path = require('path');
var url = require('url');
http.createServer((req,res)=>{
    res.setHeader('Access-Control-Allow-Origin','http://localhost:3000');
    var parsedUrl = url.parse(req.url,true);
    // if(req.url == "/favicon.ico") return res.end();
    switch(parsedUrl.pathname){ // req.url is path name in the URL
        case '/favicon.ico':
            return res.end();

        case '/':
            // console.log(req.url);
            // res.writeHead(200,{'Content-Type':'text/html'});
            // res.write("<form method = 'POST' action='regform'>");
            // res.write("<input name='fname' />");
            // res.write("<input name='lname' />");
            // res.write("<button type='submit'>Submit</button>");
            // res.write("</form>");
            // return res.end();
            if(parsedUrl.search!=null){
                let dirName = parsedUrl.query.dir;
                res.writeHead(200,{'Content-Type':'text/html'});
                fs.readdirSync(`./uploads/${dirName}`).map(foldername=>{
                    res.write(`<a href="/img?dirName=${dirName}&name=${foldername}">${foldername}</a><br/>`);
                });
                return res.end();
            }
            res.writeHead(200,{'Content-Type':'text/html'});
            fs.readdirSync('./uploads').map(foldername=>{
                res.write(`<a href='?dir=${foldername}'>${foldername}</a><br/>`);
            });
            return res.end();


        case '/regform':
            let form = new formidable.IncomingForm();
            form.parse(req,(err,fields,files)=>{
                console.log(fields);
                var fname = fields.fname;
                var lname = fields.lname;
                console.log(fields.bdate);
                res.writeHead(200,{'Content-Type':'text/html'});
                res.write("Your name is: "+fname+" "+lname);
                return res.end();
            })
       
        case '/file':
            let fileFrom = new formidable.IncomingForm();
            
            fileFrom.parse(req,(err,fields,files)=>{
                try{
                    let dirName = "./uploads/"+fields.dirName;
                    // fs.mkdir(path.join(__dirname,dirName),(err)=>{
                    //     if(err) throw err;
                    // });
                    if(!fs.existsSync(dirName)){
                        fs.mkdirSync(dirName,{recursive:true})
                    }
                    let oldPath = files.imgUpload.filepath;
                    //console.log(files.imgUpload);
                    var newPath = dirName+"/"+files.imgUpload.originalFilename;
                    fs.rename(oldPath,newPath,(err)=>{
                        if(err) throw err;
                        res.writeHead(200,{'Content-Type':'text/html'});
                        res.write("File uploaded");
                        return res.end();
                    });
                }catch{
                    console.log(err);
                }
            });
            break;
        case '/img':
            if(parsedUrl.search!=null){
                let fileName = parsedUrl.query.name;
                let dirName = parsedUrl.query.dirName;
                fs.readFile(`./uploads/${dirName}/${fileName}`,(err,content)=>{
                    res.write(content);
                    return res.end()
                });
            }
            // fs.readFile('./uploads/LinWen/elnews.png',(err,content)=>{
            break;
        default:
            res.writeHead(404,{'Content-Type':'text/html'});
            res.write("Not Found");
            return res.end();
    }
    
}).listen(8080,console.log('Starting server on port 8080'));