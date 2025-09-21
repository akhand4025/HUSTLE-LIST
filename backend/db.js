const mongoose=require('mongoose');

// connect mongo db
mongoose.connect("mongodb+srv://akhand4025_db_user:AhGqek4wwoBPBQgo@cluster0.94ciyj1.mongodb.net/todo");

// making schema
const todoschema=mongoose.Schema({
    title:String,
    description:String,
    useId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"users"
        },
    completed:Boolean
})

//  mongoose model
const todo=mongoose.model("todos",todoschema);

// exporting here
module.exports={todo}
