import jwt from "jsonwebtoken"

 const isAuthenticated = (req , res , next ) =>{
    try {
        const token = req.cookies.token; 
        
        if( !token ){
            return res.status(400).json({
                message:"User not Authorised ", 
                success:false,
            })
        }
        
        // now check if the token is correct or not 
        const decodeToken = jwt.decode(token , process.env.SECRET_KEY ); 
        // console.log(decodeToken);
        if( ! decodeToken ){
            return res.status(400).json({
                message:"Invalid Token", 
                success:true,
            })
        }

        // if everything is right then store the id of user into token 
        req.id = decodeToken.userName; 
        // console.log(req.id); 
        next(); 
    } catch (error) {
        console.log(error);
    }
}

export default isAuthenticated; 