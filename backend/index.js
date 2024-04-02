const express = require( 'express' );
const { connectDB } = require('./db');
require( 'dotenv' ).config();



const app = express();




const PORT = process.env.PORT || 3001;


function listner(){
    connectDB().then(()=>{
        app.listen(PORT,()=>{
            console.log("Server is running on port: "+ PORT);
        })
    }).catch((err)=>{console.error(err)});
}

listner();