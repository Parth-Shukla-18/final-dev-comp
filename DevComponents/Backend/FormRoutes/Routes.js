// import express from 'express'
// import { users , posts, appdata } from '../DataBase/Schema.js';
// import { sendPasswordUpdatedMail } from '../middlewares/SendMail.jsx';

// const app = express();
// const limit = 10;

// app.post('/changePassword' , async (req ,res) => {
//     try {
//         const { oldPassword ,newPassword , userName} = req.body;
//         const User = await users.findById(userName);
//         if (!User) {
//             return res.status(404).send('User not found');
//         }

//         // match oldPassword with saved password      
//         const correctPass = await bcrypt.compare( oldPassword , User.password); 
//         if( correctPass != true ){ 
//             return res.status(404).send('Incorrect Password');
//         }
//         // save new password in incripted form
//         const bcryptedPass = await bcrypt.hash( newPassword, 10);
//         users.updateOne({_id : userName} ,{$set: { password: bcryptedPass }}); 
//         const email = User.email;
//         await sendPasswordUpdatedMail(email, userName);

//         // save new password in incripted form 
//         return res.status(200).send('password updated successfully');

//     } catch (err) {
//         console.log(err)
//         return res.status(500).send('Internal server error')
//     }
// })

// app.post('/forgotPassword' , async (req ,res) => {
//     try {
//         const { email ,password } = req.body;
//         const User = await users.findOne({email});
//         if (!User) {
//             return res.status(404).send('User not found');
//         }
//         // save this password in increpted form
//        const bcryptedPass = await bcrypt.hash( password , 10 ); 
//         users.updateOne({_id : User.userName} ,{$set: { password: bcryptedPass }});

//         await sendPasswordUpdatedMail(email, userName);

//         return res.status(200).send('password updated successfully');
//     } catch (err) {
//         console.log(err)
//         return res.status(500).send('Internal server error')
//     }
// })

// // app.patch('/addFilter' ,async (req ,res) => {
// //     try {
// //         const filterData = req.body.filterData || '';
// //         let filterArr;
// //         if (!filterData) {
// //             const data = await appdata.findOne(); 
// //             filterArr = data ? data.filterArr : [];
// //         } else {
// //             filterArr = await appdata.findOneAndUpdate(
// //                 {},
// //                 { $push: { filterArr: filterData } },
// //                 { upsert: true, new: true }
// //             );
// //         }

// //         return res.status(200).send(filterArr);
// //     } catch (err) {
// //         console.error(err);
// //         return res.status(500).send("Internal server error");
// //     }
// // });

// //Combined filter

// app.get('/:filter?/:code?', async (req, res) => {
//     try {
//         const filter = req.params.filter || "all";
//         const code = req.params.code ? parseInt(req.params.code) : undefined;
//         const page = parseInt(req.query.page) || 1;
//         // const limit = parseInt(req.query.limit) || 10; // limit is decleared above
//         const skip = (page - 1) * limit;
//         let matchStage = {};
//         if (filter !== 'all') {
//             matchStage.title = filter;
//         }
//         if (code !== undefined) {
//             matchStage.codeType = code;
//         }
//         const pipeline = [
//             { $sort: { likes: -1 } },
//             { $project: {
//                 _id: 0,
//                 postId: "$_id",
//                 description: "$description",
//                 title: "$title",
//                 userName: "$user",
//                 codeType: "$codeType",
//                 html: { $ifNull: ["$html", ""] },
//                 css: { $ifNull: ["$css", ""] },
//                 js: { $ifNull: ["$js", ""] },
//                 react: { $ifNull: ["$react", ""] },
//             }},
//             { $skip: skip },
//             { $limit: limit }
//         ];
//         if (filter !== 'all' || code !== undefined) {
//             pipeline.unshift({ $match: matchStage });
//         }
//         const result = await posts.aggregate(pipeline).toArray();
//         res.status(200).send(result);
//     } catch (err) {
//         res.status(500).send('Internal server error');
//     }
// });

// // // find posts using both filter
// // app.get('/:filter?/:code?', async (req, res) => {
// //     try {
// //         const filter = req.params.filter || "all";
// //         const code = parseInt(req.params.code) || 2;
// //         const page = parseInt(req.query.page) || 1;
// //         // const limit = parseInt(req.query.limit) || 10;
// //         // limit variable decleared on top
// //         const skip = (page - 1) * limit;
// //         let pipeline = [];
// //         if (filter === 'all') {
// //             pipeline = [
// //                 { $match: { codeType: code } },
// //                 { $sort: { likes: -1 } },
// //                 { $project: {
// //                     _id: 0,
// //                     postId: "$_id",
// //                     description: "$description",
// //                     title: "$title",
// //                     userName: "$user",
// //                     codeType: "$codeType",
// //                     html: { $ifNull: ["$html", ""] },
// //                     css: { $ifNull: ["$css", ""] },
// //                     js: { $ifNull: ["$js", ""] },
// //                     react: { $ifNull: ["$react", ""] },
// //                 }},
// //                 { $skip: skip },
// //                 { $limit: limit }
// //             ];
// //         } else {
// //             pipeline = [
// //                 { $match: { title: filter, codeType: code } },
// //                 { $sort: { likes: -1 } },
// //                 { $project: {
// //                     _id: 0,
// //                     postId: "$_id",
// //                     description: "$description",
// //                     title: "$title",
// //                     userName: "$user",
// //                     codeType: "$codeType",
// //                     html: { $ifNull: ["$html", ""] },
// //                     css: { $ifNull: ["$css", ""] },
// //                     js: { $ifNull: ["$js", ""] },
// //                     react: { $ifNull: ["$react", ""] },
// //                 }},
// //                 { $skip: skip },
// //                 { $limit: limit }
// //             ];
// //         }
// //         const result = await posts.aggregate(pipeline).toArray();
// //         res.status(200).send(result);
// //     } catch (err) {
// //         console.error(err);
// //         res.status(500).send('Internal server error');
// //     }
// // }); //done

// // //find posts using filter
// // app.get('/:filter?', async (req, res) => {
// //     try {
// //         const filter = req.params.filter || "all";
// //         const page = parseInt(req.query.page) || 1;
// //         // limit variable decleared on top
// //         const skip = (page - 1) * limit;
// //         let pipeline = [];
// //         if (filter === 'all') {
// //             pipeline = [
// //                 { $sort: { likes: -1 } },
// //                 { $project: {
// //                     _id: 0,
// //                     postId: "$_id",
// //                     description: "$description",
// //                     title: "$title",
// //                     userName: "$user",
// //                     codeType: "$codeType",
// //                     html: { $ifNull: ["$html", ""] },
// //                     css: { $ifNull: ["$css", ""] },
// //                     js: { $ifNull: ["$js", ""] },
// //                     react: { $ifNull: ["$react", ""] },
// //                 }},
// //                 { $skip: skip },
// //                 { $limit: limit }
// //             ];
// //         } else {
// //             pipeline = [
// //                 { $match: { title: filter } },
// //                 { $sort: { likes: -1 } },
// //                 { $project: {
// //                     _id: 0,
// //                     postId: "$_id",
// //                     description: "$description",
// //                     title: "$title",
// //                     userName: "$user",
// //                     codeType: "$codeType",
// //                     html: { $ifNull: ["$html", ""] },
// //                     css: { $ifNull: ["$css", ""] },
// //                     js: { $ifNull: ["$js", ""] },
// //                     react: { $ifNull: ["$react", ""] },
// //                 }},
// //                 { $skip: skip },
// //                 { $limit: limit }
// //             ];
// //         }
// //         const result = await posts.aggregate(pipeline).toArray();
// //         res.status(200).send(result);
// //     } catch (err) {
// //         console.error(err);
// //         res.status(500).send('Internal server error');
// //     }
// // }); //done

// // get other user's details by userName (fullName , CollageName , SelfDescription) only
// app.get('/userData' , async (req ,res) => {
//     try {
//         const { userName } = req.query;
//         if(!userName){
//             return res.status(400).send('Id not found')
//         }
//         const data = await users.findOne({ _id: userName }, {
//             projection: {
//                 _id: 0,
//                 userName: "$_id",
//                 fullName: 1,
//                 collageName: 1,
//                 selfDescription: 1,
//             }
//         });
//         if (!data) {
//             return res.status(404).send('User not found');
//         }
//         res.status(200).send(data);
//     } catch (err) {
//         res.status(500).send('Internal server error')
//     }
// }) // done

// // to get all liked of any user by userName
// app.get('/liked' , async (req ,res) => {
//     try {
//         const { userName } = req.query;
//         if (!userName) {
//             return res.status(400).json({ error: "User ID is required" });
//         }
//         const result = await users.aggregate([
//             {
//                 $match: { _id: userName }
//             },
//             {
//                 $unwind: "$likes"
//             },
//             {
//                 $lookup: {
//                     from: "posts",
//                     localField: "likes",
//                     foreignField: "_id",
//                     as: "postDetails"
//                 }
//             },
//             {
//                 $unwind: { path: "$postDetails", preserveNullAndEmptyArrays: true }
//             },
//             {
//                 $project: {
//                     _id: 0,
//                     postId: "$postDetails._id",
//                     description: "$postDetails.description",
//                     title: "$postDetails.title",
//                     userName: "$postDetails.user",
//                     codeType: "$postDetails.codeType",
//                     html: { $ifNull: ["$postDetails.html", ""] },
//                     css: { $ifNull: ["$postDetails.css", ""] },
//                     js: { $ifNull: ["$postDetails.js", ""] },
//                     react: { $ifNull: ["$postDetails.react", ""] },

//                 }
//             },
//         ])

//         // process the resulte
//         console.log(result);

//         // return res.status(200).json(result);

//     } catch (err) {
//         console.log(err);

//         return res.status(500).json({ error: "Internal server error" });
//     }
   
// }) //done

// // to get all disLiked of any user by userName
// app.get('/disliked', async (req, res) => {
//     try {
//         const { userName } = req.query;
//         if (!userName) {
//             return res.status(400).json({ error: "User ID is required" });
//         }
//         const result = await users.aggregate([
//             {
//                 $match: { _id: userName }
//             },
//             {
//                 $unwind: "$disLikes"
//             },
//             {
//                 $lookup: {
//                     from: "posts",
//                     localField: "disLikes",
//                     foreignField: "_id",
//                     as: "postDetails"
//                 }
//             },
//             {
//                 $unwind: { path: "$postDetails", preserveNullAndEmptyArrays: true }
//             },
//             {
//                 $project: {
//                     _id: 0,
//                     postId: "$postDetails._id",
//                     description: "$postDetails.description",
//                     title: "$postDetails.title",
//                     userName: "$postDetails.user",
//                     codeType: "$postDetails.codeType",
//                     html: { $ifNull: ["$postDetails.html", ""] },
//                     css: { $ifNull: ["$postDetails.css", ""] },
//                     js: { $ifNull: ["$postDetails.js", ""] },
//                     react: { $ifNull: ["$postDetails.react", ""] },
//                 }
//             },
//         ]);
//         res.status(200).json(result);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: "Internal server error" });
//     }
// }); // done

// // to get all Saved of any user by userName
// app.get('/saved' , async (req ,res) => {
//     try {
//         const { userName } = req.query;
//         if (!userName) {
//             return res.status(400).json({ error: "User ID is required" });
//         }
//         const result = await users.aggregate([
//             {
//                 $match: {_id: userName }
//             },
//             {
//                 $unwind: "$saved"
//             },
//             {
//                 $lookup: {
//                     from: "posts",
//                     localField: "saved",
//                     foreignField: "_id",
//                     as: "postDetails"
//                 }
//             },
//             {
//                 $unwind: { path: "$postDetails", preserveNullAndEmptyArrays: true }
//             },
//             {
//                 $project: {
//                     _id: 0,
//                     postId: "$postDetails._id",
//                     description: "$postDetails.description",
//                     title: "$postDetails.title",
//                     userName: "$postDetails.user",
//                     codeType: "$postDetails.codeType",
//                     html: { $ifNull: ["$postDetails.html", ""] },
//                     css: { $ifNull: ["$postDetails.css", ""] },
//                     js: { $ifNull: ["$postDetails.js", ""] },
//                     react: { $ifNull: ["$postDetails.react", ""] },

//                 }
//             },
//         ])

//         // process the resulte
//         console.log(result);

//         // return res.status(200).json(result);

//     } catch (err) {
//         console.log(err);

//         return res.status(500).json({ error: "Internal server error" });
//     }
   
// }) //done

// // to get Single Post by PostId
// app.get('/post' , async (req ,res) => {

//     try {
//         const { postId } = req.body;
//         const singlePost = await posts.aggregate([
//             { $match: { _id: postId } },
//             {$project: {
//                 _id: 0,
//                 postId: "$_id",
//                 description: "$description",
//                 title: "$title",
//                 userName: "$user",
//                 codeType: "$codeType",
//                 html: { $ifNull: ["$html", ""] },
//                 css: { $ifNull: ["$css", ""] },
//                 js: { $ifNull: ["$js", ""] },
//                 react: { $ifNull: ["$react", ""] },
//             }},
            
//         ])
//         return res.status(200).send(singlePost);
//     } catch (err) {
//         return res.status(500).send('Internal Server Error');
//     }



// })

// // deleting Posts using an array which have all Targeted PostId
// app.delete('/deletePost' , async (req ,res) => {
//     try {
//         const { postIdArr } = req.body
//          // Delete all documents from the posts collection by their IDs
//          await posts.deleteMany({ _id: { $in: postIdArr } });
//          return res.status(200).send('all posts deleted')
//     } catch (err) {
//         return res.status(500).send('Internal server error')
//     }
// }) // done

// //to get all post of an user by userName
// app.get('/myPost', async (req, res) => {
//     try {
//         const { userName } = req.body;
//         const allPost = await posts.aggregate([
//             { $match: { user: userName } },
//             { $project: {
//                 _id: 0,
//                 postId: "$_id",
//                 description: "$description",
//                 title: "$title",
//                 userName: "$user",
//                 likes:"$likes",
//                 codeType: "$codeType",
//                 html: { $ifNull: ["$html", ""] },
//                 css: { $ifNull: ["$css", ""] },
//                 js: { $ifNull: ["$js", ""] },
//                 react: { $ifNull: ["$react", ""] },
//             }},
//         ]);
//         return res.status(200).send(allPost);
//     } catch (err) {
//         return res.status(500).send('Internal server error');
//     }
// }); // done

// // post like updation using "apply" flage
// app.patch('/post/like' , async (req ,res) => {
    
//      // using this UserName fetch id from "User" collection & add that postId to it
//     // then find components from "Post" collection by postId and ++likeCnt
//     try {
//         const {userName ,apply , postId} = req.body;
//         if (apply) {
//             // apply === true assume not likied before
//             await users.updateOne(
//                 { _id: userName },
//                 { $push: { likes: postId } }
//             );
//             await posts.updateOne(
//                 { _id: postId },
//                 { $inc: { likes: 1 } }
//             );
//         } else {
//             // apply === false assume likied before
//             await users.updateOne(
//                 { _id: userName},
//                 { $pull: { likes: postId } }
//             );
//             await posts.updateOne(
//                 { _id: postId },
//                 { $inc: { likes: -1 } }
//             );
//         }
//         return res.status(200).send('Liked sucessfully')

//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({ error: "Internal server error" });
//     }
// })

// // post disLike updation using "apply" flage
// app.patch('/post/disLike' , async (req ,res) => {
    
//     // using this _id fetch id from "User" collection & add that postId to it
//     // then find components from "Post" collection by postId and ++disLikeCnt

//     try {
//         const {userName, apply , postId} = req.body;

//         if (apply) {
//             // apply === true assume not dislikied before
//             await db.users.updateOne(
//                 { _id: userName },
//                 { $push: { disLikes: postId } }
//             );
//             await db.posts.updateOne(
//                 { _id: postId },
//                 { $inc: { disLikes: 1 } }
//             );
//         } else {
//             // apply === false assume dislikied before
//             await db.users.updateOne(
//                 { _id: userName },
//                 { $pull: { disLikes: postId } }
//             );
//             await db.posts.updateOne(
//                 { _id: postId },
//                 { $inc: { disLikes: -1 } }
//             );
//         }
//         return res.status(200).send('Liked sucessfully')
        
//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({ error: "Internal server error" });
//     }
// })

// // post Saved updation using "apply" flage
// app.patch('/post/save' , async (req ,res) => {
    
//      // using this _id fetch id from "User" collection & add that postId to it
//      try {
//         const {userName ,apply, postId} = req.body;
//         if(apply){
//            await db.users.updateOne(
//                 {_id:userName},
//                 { $push: {saved: postId}},
//             )
//         } else{
//             await db.users.updateOne(
//                 {_id:userName},
//                 {$pull: {saved: postId} },
//             )
//         }
//         return res.status(200).send('save Updated sucessfully')

//      } catch (err) {
//         console.log(err)
//         return res.status(500).send('Internal server error');
//      }
// })

// // deleting all likes from users collection and decrementing Count from posts collection 
// app.delete('/allLikes', async (req, res) => {
    // try {
    //     const { userName, likeArr } = req.body;

    //     if (!likeArr || likeArr.length === 0) {
    //         return res.status(400).send('likeArr is required');
    //     }

    //     // Remove all post IDs from the likes array in the users collection
    //     if (likeArr.length > 1) {
    //         await users.updateOne(
    //             { _id: userName },
    //             { $set: { likes: [] } }
    //         );
    //     } else if (likeArr.length === 1) { //remove id from users collection
    //         await users.updateOne(
    //             { _id: userName },
    //             { $pull: { likes: likeArr[0] } }
    //         );
    //     }
    //     // Decrement the likes count in the posts collection for each post ID
    //     await posts.updateMany(
    //         { _id: { $in: likeArr } },
    //         { $inc: { likes: -1 } }
    //     );

    //     res.status(200).send('Likes removed and counts updated');
    // } catch (err) {
    //     res.status(500).send('Internal server error');
    // }
// }); //done                                                                                                                                                                                     

// // deleting all disLikes from users collection and decrementing Count from posts collection
// app.delete('/allDisLikes' , async (req ,res) => {
    // try {
    //     const { userName, disLikeArr } = req.body;
    //     if (!disLikeArr || disLikeArr.length === 0) {
    //         return res.status(400).send('disLikeArr is required');
    //     }

    //     // Remove all post IDs from the disLikes array in the users collection
    //     if (disLikeArr.length > 1) {
    //         await users.updateOne(
    //             { _id: userName },
    //             { $set: { disLikes: [] } }
    //         );
    //     } else if (disLikeArr.length === 1) {
    //         await users.updateOne(
    //             { _id: userName },
    //             { $pull: { disLikes: disLikeArr[0] } }
    //         );
    //     }
    //     // Decrement the disLikes count in the posts collection for each post ID
    //     await posts.updateMany(
    //         { _id: { $in: disLikeArr } },
    //         { $inc: { disLikes: -1 } }
    //     );
    //     res.status(200).send('disLikes removed and counts updated');
    // } catch (err) {
    //     res.status(500).send('Internal server error');
    // }
    
// }) // done

// // deleting all saved from users collection
// app.delete('/allSaved' , async (req ,res) => {
//    try {
//     const { userName ,savedArr} = req.body;

//     if(!savedArr || savedArr.length === 0){
//         return res.status(400).send('Saved array is required')
//     }
//     if(savedArr.length > 1){
//         await users.updateOne(
//             // Remove all post IDs from the disLikes array in the users collection
//             { _id: userName },
//             { $set: { saved: [] } }
//         );
//     } else if(savedArr.length === 1){
//         await users.updateOne(
//             {_id:userName},
//             {$pull:{saved:savedArr[0]}}
//         )
//     }
//     res.status(200).send('Saved removed');
//    } catch (err) {
//        res.status(500).send('Internal server error');
//    }
// }) //done

// // this will return only personal details of any user. Not post 
// // to get post by userName goto : '/myPost'
// app.get('/profile' , async (req ,res) =>{
    
//     // find user details by id from "users" then 
//     try {
//         const { userName } = req.body;
//         if(!userName){
//             return res.status(400).send('Id not found')
//         }
//         const User = await users.findById(userName);
//         if (!User) {
//             return res.status(404).send('User not found');
//         }
//         return res.status(200).send(User)
//     } catch (err) {
//         console.log(err)
//         return res.status(500).send('Internal server error')
//     }

// })//done

// // update profile using userName and reqired Fields
// app.patch('/profile', async (req, res) => {
//     try {
//         const { userName, ...updateFields } = req.body;

//         if (!userName) {
//             return res.status(400).send('userName is required');
//         }

//         if (Object.keys(updateFields).length === 0) {
//             return res.status(400).send('No fields to update');
//         }

//         const result = await users.updateOne(
//             { _id: userName },
//             { $set: updateFields }
//         );

//         if (result.modifiedCount === 0) {
//             return res.status(404).send('User not found or no changes made');
//         }

//         res.status(200).send('Profile updated successfully');
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Internal server error');
//     }
// }); // done and changed in the controler

// // singnUp or Register
// app.post('/signup' , async(req ,res) => {

//     // find userName and email from database if it exist then send res -> user already exist.
//     // If not found then create the new instance and store the information.
//     // apply middleware also

//     try {
//         const {userName, fullName, selfDescription ,password ,collageName ,email} = req.body;
//         if(!userName || !password || !email || !fullName){
//            return res.status(400).send('Username ,email and password all are required')
//         }

//         // aplly middleware before saving
//         // bcrypt , authentication , token generation, etc.

//         const newUser = new users({
//             _id:userName,
//             fullName,
//             collageName,
//             password,
//             email,
//             selfDescription,
//         })
//         await newUser.save()
//         console.log(`${newUser}`)
//         return res.status(200).send('user added')
//     }  catch (err) {
//         console.error(err);
        
//         if (err.code === 11000) { // Correct way to check duplicate key error
//             return res.status(409).json({ error: "User already exists" });
//         }

//         return res.status(500).json({ error: "Internal server error" });
//     }

// }) //done

// //adding new post
// app.post('/addpost' , async(req ,res) => {
//     try {
//         const {userName ,codeType ,title ,description ,html ,css ,js ,react} = req.body;
//         if(!codeType || !title || !userName){
//            return res.status(400).send('userName ,codeType and title are required or login if not loggedIn')
//         }
//         if(!html && !react){
//            return res.status(400).send('code is required')
//         }
//         // create the post
    
//         if(codeType === 1){ // react
//             const newPost = new posts({
//                 title,
//                 description,
//                 codeType: 1,
//                 react,
//                 likes: 0,
//                 disLikes: 0,
//                 user: userName,
//             })
//             await newPost.save();
//             return res.status(200).send(newPost)
//         }
//         else if(codeType === 2){ // non-react
//             const newPost = new posts({
//                 title,
//                 description,
//                 codeType: 2,
//                 html,
//                 css,
//                 js,
//                 likes: 0,
//                 disLikes: 0,
//                 user: userName,                
//             })
//             await newPost.save();
//             return res.status(200).send(newPost)
//         }
//         else if(codeType === 3){ // non-react with tailwind
//             const newPost = new posts({
//                 title,
//                 description,
//                 codeType: 3,
//                 html,
//                 js,
//                 likes: 0,
//                 disLikes: 0,
//                 user: userName,
                
//             }) 
//             await newPost.save();
//             return res.status(200).send(newPost)  
//         }


        
//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({ error: "Internal server error" });
//     }
// })//done

// app.post('/login' , async(req ,res) => {
//     const {userName ,password} = req.body;
//     if(!userName || !password){
//         res.status(400).send('Username and password are required')
//     }
//     // find user from database then validate it after that send res for succesfull
//     // if not found then through error in res


// }) //done

// // app.delete('/delete' , async (req ,res) => {
// //     const userName = req.body;
// //     // find and delete the user from "User" 
// //     // also find its all posts from "Post" and delete all the post
// // })

