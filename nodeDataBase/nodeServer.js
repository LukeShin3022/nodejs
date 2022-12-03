const formidable = require('formidable');
var http = require('http');
// var mysql = require('mysql');
var dataBase = require('./modules/dataBase');
http.createServer((req,res)=>{
    res.setHeader('Access-Control-Allow-Origin','http://localhost:3000');
    // var con = mysql.createConnection({
    //     host:"localhost",
    //     user:"root",
    //     password:"",
    //     database:"user_db"
    // });
    // con.connect((err)=>{
    //     if(err)throw err;
    // });
    try{
        if(req.url=="/favicon.ico") return res.end();
        switch(req.url){
            case "/users":
                let dbCon = dataBase.dbConnect();
                dbCon.connect((err)=>{
                    if (err) throw err;
                    dbCon.query(dataBase.selectQuery("user_tb"),(err,result,fields)=>{
                        if(err) throw err;
                        // res.writeHead(200,{'Content-Type':'application/json'});
                        res.writeHead(200,{'Content-Type':'text/html'});
                        res.write(JSON.stringify(result));
                        return res.end();
                        // console.log(result);
                        // console.log(result[1]); //if you wanna specific data you can use like this "result[1]"
                    });
                    // res.write("Connected");
                    // return res.end();
                });
                break;
            case "/inuser":
                let form = new formidable.IncomingForm();
                form.parse(req,(err,fields,files)=>{
                    // let values = [fields.firstName, fields,lastName,fields.email,fields.pass, fields.dob, fields.phone, fields.addr, fields.title];
                    console.log(fields.addr);
                })
                let indbCon = dataBase.dbConnect();
                indbCon.connect((err)=>{
                    if(err) throw err;
                    let insertQuery = "INSERT INTO user_tb (firstName,lastName,email,pass,dob,phone,addr,title) VALUES('milad','torabi','ml@mail.com','1234test','1901-01')";
                })
                break;
            default:
                res.writeHead(404,{"Content-Type":"text/html"});
                res.write("Not found");
                return res.end();


        }
    }catch(err){
        console.log(err);
    }
}).listen(8081,console.log("listen to 8081"));