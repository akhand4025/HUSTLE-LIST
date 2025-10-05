const express = require("express");
const app = express();
const cors=require('cors');
app.use(cors());
//  ye sign.js me jaake signup router ko access kr rha 
const {router:signRouter,authmiddleware}=require('./sign.js');
// ye saare router ko chaleyga jisko bhi chalana hoga
app.use(express.json());
app.use('/',signRouter);

const {createtodo,updatetodo} = require("./zod");
const {todo} = require("./db");

app.post("/todo",authmiddleware,async function(req,res){
    const createPayload = req.body;
    const parsePayload = createtodo.safeParse(createPayload);
    if(!parsePayload){
        res.status(411).json({
            msg:"wrong input"
        })
        return;
    }
    //put in database
    await todo.create({
        title:createPayload.title,
        description:createPayload.description,
        useId:req.userId,
        completed:false
    })
    return res.status(200).json({msg:"posted"})
})
app.get("/todos",authmiddleware,async function(req,res){
    const todos = await todo.find({useId:req.userId});
    res.json({todos});
})


//  for delte todo int he database
app.delete("/delt",authmiddleware,async function(req,res){
   
    try{
        const {id}=req.body;
    const deletedtodo=await todo.findByIdAndDelete(id);
        if(!deletedtodo){
           return res.status(411).json({msge:"Todo not found"});
        }else{
            return  res.status(200).json({msge:"Todo deleted successfully"});
        }

    }catch(err){
       return res.status(411).json("something went wrong"+err);
    }

})


app.put("/completed",authmiddleware,async function(req,res){
    const updatePayload = req.body;
    const parsePayload = updatetodo.safeParse(updatePayload);
    if(!parsePayload.success){
        res.status(403).json({
            msg:"invalid id"
        });
    }
    await todo.updateOne({
        _id:updatePayload.id,
        useId:req.userId
    },{
        completed:true
    })
    res.json({
        msg:"updated"
    })

})
app.listen(3000);