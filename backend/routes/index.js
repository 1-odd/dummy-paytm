const express = require( 'express' );
const userRouter = require ('./userRouter') ; 
const router = express.Router();
const accountRouter = require( './accountRoutes');


router.use('/user',userRouter);
router.use('/account',accountRouter)


module.exports = {router};