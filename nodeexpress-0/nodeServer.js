const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({
    origin:'http://localhost:3000'
}));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.post("/regform",(req,res)=>{
    console.log(req.body);
    res.status(200);
    res.send(`userName : ${req.body.username} and pass : ${req.body.pass}`);
});
const PORT = process.env.PORT || 8080;
app.listen(PORT,console.log(`Server start listening to ${PORT}`));