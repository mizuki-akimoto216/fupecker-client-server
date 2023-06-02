import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import 'dotenv/config';

const server = express();
server.use(express.json());
const port = process.env.NODEPORT;
server.use(cors());

// server.listen(port,function(){
//     console.log('server started and sunning port on', port);
// })

//Arrow function method
server.listen(port, () => {
    console.log('server started and sunning port on', port);
})

const db = mysql.createConnection({
    port: process.env.DBPORT,
    host: process.env.DBSERVER,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DB
})

db.connect((error) => {
    // if(error){
    //     console.log('Connection to SQL failed', error);
    // } else {
    //     console.log('Successfully connected to MySQL');
    // }
    //ifelseのいい感じの書き方
    (error)? console.log('Connection to SQL failed', error) : console.log('Successfully connected to MySQL');
})

//For home
//get all product
server.get('/products', (req, res) => {

    let SQLQuery = "CALL `getAllProducts`()";

    db.query(SQLQuery, (error, data) => {
        if(error){
            res.json({error_message: error})
        } else {
            //情報無視
             res.json({ products: data[0]})
            //最初のデータのnameだけ
            //res.json({ products: data[0][0].name})
        }
    })

})

//get product by id
server.get('/products/:productID', (req, res) => {
    let SQLQuery = "CALL `getProductByID`(?)"; 
    let reqParamID = req.params.productID;
    // let reqName = req.params.name;
    // console.log(reqParamID);
    // res.json({id: reqParamID, title: reqName});
    db.query(SQLQuery, [reqParamID], (error, data) => {
        (error)? res.json({error_message:error}) : res.json({data: data[0]});
    })
})

//For product page
//get product info
server.get('/productsInfo/:productID', (req, res) => {
    let SQLQuery = "CALL `getProductsInfo`(?)"; 
    let reqParamID = req.params.productID;

    db.query(SQLQuery, [reqParamID], (error, data) => {
        (error)? res.json({error_message:error}) : res.json(data[0][0]);
    })
})

// select user
server.post('/users', (req, res) => {

    let email = req.body.email;
    let password = req.body.password;

    let SQLQuery = "CALL `validateUser`(?, ?)";

    db.query(SQLQuery, [email, password], (error, data) => {
        if(error) {
            res.json({message: error});
        } else {
            if(data[0].length > 0){
                res.json(true);
            } else {
                res.json(false);
            }
        }
    })
})

//For admin product
//Read
server.get('/adminProducts', (req, res) => {

    let SQLQuery = "CALL `getAllAdminProducts`()";

    db.query(SQLQuery, (error, data) => {
        (error)? res.json({message:false}) : res.json(data[0])
    })
})

//add
server.post('/adminProducts', (req, res) => {
    let name = req.body.name;
    let price = req.body.price;  
    let stock = req.body.stock;
    let description = req.body.description;
    let online = req.body.online;

    let SQLQuery = "CALL `addNewProduct`(?, ?, ?, ?, ?)";

    db.query(SQLQuery, [name, price, stock, description, online], (error, data) => {
        (error)? res.json(false) : res.json(true);
    })
})

//update
server.put('/adminProducts/:productID', (req, res) => {

    let reqParamID = req.params.productID;
    let name = req.body.name;
    let price = req.body.price;  
    let stock = req.body.stock;
    let description = req.body.description;
    let online = req.body.online;

    let SQLQuery = " CALL `updateProduct`(?, ?, ?, ?, ?, ?)";

    db.query(SQLQuery, [reqParamID, name, price, stock, description, online], (error, data) => {
        (error)? res.json(false) : res.json(true);
    })
})

//delete
server.delete('/adminProducts/:productID', (req, res) => {

    let reqParamID = req.params.productID;

    let SQLQuery = "CALL `deleteProduct`(?)";

    db.query(SQLQuery, [reqParamID], (error, data) => {
        (error)? res.json(false) : res.json(true);
    })
})


//For admin product detail
//Read productDetail
server.get('/adminProductDetails/:productID', (req, res) => {

    let SQLQuery = " CALL `getAllProductsDetail`(?)";
    let reqParamID = req.params.productID;

    db.query(SQLQuery, [reqParamID], (error, data) => {
        (error)? res.json({message:false}) : res.json(data[0])
    })
})

//add productDetail
server.post('/adminProductDetails', (req, res) => {
    let id = req.body.id;
    let image = req.body.image;  
    let colorCode = req.body.colorCode;
    let colorName = req.body.colorName;

    let SQLQuery = "CALL `addNewProductDetail`(?, ?, ?, ?)";

    db.query(SQLQuery, [id, image, colorCode, colorName], (error, data) => {

        (error)? res.json(false) : res.json(true)

    })
})

//update productDetail
server.put('/adminProductDetails/:productDetailID', (req, res) => {

    let reqParamID = req.params.productDetailID;
    let image = req.body.image;  
    let colorCode = req.body.colorCode;
    let colorName = req.body.colorName;

    let SQLQuery = " CALL `updateProductDetail`(?, ?, ?, ?)";

    db.query(SQLQuery, [reqParamID, image, colorCode, colorName], (error, data) => {
        (error)? res.json(false) : res.json(true);
    })
})

//delete productDetail
server.delete('/adminProductDetails/:productID', (req, res) => {

    let reqParamID = req.params.productID;

    let SQLQuery = "CALL `deleteProductDetail`(?)";

    db.query(SQLQuery, [reqParamID], (error, data) => {
        (error)? res.json(false) : res.json(true);
    })
})

server.put('/productOnline/:productID', (req, res) => {
    let SQLQuery = "CALL `updateProductOnline`(?, ?)"; 

    let reqParamID = req.params.productID;
    let online = req.body.online;  

    db.query(SQLQuery, [reqParamID, online], (error, data) => {
        (error)? res.json(false) : res.json(true);
    })
})