var express = require('express');
var blogs=[];
var app = express();
const hostname = '127.0.0.1';
const port = 3000;
var path = require('path');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

var mysql =require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "farida",
    database: "Products"
});
con.connect(function(err){
     if(err) throw err;
    console.log("Connected")
});

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine','html');
app.engine('html', require('ejs').renderFile);

app.get("/",(req,res)=>{
    res.render("home.html")
})

app.post("/seller",(req,res)=>{



    var sql = "SELECT * FROM recentlyadded";
    con.query(sql, function(err,result){
        if(err) throw err;
       res.render('seller_view',{result:result});
    });
})

app.post("/seller_add",(req,res)=>{
    res.render('seller_add');
})

app.post("/seller2",(req,res)=>{
    // con.connect(function(err) {  
    //     if (err) throw err;
        // console.log(req.body);
        var pname = req.body.pname;
        var pcategory = req.body.pcategory;
        var ptype = req.body.ptype;
        var price = req.body.price;
        price=parseInt(price);
        console.log(typeof(price));
        
        var sql = "INSERT INTO recentlyadded (pname, pcategory, ptype, price) VALUES (?,?,?,?)";  
        con.query(sql, [pname,pcategory,ptype,price], function (err, result) { 
            if (err) throw err;
            console.log("1 record inserted");  
            // res.render('seller_view',{result:result});
        });  

        var sql = "SELECT * FROM recentlyadded";  
        con.query(sql,function (err, result) { 
            if (err) throw err; 
            res.render('seller_view',{result:result});
        });  
   
});

app.post("/confirm",(req,res)=>{

//      var sql = "INSERT INTO productinfo SELECT * FROM recentlyadded;"
//      con.query(sql, function (err, result) { 
//                     if (err) throw err;
//                     console.log("Records are inserted in the main table");
//      })
    

//          var sql1 = "DELETE FROM recentlyadded";  
//       con.query(sql1,function (err, result) { 
//               if (err) throw err; 
//         });  
//  res.render('home.html');


    var sql = "INSERT INTO productinfo (pname, pcategory, ptype, price) VALUES (?,?,?,?)";  
        con.query(sql, [req.body.name,req.body.category,req.body.type,req.body.price], function (err, result) { 
            if (err) throw err;
            console.log("IF THIS IS DONE YOU WON");  

    var sql = "DELETE FROM recentlyadded";  
      con.query(sql,function (err, result) { 
              if (err) throw err; 
               res.send({Reply:'success'})
            // res.render('seller_view',{result:result});
        });  
})
})


app.post("/delete2",(req,res)=>{
    console.log("finallyhere");
    console.log(req.body);
        var pname = req.body.name;
        var pcategory = req.body.category;
        var ptype = req.body.type;
        var price = req.body.price;
        price=parseInt(price);
    var sql = "DELETE FROM recentlyadded where pname=? and pcategory=? and ptype=? and price=?";  
      con.query(sql, [pname,pcategory,ptype,price],function (err, result) { 
              if (err) throw err;
              res.send({ Reply: "success" });
              console.log("1 record deleted")
        });  
    
    
    
})

//Buyer Details
app.post("/buyerr",(req,res)=>{

    var sql = "SELECT * FROM productinfo";
    con.query(sql, function(err,result){
        if(err) throw err;
       res.render('buyer.html',{result:result});
    });
    
})

app.post("/filterr",(req,res)=>{

    console.log(req.body.category);
    console.log(req.body.type);
    console.log(req.body);
    // console.log(req.body.type.length);

    // if(req.body.category-="all")
    // {
    //     res.render("buyer.html",{result:result});
    // }

    if(Array.isArray(req.body.type)==true || typeof req.body.type=="undefined")
    {
        console.log("first if");
        var sql = "SELECT * FROM productinfo where pcategory=?";
        con.query(sql, [req.body.category], function(err,result)
        {
        if(err) throw err;
          res.render("buyer.html",{result:result});
        });
    }

    else if(req.body.category=="Electronic" && typeof req.body.type!="undefined" && Array.isArray(req.body.type)!=true)
    {
        console.log("second if")
        var sql = "SELECT * FROM productinfo where pcategory=? and ptype=?";
        con.query(sql, [req.body.category,req.body.type], function(err,result)
        {
        if(err) throw err;
          res.render("buyer.html",{result:result});
        }); 
    }

    else if(req.body.category=="Book" && typeof req.body.type!="undefined" && Array.isArray(req.body.type)!=true)
    {
        console.log("third if")
        var sql = "SELECT * FROM productinfo where pcategory=? and ptype=?";
        con.query(sql, [req.body.category,req.body.type], function(err,result)
        {
        if(err) throw err;
          res.render("buyer.html",{result:result});
        }); 
    }

    else if(req.body.category=="Grocery" && typeof req.body.type!="undefined" && Array.isArray(req.body.type)!=true)
    {
        console.log("fouth if")
        var sql = "SELECT * FROM productinfo where pcategory=? and ptype=?";
        con.query(sql, [req.body.category,req.body.type], function(err,result)
        {
        if(err) throw err;
          res.render("buyer.html",{result:result});
        }); 
    }

    if(req.body.type=='lowtohigh' && req.body.category=='price')
    {
        
        console.log("fifth if")
        var sql = "SELECT * FROM productinfo ORDER BY price ASC";
        con.query(sql, function(err,result)
        {
        if(err) throw err;
          res.render("buyer.html",{result:result});
        });
    }

    if(req.body.type=='hightolow' && req.body.category=='price')
    {
        console.log("sixth if")
        var sql = "SELECT * FROM productinfo ORDER BY price DESC";
        con.query(sql, function(err,result)
        {
        if(err) throw err;
          res.render("buyer.html",{result:result});
        });
    }
})

app.post("/search",(req,res)=>{

    console.log(req.body.search)
    res.render('buyer.html');
 
 
})

app.post("/back",(req,res)=>{
    res.render('home.html');
})


app.listen(port, (req,res) =>{
    console.log(`Server running at http://${hostname}:${port}/`);
})