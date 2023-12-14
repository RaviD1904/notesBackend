const jwt=require('jsonwebtoken')

const auth=(req,res,next)=>{
    if(!req.headers.authorization){
        return res.send("Token Required for authtication")
    }
   
    const token=req.headers.authorization.split(' ')[1]
    jwt.verify(token,'secret',function(err,decoded){
        if(err){
            return res.send('please login again')
        }
        // console.log(decoded)    
        req.body.userID=decoded.userID
        next()
    })

}


module.exports=auth