const express = require( 'express' );
const { connectDB } = require('./db');
require( 'dotenv' ).config();
const cors = require('cors');
const {router} =  require("./routes/index");



const app = express();
app.use(cors());
app.use( express.json() ) ;
app.use( '/api/v1', router);






const PORT = process.env.PORT || 3001;


function listner(){
    connectDB().then(()=>{
        app.listen(PORT,()=>{
            console.log("Server is running on port: "+ PORT);
        })
    }).catch((err)=>{console.error(err)});
}

listner();