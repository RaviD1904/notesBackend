
const mongoose=require('mongoose')
const uri = "mongodb+srv://root:Ravi123@cluster0.3zkv8yt.mongodb.net/notes?retryWrites=true&w=majority";



const connectDatabase=async()=>{
try {
  const conn=await mongoose.connect(uri)
  console.log("Successfully Connected to database")
} catch (error) {
  // conn.disconnect()
  console.log("Failed to connect database")
} 


}

module.exports=connectDatabase;