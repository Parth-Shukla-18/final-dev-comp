import mongoose from "mongoose";
import { users } from '../DataBase/Schema.js';
import { posts } from '../DataBase/Schema.js'

const limit = 7;
// add post controller 
export const addPost =  async(req ,res) => {
    try {
        const {postData} = req.body;
        const codeType = postData.codeType; 
        const title = postData.title; 
        const description = postData.description; 
        const html = postData.html || ""; 
        const css = postData.css || "" ; 
        const js = postData.js || ""; 
        const react = postData.react || ""; 

        // console.log(postData);
        // console.log(req.id);
        
        // codeType ,title ,description ,html ,css ,js ,react,

        if( !title || !codeType ){
           return res.status(400).json({message:'some information is missing', success:false})
        }
        if(!html && !react){
           return res.status(400).json({message:'code is required', success:false})
        }

        // create the post
        if(codeType == 1){ // react
            const newPost = new posts({
                user:req.id,
                title,
                description,
                codeType: 1,
                react,
                likes: 0,
                disLikes: 0,
            })
            
            await newPost.save();
            return res.status(200).send(newPost)
        }
        else if(codeType == 2){ // non-react with tailwind
            const newPost = new posts({
                user: req.id,
                title,
                description,
                codeType: 2,
                html,
                css,
                js,
                likes: 0,
                disLikes: 0,
                
            })
            await newPost.save();
            return res.status(200).send(newPost)  
        }
        else if(codeType == 3){ // non-react
            const newPost = new posts({
                user: req.id,                
                title,
                description,
                codeType: 3,
                html,
                css,
                js,
                likes: 0,
                disLikes: 0,
            })
            await newPost.save();
            return res.status(200).send(newPost)
        }

        
    } catch (err) {
        // console.log(err);
        return res.status(500).json({ error: "Internal server error" });
    }
}

// liked posts controller 
export const likedPost = async (req ,res) => {
    try {        
        const  id  = req.id;
        const result = await users.aggregate([
            {
                $match: {_id: id }
            },
            {
                $unwind: "$likes"
            },
            {
                $lookup: {
                    from: "posts",
                    localField: "likes",
                    foreignField: "_id",
                    as: "postDetails"
                }
            },
            {
                $unwind: { path: "$postDetails", preserveNullAndEmptyArrays: true }
            },
            {
                $project: {
                    _id: 0,
                    postId: "$postDetails._id",
                    description: "$postDetails.description",
                    title: "$postDetails.title",
                    userId: "$postDetails.user",
                    codeType: "$postDetails.codeType",
                    html: { $ifNull: ["$postDetails.html", ""] },
                    css: { $ifNull: ["$postDetails.css", ""] },
                    js: { $ifNull: ["$postDetails.js", ""] },
                    react: { $ifNull: ["$postDetails.react", ""] },

                }
            },
        ])

        // process the result
        return res.status(200).json(result); 
        // return res.status(200).json({message:"liked the post" , success:true});

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
    } 
}


// disliked posts controller 
export const dislikedPost = async (req ,res) => {
    try {
        const id = req.id;
        const result = await users.aggregate([
            {
                $match: {_id: id }
            },
            {
                $unwind: "$disLikes"
            },
            {
                $lookup: {
                    from: "posts",
                    localField: "disLikes",
                    foreignField: "_id",
                    as: "postDetails"
                }
            },
            {
                $unwind: { path: "$postDetails", preserveNullAndEmptyArrays: true }
            },
            {
                $project: {
                    _id: 0,
                    postId: "$postDetails._id",
                    description: "$postDetails.description",
                    title: "$postDetails.title",
                    userId: "$postDetails.user",
                    codeType: "$postDetails.codeType",
                    html: { $ifNull: ["$postDetails.html", ""] },
                    css: { $ifNull: ["$postDetails.css", ""] },
                    js: { $ifNull: ["$postDetails.js", ""] },
                    react: { $ifNull: ["$postDetails.react", ""] },

                }
            },
        ])

        // process the result
        // console.log(result);
        return res.status(200).json(result);

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
    }
}


// saved posts controller 
export const savedPost = async (req ,res) => {
    try {
        const id = req.id;
        const result = await users.aggregate([
            {
                $match: {_id: id }
            },
            {
                $unwind: "$saved"
            },
            {
                $lookup: {
                    from: "posts",
                    localField: "saved",
                    foreignField: "_id",
                    as: "postDetails"
                }
            },
            {
                $unwind: { path: "$postDetails", preserveNullAndEmptyArrays: true }
            },
            {
                $project: {
                    _id: 0,
                    postId: "$postDetails._id",
                    description: "$postDetails.description",
                    title: "$postDetails.title",
                    userId: "$postDetails.user",
                    codeType: "$postDetails.codeType",
                    html: { $ifNull: ["$postDetails.html", ""] },
                    css: { $ifNull: ["$postDetails.css", ""] },
                    js: { $ifNull: ["$postDetails.js", ""] },
                    react: { $ifNull: ["$postDetails.react", ""] },

                }
            },
        ])
        // process the result
        // console.log(result);
        return res.status(200).json(result);

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
    } 
}

// like post controller 
export const likePost = async (req ,res) => {
   try {
    const id = req.id;  // userName
    const { apply , postId} = req.body;
    if (apply === true ) {
        // apply === true assume not liked before
        await users.updateOne(
            { _id: id },
            { $push: { likes: postId } }
        );

        await posts.updateOne(
            { _id: postId },
            { $inc: { likes: 1 } }
        );
       } else {
           // apply === false assume likied before
           await users.updateOne(
               { _id: id },
               { $pull: { likes: postId } }
           );
           await posts.updateOne(
               { _id: postId },
               { $inc: { likes: -1 } }
           );
       }
       return res.status(200).json('action preformed sucessfully')

   } catch (err) {
       console.log(err);
       return res.status(500).json({ error: "Internal server error" });
   }
}

// dislike post controller 
export const dislikePost = async (req ,res) => {
 
    try {
        const { apply , postId} = req.body;
        const id = req.id; 

        if (apply) {
            // apply === true assume not dislikied before
            await users.updateOne(
                { _id: id },
                { $push: { disLikes: postId } }
            );
            await posts.updateOne(
                { _id: postId },
                { $inc: { disLikes: 1 } }
            );
        } else {
            // apply === false assume dislikied before
            await users.updateOne(
                { _id: id },
                { $pull: { disLikes: postId } }
            );
            await posts.updateOne(
                { _id: postId },
                { $inc: { disLikes: -1 } }
            );
        }
        return res.status(200).json('disLiked sucessfully')
        
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
    }
}

// save post controller 
export const savePost = async (req ,res) => {
    try {
       const {apply, postId} = req.body;
       const id = req.id; 
       if(apply){
          await users.updateOne(
               {_id:id},
               { $push: {saved: postId}},
           )
       } else{
           await users.updateOne(
               {_id:id},
               {$pull: {saved: postId} },
           )
       }
       return res.status(200).json('save Updated sucessfully')

    } catch (err) {
       console.log(err)
       return res.status(500).send('Internal server error');
    }
}
// get all -> filter post 
// export const filterPost = async (req, res) => {
//     try {
//         const filter = req.params.filter || "all";
//         const code = req.params.code ? parseInt(req.params.code) : undefined;
//         const page = parseInt(req.query.page) || 1;
      
        
//         // const limit = parseInt(req.query.limit) || 2; // Ensure limit is defined
//         const skip = (page - 1) * limit;
//         console.log(page);
        
//         let matchStage = {};
//         if (filter !== 'all') {
//             matchStage.title = filter;
//         }
//         if (code !== undefined) {
//             matchStage.codeType = code;
//         } 
//         const result = await posts.aggregate([
//             {$match : matchStage},
//             { $sort: { likes: -1 } },
//             { $project: {
//                 _id: 0,
//                 postId: "$_id",
//                 description: "$description",
//                 title: "$title",
//                 userName: "$user",
//                 codeType: "$codeType",
//                 likes: "$likes",
//                 html: { $ifNull: ["$html", ""] },
//                 css: { $ifNull: ["$css", ""] },
//                 js: { $ifNull: ["$js", ""] },
//                 react: { $ifNull: ["$react", ""] },
//             }},
//             { $skip: skip },
//             { $limit: limit }
//         ])
        
//         res.status(200).send(result);
//     } catch (err) {
//         console.log(err); // Uncomment this line to log the error
//         res.status(500).send('Internal server error');
//     }
// };
export const filterPost = async (req, res) => {
    try {
        const filter = req.query.filter || "all";
        const code = req.query.code ? parseInt(req.query.code) : undefined;
        const page = req.query.page ? parseInt(req.query.page) : 1;

        console.log(`Page: ${page}, Code: ${code}, Filter: ${filter}`);
        const skip = (page - 1) * limit; // Calculate skip value


        // Build match stage based on filter and code
        let matchStage = {};
        if (filter !== 'all') {
            matchStage.title = filter;
        }
        if (code !== undefined && code > 0 && code < 4) {
            matchStage.codeType = code;
        }

        // Aggregate pipeline for filtering and pagination
        const result = await posts.aggregate([
            { $match: matchStage }, // Match stage based on filter and code
            { $sort: { likes: -1 } }, // Sort by likes in descending order
            {
                $project: {
                    _id: 0,
                    postId: "$_id",
                    description: "$description",
                    title: "$title",
                    userName: "$user",
                    codeType: "$codeType",
                    likes: "$likes",
                    html: { $ifNull: ["$html", ""] },
                    css: { $ifNull: ["$css", ""] },
                    js: { $ifNull: ["$js", ""] },
                    react: { $ifNull: ["$react", ""] },
                },
            },
            { $skip: skip }, // Skip based on page and limit
            { $limit: limit }, // Limit number of results
        ]);

        // console.log(result);

        res.status(200).send(result); // Send the resulting posts
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).send("Internal server error"); // Send an error response
    }
};

// get all posts controller 
export const getAllPosts = async ( req , res ) => {
    try {        
        const  userName  = req.id;
        const allPost = await posts.aggregate([
            { $match: { user: userName } },
            { $project: {
                _id: 0,
                postId: "$_id",
                description: "$description",
                title: "$title",
                userName: "$user",
                likes:"$likes",
                codeType: "$codeType",
                html: { $ifNull: ["$html", ""] },
                css: { $ifNull: ["$css", ""] },
                js: { $ifNull: ["$js", ""] },
                react: { $ifNull: ["$react", ""] },
            }},
        ]);

        return res.status(200).send(allPost);
        } 
        catch (err) {
            return res.status(500).send('Internal server error');
        }
}

// delete post controller 
export const deletePost = async (req , res ) =>{
    try {
        const { postIdArr } = req.body
        
        // Delete all documents from the posts collection by their IDs
        await posts.deleteMany({ _id: { $in: postIdArr } });
        return res.status(200).json('all posts deleted')
    } 
    catch (err) {
        return res.status(500).send('Internal server error')
    }
}

// delete liked posts controller 
export const deleteLikedPosts = async (req , res ) =>{
    console.log("hello");
    
    try {
        const { likeArr } = req.body;
        const userName = req.id;         

        if (!likeArr || likeArr.length === 0) {
            return res.status(400).send('likeArr is required');
        }

        // Remove all post IDs from the likes array in the users collection
        if (likeArr.length > 1) {
            await users.updateOne(
                { _id: userName },
                { $set: { likes: [] } }
            );
        } else if (likeArr.length === 1) { //remove id from users collection
            await users.updateOne(
                { _id: userName },
                { $pull: { likes: likeArr[0] } }
            );
        }
        // Decrement the likes count in the posts collection for each post ID
        await posts.updateMany(
            { _id: { $in: likeArr } },
            { $inc: { likes: -1 } }
        );

        res.status(200).json('Likes removed and counts updated');
    } catch (err) {
        res.status(500).send('Internal server error');
    }
}

// delete disLiked posts controller 
export const deleteDisLikedPosts = async (req , res ) =>{
    try {
        const {  disLikeArr } = req.body;
        const userName = req.id; 

        if (!disLikeArr || disLikeArr.length === 0) {
            return res.status(400).send('disLikeArr is required');
        }

        // Remove all post IDs from the disLikes array in the users collection
        if (disLikeArr.length > 1) {
            await users.updateOne(
                { _id: userName },
                { $set: { disLikes: [] } }
            );
        } else if (disLikeArr.length === 1) {
            await users.updateOne(
                { _id: userName },
                { $pull: { disLikes: disLikeArr[0] } }
            );
        }
        // Decrement the disLikes count in the posts collection for each post ID
        await posts.updateMany(
            { _id: { $in: disLikeArr } },
            { $inc: { disLikes: -1 } }
        );
        res.status(200).json('disLikes removed and counts updated');
    } catch (err) {
        res.status(500).send('Internal server error');
    } 
}

// delete Saved posts controller 
export const deleteSavedPosts = async (req , res ) =>{
    try {
        const {savedArr} = req.body;
        const userName = req.id; 
    
        if(!savedArr || savedArr.length === 0){
            return res.status(400).send('Saved array is required')
        }
        if(savedArr.length > 1){
            await users.updateOne(
                // Remove all post IDs from the disLikes array in the users collection
                { _id: userName },
                { $set: { saved: [] } }
            );
        } else if(savedArr.length === 1){
            await users.updateOne(
                {_id:userName},
                {$pull:{saved:savedArr[0]}}
            )
        }
        res.status(200).json('Saved removed');
       } catch (err) {
           res.status(500).send('Internal server error');
       }
}

// get other user post controller
export const getOtherUserPosts = async (req, res) =>{
    try {                
        const  {userName}  = req.query;
        const allPost = await posts.aggregate([
            { $match: { user: userName } },
            { $project: {
                _id: 0,
                postId: "$_id",
                description: "$description",
                title: "$title",
                userName: "$user",
                likes:"$likes",
                codeType: "$codeType",
                html: { $ifNull: ["$html", ""] },
                css: { $ifNull: ["$css", ""] },
                js: { $ifNull: ["$js", ""] },
                react: { $ifNull: ["$react", ""] },
            }},
        ]);

        return res.status(200).json(allPost);
        } 
        catch (err) {
            return res.status(500).json('Internal server error');
        }
}