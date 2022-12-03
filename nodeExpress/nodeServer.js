const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
app.use(cors({
    origin:'http://localhost:3000'
}));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.get("/users",(req,res)=>{
    let data = fs.readFileSync('./data/user_info.json');
    console.log("response");
    res.send(JSON.parse(data));
});
app.get("/products",(req,res)=>{
    let data = fs.readFileSync('./data/products.json');
    res.send(JSON.parse(data));
    console.log("response2");
})
const PORT = process.env.PORT || 8080;
app.listen(PORT,console.log(`Server start listening to ${PORT}`));