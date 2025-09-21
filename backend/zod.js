const zod=require('zod');
//  for create
const createtodo=zod.object({
    title:zod.string(),
    description:zod.string()
})
//  for update
const updatetodo=zod.object({
   id:zod.string()
})

//  signin
const info=zod.object({
    name:zod.string(),
    password:zod.string()
})

//  export this file
module.exports={
    createtodo:createtodo,
    updatetodo:updatetodo,
   info:info

}