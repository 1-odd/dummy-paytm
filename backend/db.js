const mongoose = require( 'mongoose' );


const connectDB = async ()=>{


    const URL = process.env.DB_URL;

    try {

        const conn = await mongoose.connect(`${URL}/dummy-paytm`)
        if(conn) console.log('MongoDB Connected...');
        else{
            throw new Error ('Could not Connect to MongoDB')
        }
        
    } catch (error) {

        console.log("Error in connecting to the database", error);
        
    }

}


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:[ true , "Username is required"],
        minLength: [5,"User name should be at least  5 characters"],
        maxLength: 40
    },
    
    password:{
        type:String,
        required:true,
        minLength: [6,"User name should be at least  5 characters"],
        maxLength: 20
    },
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
})



const accountSchema = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    balance:{
        type:Number,
        required:true,
    }

})

const User = mongoose.model('User',userSchema);
const Account = mongoose.model('Account',accountSchema);



module.exports = {
    connectDB,
    User,
    Account
}