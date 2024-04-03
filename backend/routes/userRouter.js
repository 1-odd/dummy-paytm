const express = require("express");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const { User, Account } = require("../db");
const zod = require("zod");
const JWT_PASS = process.env.JWT_PASS;
const {authMiddleware} = require('../middleware')


// zod validation for signup data

const signupBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});

// zod validation for  login data

const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

// zod validation for update user info

const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional()
})

// middleware
const alreadyExist = async (req, res, next) => {
  const username = req.body.username;
  try {
    const exist = await User.findOne({ username });

    if (exist) {
      res.status(411).json(`User with email ${username} is already registered`);
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
        message:"Error in alreadyExist",
        error: error
      })
  }
};

// signup route

userRouter.post("/signup", alreadyExist, async (req, res) => {
  // validate the body of request using ZOD schema

  const correctData = signupBody.safeParse(req.body);
 

  if (!correctData.success) {
    return res.status(411).json({
      message: "Invalid email",
      errors: correctData.error.errors,
    });
  } else {
    try {
      const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      });

      const userId = user._id;

      // creating new account for the user

      const account = await Account.create({
        userId,
        balance: 1 + Math.random() * 10000 
      })

      const token = jwt.sign(
        {
          userId,
        },
        JWT_PASS
      );
      res.status(200).json({
        message: "User created successfully!",
        token:`Bearer ${token}`,
        user: user,
        account:account
      });
    } catch (error) {
        console.log(error);
      res.status(500).json({
        message:"Error in signUp",
        error: error
      })
    }
  }
});

userRouter.post("/signin", async (req, res) => {
  // Validate the request body 

  const correctadata = signinBody.safeParse(req.body);
  if (!correctadata.success) {
    return res.status(409).json({
      message: "Invalid credentials",
    });
  } else {
    const user = await User.findOne({
      username: req.body.username,
      password: req.body.password,
    });

    if (!user) {
      res.status(500).json({
        message: "user  not found!",
      });
    } 

      const userId = user._id;     
      const token = jwt.sign(
        {
          userId,
        },
        
        JWT_PASS
      );

      res.status(200).json({
        message: "User logged in successfully",
        token: `Bearer ${token}`,
      });
    
  }
});


// update the user infooo

userRouter.put('/updateUser', authMiddleware , async (req, res) => {

  const data = updateBody.safeParse(req.body);
  if(!data){
    res.status(400).json({
      message: 'invalid payload'
    })
  }
  try {

    const _id = req.userId;

    const user = await User.findByIdAndUpdate(_id,req.body,{new:true});
    if(!user){
      res.json({
        message: "No user with given id"
      })
    }
    else{
      res.status(200).json({
        message: "Profile updated Successfully!",
        userInfo : user
      })
    }
    
  } catch (error) {
    res.json({
      message: "NServer error in updating the data ",
      error: error.message
    })
  }

});




userRouter.get("/bulk",authMiddleware, async (req, res) => {
  try {
      const filter = req.query.filter || "";

      // Get the ID of the current user from the request
      const currentUserId = req.userId; // Assuming you have a middleware to extract userId from request
     

      // Search for users excluding the current user based on first name or last name containing the provided filter string
      const users = await User.find({
          $and: [
              { _id: { $ne: currentUserId } }, // Exclude the current user
              {
                  $or: [
                      { firstName: { $regex: filter, $options: "i" } }, // Case-insensitive search for first name
                      { lastName: { $regex: filter, $options: "i" } } // Case-insensitive search for last name
                  ]
              }
          ]
      });

      // Extract necessary fields and send response
      const simplifiedUsers = users.map(user => ({
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          _id: user._id
      }));

      res.json({ users: simplifiedUsers });
  } catch (error) {
      console.error("Error fetching bulk users:", error);
      res.status(500).json({ message: "Server error" });
  }
});


  

module.exports = userRouter;

