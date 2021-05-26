const express= require('express');
const mongoose =require('mongoose');
const bodyParser = require("body-parser");
const app=express();
const ejs=require('ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/public'));


//app.use(express.static(__dirname + '/public'))
app.set('view engine','ejs');
mongoose.connect('mongodb+srv://Avani:01022002@cluster0.au736.mongodb.net/Bakery?retryWrites=true&w=majority', {useNewUrlParser: true},{ useUnifiedTopology: true } ,);

app.get('/', (req, res) =>{
    res.render('dashboard');
} );

/*var MongoClient = require('mongodb').MongoClient;

var dbName = "Bakery";
var port = "27017";
var host = "localhost";

function getNumOfDocs (collectionName, host, port, dbName, callback) {
    MongoClient.connect("mongodb://" + host + ":" + port + "/" + dbName, function (error, db){
        if(error) return callback(error);

        db.collection(collectionName).count({}, function(error, numOfDocs){
            if(error) return callback(error);

            db.close();
            callback(null, numOfDocs);
        });
    }); 
} */

app.get('/dashboard', (req, res) => {
    res.render('dashboard');
    console.log('running');
});

app.get('/dashboard', (req, res) => {
    res.redirect('/dashboard');
});
app.get('/contact', (req, res) =>{
    res.render('contact');
} );
app.get('/contact', (req, res) => {
    res.render('contact');
    console.log('running');
});

/*app.get('/itemdet', (req, res) => {
    res.render('itemdet');
})*/
const itemsSchema={
    Product:String,
    Brand:String,
    Quantity:Number,
    option:String,
    Option:String
}
const items = mongoose.model('items',itemsSchema);
   
  

 app.get('/itemdet', (req, res) => {
    items.find({}, function(err, items) {
        console.log(items)
        res.render('itemdet', {
           itemsList: items
          // res.send(ejs.renderFile(__dirname + '/views/itemdet.ejs'));
        })
    })
})

/*xports.deleteItem = function(req, res) {
      items.findOneAndRemove({
        Product: req.body.Product,
        Brand: req.body.Brand,
        Quantity: req.body.Quantity,
        option: req.body.option,
        Option: req.body.Option
    }, function(err, user) {
          if (err) throw err;
           console.log("Success");
     });
    res.redirect('/itemdet');
}
/*app.get('/item', (req, res) => {
    res.render('item');
})*/
/*app.delete("/itemdet",function(req, res){
   items.findOneAndDelete({
    Product: req.body.Product,
    Brand: req.body.Brand,
    Quantity: req.body.Quantity,
    option: req.body.option,
    Option: req.body.Option
   }), function(err, user) {
     if(err) throw err;
     console.log("success");
   };
   res.redirect('/itemdet');
})*/

const itemSchema = {
    Product: String,
    Brand: String,
    Quantity: Number,
    option: String,
    Option: String
}

const Item = mongoose.model("Item",itemSchema)
 
app.get("/item", function(req, res){
     res.render('item')
});

app.post("/item",function(req, res){
    let newItem = new Item({
        Product: req.body.Product,
        Brand: req.body.Brand,
        Quantity: req.body.Quantity,
        option: req.body.option,
        Option: req.body.Option
    });
    newItem.save();
    res.redirect('/item');
}) 


/*app.get('/sales', (req, res) => {
    res.render('sales');
})*/
const saleSchema = {
    CustomerName: String,
    item: String,
    Quantity: Number,
    date: String
}

const Sale = mongoose.model("Sale",saleSchema)

const executeSchema = {
    CustomerName: String,
    item: String,
    Quantity: Number,
    date: String
}

const Execute = mongoose.model("Execute",executeSchema)


app.get("/sales", (req, res) => { 
    items.find({}, function(err, items) {
        console.log(items)
        res.render('sales', {
            itemsList: items
        })   
    })      
});
    

app.post("/sales",function(req, res){
    let newSale = new Sale({
        CustomerName: req.body.CustomerName,
        item: req.body.item,
        Quantity: req.body.Quantity,
        date: req.body.date
    });
    let newExecute = new Execute({
        CustomerName: req.body.CustomerName,
        Item: req.body.Item,
        Quantity: req.body.Quantity,
        date: req.body.date
    });
    newSale.save();
    newExecute.save();
    res.redirect('/sales');
    console.log('running')
}) 
 

/*app.get("/salesdet", function(req, res){    
    res.render('salesdet')
})*/
const salesSchema={
    CustomerName:String,
    item:String,
    Quantity:Number,
    date:String
}
const sales = mongoose.model('sales',salesSchema);

app.get('/salesdet', (req, res) => {
    sales.find({}, function(err, sales) {
        res.render('salesdet', {
            salesList:sales
        })
    })
})

/*app.get("/purchase", function(req, res){    
    res.render('purchase')
})*/
const vendorSchema = {
    VendorName: String,
    item: String,
    Quantity: Number,
    date: String
}

const Vendor = mongoose.model("Vendor",vendorSchema)
 
app.get("/purchase", (req, res) => {
    items.find({}, function(err, items) {
        console.log(items)
        res.render('purchase', {
            itemsList: items
        })   
    })      
});

app.post("/purchase",function(req, res){
    let newVendor = new Vendor({
        VendorName: req.body.VendorName,
        item: req.body.item,
        Quantity: req.body.Quantity,
        date: req.body.date
    });
    newVendor.save();
    res.redirect('/purchase');
}) 

/*app.get("/purchasedet", function(req, res){    
    res.render('purchasedet')
})*/
const vendorsSchema = {
    VendorName: String,
    item: String,
    Quantity: Number,
    date: String
}

const Vendors = mongoose.model("Vendors",vendorSchema)
 
const vendors= mongoose.model('vendors',vendorsSchema);

 app.get('/purchasedet', (req, res) => {
    vendors.find({}, function(err, vendors) {
        res.render('purchasedet', {
            vendorsList: vendors
        })
    })

})

app.listen(5000, function(){
    console.log("server is running on 3000");
})












