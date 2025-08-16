import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import main from './Gemini.js';
import UserModel from './mongoose.js';


dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());


var userDetails;



mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));


app.post('/message', async (req, res) => {
       const { prompt }   = req.body; 
     //   console.log(prompt);
     if(!prompt) 
          return res.status(400).json({error: "Message is required"});
     try {
        const response = await main(prompt);
        return res.status(200).json({ response });
    } catch (error) {
          console.error(error);
          return res.status(500).json({ error: "An error occurred while processing your request", error });
          
     }
     
});


app.post('/signup', async(req, res) => {
     const {name, email, password} = req.body;
     const Anyuser = await  UserModel.findOne({email});
     if(Anyuser){
        return res.status(200).json({message: "User already exists"})
     }

     const newUser = await UserModel.create({
          name,
          email,
          password
     })
      
     return res.status(200).json({message: "User created successfully"})

})


app.post('/login', async(req, res) => {
      const {email, password} = req.body;
       userDetails = await UserModel.findOne({email});
      if(!userDetails){
          return res.status(200).json({message: "User not found Please sign up"})
      }

          if(userDetails.password !== password){
               return res.status(200).json({message: "Incorrect password"})
          }

          return res.status(200).json({message: "Login successful", detail: userDetails})
})


app.put('/updatedata', async(req, res) => {
      const {userPrompt,user} = req.body;

      await UserModel.findByIdAndUpdate(user._id, {
          $push: { userPrompt: userPrompt}
      }, { new: true });

      return res.status(200).json({message: "Data updated successfully"})
})

app.put('/update',async(req, res) =>{
     const { user, updatedChats } = req.body;

     await UserModel.findByIdAndUpdate(user._id,{
          userPrompt : updatedChats
     },{new : true})
     console.log(updatedChats);
     return res.status(200).json({message: "Data updated successfully"})
}
)

app.post('/getdata', async (req, res) => {
      const {id} = req.body;
      const userdata = await UserModel.findById(id);
      console.log(userdata);
      return res.status(200).json({userdata: userdata});
    
     })


app.use('/', async (req, res) => {
         return res.status(200).json({ message: "Initialization successful" });
})

app.get('/ping', async(req, res)=>{
     res.status(200).send("This is API check")
})

app.listen(3000,()=>{
     console.log(`Server running on the port ${process.env.PORT}`);
})


