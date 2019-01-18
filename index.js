const express=require('express');
const nodemailer = require("nodemailer");
const cors = require('cors')
const port=process.env.PORT || 3000;
var bodyParser = require('body-parser');

var app=express();

app.use(bodyParser.urlencoded({ extended: true })); 

var smtpTransport = nodemailer.createTransport({
        host: "smtp.outlook.office365.com", // hostname
        secureConnection: false, // TLS requires secureConnection to be false
        port: 587, // port for secure SMTP
        tls: {
           ciphers:'SSLv3'
        },
        auth: {
            user: 'xxxxxxxxxxx',
            pass: 'xxxxxxxxxxx'
        }
    });

/*------------------SMTP Over-------------------SS----------*/

/*------------------Routing Started ------------------------*/
const corsOptions = {
  origin: 'xxxxxxxxxxxxxxxxxxx',
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
}
// app.use(cors())
app.post('/send', cors(corsOptions), function(req, res){
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
   res.header('Access-Control-Allow-Headers', 'Content-Type');
    var mailOptions={
        to : 'xxxxxxxxxx',
        subject : req.body.email,
        html : req.body.message
        }
    smtpTransport.sendMail(mailOptions, function(error, response){
    
     if(error){
        console.log(error);
        res.end("error");
     }else{
        var msg = {
            sent:'ok',
            res: response.response
        }
        res.end(response.response);
      }
    });
});

app.use(express.static('public'));

app.get('/test', (req, res) => {
    res.send({id: 1, name: 'ruben', dir: __dirname});
})

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.get('/index.html', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.get('/index-sp.html', (req, res) => {
    res.sendFile(`${__dirname}/index-sp.html`);
});

/*--------------------Routing Over----------------------------*/

app.listen(port,function(){
    console.log("Express Started on Port " + port);
});

