
var http = require('http');
http.createServer((req,res)=>{
    res.setHeader('Access-Control-Allow-Origin','http://localhost:3000');
    try{
        if(req.url=="/favicon.ico") return res.end();
        switch(req.url){
            case "/q6":
                let fname = parsedUrl.query.fname;
                let lname = parsedUrl.query.lname;
                let email = parsedUrl.query.email;
                let phone = parsedUrl.query.phone;
                
                res.write(fname+lname+"your contact infomation is Email: "+email+"and phone: "+phone);
                break;

            case "/upload":
                let fileFrom = new formidable.IncomingForm();
                fileFrom.parse(req,(err,fields,files)=>{
                try{
                    let dirName = "./uploads/"+fields.userName;
                    if(!fs.existsSync(dirName)){
                        fs.mkdirSync(dirName,{recursive:true})
                    }
                    let oldPath = files.fileUpload.filepath;
                    var newPath = dirName+"/"+files.fileUpload.originalFilename;
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

            default:
                res.writeHead(404,{"Content-Type":"text/html"});
                res.write("Not found");
                return res.end();
        }
    }catch(err){
        console.log(err);
    }
}).listen(8080,console.log("listen to 8080"));