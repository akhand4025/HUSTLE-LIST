const express = require("express");
const cors=require('cors');
const app = express();
//  ye sign.js me jaake signup router ko access kr rha 
const {router:signRouter,authmiddleware}=require('./sign.js');
// ye saare router ko chaleyga jisko bhi chalana hoga
app.use(express.json());
app.use('/',signRouter);

app.use(cors());
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
    res.json({msg:"posted"})
})
app.get("/todos",authmiddleware,async function(req,res){
    const todos = await todo.find({useId:req.userId});
    res.json({todos});
})
app.put("/completed",authmiddleware,async function(req,res){
    const updatePayload = req.body;
    const parsePayload = updatetodo.safeParse(updatePayload);
    if(!parsePayload){
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