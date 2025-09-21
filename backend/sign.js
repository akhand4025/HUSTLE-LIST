const express=require('express');
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken');
const User =require('./user.js');
const router=express.Router();
const JWT_SECRET="12345";
const {info}=require('./zod');

                            //  SIGNUP PAGE

router.post('/signup',async function(req,res){
    const {name,password}=req.body;
    const isvalid=info.safeParse({name,password});
    if(!isvalid.success){
     return res.status(411).json({msge:"entered wrong input "})
    }

    try{
      const existname= await User.findOne({userName:name});
      if(existname){
      return  res.status(411).json({msge:"username already exist"});
      }

      const hashedpass =  await bcrypt.hash(password,10);

    //    saving in newUser IN DATABASE
      const newUser = new User({
           userName:name,
           password:hashedpass
      })

      await newUser.save();

    //   generate token here 
     const token = jwt.sign({id:newUser._id},JWT_SECRET);
     res.json({token});

    }
    catch(err){
        res.status(500).json({msge:"Something went wrong"});
    }
})

                    //     SIGNIN page

router.post('/signin',async function(req,res){
  const {name,password} =req.body;
  const isvalid=info.safeParse({name,password});
    if(!isvalid.success){
      return res.status(411).json({msge:"entered wrong input "})
    }

  
  try{
    const existname=await User.findOne({userName:name});
    if(!existname){
      return res.status(401).json({msge:"user not found"});
    }

    const matched = bcrypt.compare(password,existname.password);
    if(!matched){
     return  res.status(401).json({msge:"invalid password"});
    }
    const token=  jwt.sign({id:existname.id},JWT_SECRET);
    res.json({token});
  } 


  catch(err){
    res.status(500).json({msge:"something going wrong"+err})
  }
})



            //   AUTHENTICATION MIDDLEWARE 

       function authmiddleware(req,res,next){
        const token=req.headers["authorization"];
        // console.log(token);
        if(!token){
          return res.status(401).json({msge:"request failed"});
        }

        try{
          const decoded=jwt.verify(token.split(" ")[1],JWT_SECRET);
          req.userId=decoded.id;
          next()
        }
           catch(err){
            res.status(401).json({msge:"something gone wrong"+err});
           }
       }       
       
      
module.exports={router,authmiddleware}



