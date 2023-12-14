const express=require("express")
const cors=require('cors')
const userController = require("./routes/user.routes")
const connectDatabase = require("./db/db")
const notesController = require("./routes/notes.routes")
const auth=require('./middlewares/auth')
const app=express()
app.use(express.json())
app.use(cors())
app.get("/",(req,res)=>{
    res.send("Homepage")
})

app.use("/user",userController)

app.use(auth)
app.use("/notes",notesController)
app.listen(8080,async()=>{
     try {
        await connectDatabase()
        console.log("Server Started at port 8080")
     } catch (error) {
        console.log(error)
     }
})