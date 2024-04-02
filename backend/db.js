const mongoose = require( 'mongoose' );


const connectDB = async ()=>{


    const URL = process.env.DB_URL;

    try {

        const conn = await mongoose.connect(`${URL}/dummyPaytm`)
        if(conn) console.log('MongoDB Connected...');
        else{
            throw new Error ('Could not Connect to MongoDB')
        }
        
    } catch (error) {

        error.log("Error in connecting to the database", error);
        
    }

}



module.exports = {
    connectDB
}