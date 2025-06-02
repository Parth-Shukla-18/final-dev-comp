import { users } from '../DataBase/Schema.js'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const limit = 10;
// Register controller
export const register = async( req , res ) =>{
    try {
        const { userData } = req.body;
        const userName = userData.userName;
        const fullName = userData.fullName;
        const selfDescription = userData.selfDescription;
        const password = userData.password;
        const collegeName = userData.userName;
        const email = userData.email;
        
        if(!userName || !password || !email || !fullName){
            return res.status(400).send('some information is missing ')
        }
        // apply middleware before saving
        // bcrypt , authentication , token generation, etc.
        const hashedPassword = await bcrypt.hash( password , 10); 

        const newUser = new users({
            _id:userName,
            fullName,
            collegeName,
            password:hashedPassword,
            email,
            selfDescription,
        })
        await newUser.save()
           return res.status(200).send(newUser)
       }  
       catch (err) {
           console.error(err);
           
           if (err.code === 11000) { // Correct way to check duplicate key error
               return res.status(409).json({ error: "User already exists" });
           }
   
           return res.status(500).json({ error: "Internal server error" });
       }
}

// Login controller 
export const login = async ( req , res ) =>{
    
    try {
        const {userName , password } = req.body;
        const _id = userName;   

        if( !_id || !password ){
            res.status(400).json({
                message:"Some information is missing", 
                sucess:false
            })
        }

        
        // checking if the user exists or not 
        const user = await users.findOne({_id}); 
        if( ! user ){
            return res.status(400).json({
                message:"Username does not exists", 
                success:false,
            })
        }

        // now checking if the password is correct or NOT 
        const correctPass = await bcrypt.compare( password , user.password); 
        if( !correctPass ){
            res.status(400).json({
                message:"Incorrect username or password", 
                success:false,
            })
        }

        // we will store the userId in the form of abject inside the token 
        const tokenData = { userName : user._id }; 

        // now as all the details are correct , so generating the TOKEN
        const token = jwt.sign( tokenData , process.env.SECRET_KEY , {expiresIn :'1d'} ); 


        // now adding the details of the user in user variable 
        const newUser = {
            userName:user._id, 
            fullName:user.fullName,
            collegeName:user.collegeName, 
            email:user.email,  
            selfDescription:user.selfDescription,
        }

        // send the token in the from of cookie in the browser 
        return res.status(201).cookie("token", token,  {maxAge: 1*24*60*60*1000 , httpsOnly:true , sameSite:'strict'}).json({
            message:`Welcome back ${newUser.fullName}`, 
            newUser, 
            success:true,
        })
    } catch (error) {
        console.log(error);
    }
}

// Log out controller 
export const logout = (req , res ) =>{
    try {
        // we will just empty the browser token 
        return res.status(201).cookie("token", "" ,  {maxAge : 0 } ).json({
            message:"Logged out successfully", 
            success:true,
        })
    } catch (error) {
        console.log(error); 
    }
}

// See profile controller 
export const seeProfile = async (req ,res) =>{
    
    // find user details by id from "User" then 
    // find all posts by userId from "Post"
    try {
        const userName = req.id;
        const _id = userName; 

        if(!_id){
            return res.status(400).send('Id not found')
        }
        // console.log("hello Pawan Bhai");
        
        const User = await users.findById(_id);
        if (!User) {
            return res.status(404).send('User not found');
        }

        const newUser =  {
            userName:User._id, 
            fullName:User.fullName,
            collegeName:User.collegeName, 
            email:User.email,  
            selfDescription:User.selfDescription,
            likes:User.likes,
            disLikes:User.disLikes,
            saved:User.saved
        }
        return res.status(200).send(newUser);
    } 
    catch (err) {
        console.log(err)
        return res.status(500).send('Internal server error')
    }

}

// update profile controller 
export const updateProfile =  async(req, res) => {
    
    // partial update : update only specified fields
    try {
        const _id  = req.id; 
        const { userData } = req.body;
         
        if(!_id){
            return res.status(400).send('username not found')
        }

        // email updating will be done later 

       const result =  await users.findByIdAndUpdate(_id,  userData ,{ new: true });
    
        return res.status(200).json(`updated sucessfully`)

    } 
    catch (err) {
        console.log(err)
        return res.status(500).json('Internal server error')
    }
}

// change password controller
export const changePassword = async( req , res ) =>{
    try {
        const { oldPassword ,newPassword} = req.body;
        const userName = req.id; 

        const User = await users.findById(userName);
        if (!User) {
            return res.status(404).send('User not found');
        }

        // match oldPassword with saved password      
        const correctPass = await bcrypt.compare( oldPassword , User.password); 
        if( correctPass != true ){ 
            return res.status(404).send('Incorrect Password');
        }
        // save new password in incripted form
        const bcryptedPass = await bcrypt.hash( newPassword, 10);
        await users.updateOne({_id : userName} ,{$set: { password: bcryptedPass }}); 
        
        // const email = User.email;
        // await sendPasswordUpdatedMail(email, userName);

        // save new password in incripted form 
        return res.status(200).json('password updated successfully');

    } catch (err) {
        console.log(err)
        return res.status(500).json('Internal server error')
    }
}

// forgot password controller 
export const forgotPassword = async ( req , res ) =>{
    try {
        const { email ,password } = req.body;
        // console.log(req.body); 

        const User = await users.findOne({email});
        if (!User) {
            return res.status(404).send('User not found');
        }
        
        // save this password in increpted form
        const bcryptedPass = await bcrypt.hash( password , 10 ); 
        await users.updateOne({_id : User._id} ,{$set: { password: bcryptedPass }});
        
        // console.log(result); 
        // await sendPasswordUpdatedMail(email, userName);
        
        return res.status(200).json('password updated successfully');

    } catch (err) {
        console.log(err)
        return res.status(500).json('Internal server error')
    }
}

// other user profile controller 
export const otherUserProfile = async (req , res ) =>{
    try {
        const { userName } = req.query;
        if(!userName){
            return res.status(400).send('Id not found')
        }
        const user = await users.findOne(
            { _id: userName },
            {
              _id: 1,
              fullName: 1,
              collegeName: 1,
              selfDescription: 1
            }
          );
          
          if (!user) {
            return res.status(404).json('User not found');
          }
          
          const data = {
            userName: user._id,
            fullName: user.fullName,
            collegeName: user.collegeName,
            selfDescription: user.selfDescription
          };

        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json('Internal server error')
    }
}

// change image controller 
export const changeImage = async (req , res ) =>{
    try {
        const userName = req.id; 
        const plainFiles = { ...req.files }; 

        const updates = {};
        for (const [type, fileArr] of Object.entries(plainFiles)) {
            if (fileArr.length > 0) {
              updates[type] = fileArr[0].path;
            }
        }

        // const [key, value] = Object.entries(updates)[0];
 
        // Update in DB (you can also get user ID from auth middleware)
        await users.findByIdAndUpdate(userName, {$set:updates } , { new: true }); 
    //    console.log(bgImg);
       
        
        res.status(200).json({ message: "uploaded successfully"});
    }
    catch (err) {
    res.status(500).json({ error: 'Upload failed', details: err });
    }  
}

// get profile image controller 
export const getProfileImage = async ( req , res ) =>{
    try {
        const userName = req.id; 
        
        const currUser = await users.findById({_id : userName });
        // console.log(userName); 
        // console.log(currUser);
        
        const bgImg = currUser.bgImg; 
        const profileImg = currUser.profileImg; 
       
       return res.status(200).json({bgImg , profileImg}); 
    } 
    catch (error) {
        console.log("internal server error"); 
    }
}


// fn - 
// cn - 
// des -