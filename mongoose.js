import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
     name :{
          type : String,
          require : true
     },
     email :{
          type : String,
          require : true
     },
     password : {
          type : String,
          require : true
     },
     userPrompt : {
          type : [String],
     }
})

const UserModel = mongoose.model("user", userSchema);

export default UserModel;