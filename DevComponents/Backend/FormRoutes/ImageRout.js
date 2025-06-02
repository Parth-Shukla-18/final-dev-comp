// import express from 'express';
// import upload from '../middlewares/ImageMiddleware.js';
// import { users } from '../DataBase/Schema.js';

// const router = express.Router();

// router.post(
//   '/upload-profile',
//   upload.fields([
//     { name: 'profileImg', maxCount: 1 },
//     { name: 'bgImg', maxCount: 1 },
//   ])
//   ,async (req, res) => {
//     try {
//       const userName = req.id; 
//       console.log(req.files); 
//       const profileImg = req.files?.profileImg?.[0]?.path || '';
//       const bgImg = req.files?.bgImg?.[0]?.path || '';


//       // Update in DB (you can also get user ID from auth middleware)
//       if( profileImg ){
//         await users.findByIdAndUpdate(userName, {
//           profileImg,
//         }); 
//       }
//       else if( bgImg ){
//         await users.findByIdAndUpdate(userName, {
//           bgImg,
//         });
//       }

//       res.status(200).json({ message: 'Images uploaded successfully', profileImg, bgImg });
//     } catch (err) {
//       res.status(500).json({ error: 'Upload failed', details: err });
//     }
//   }
// );

// export default router;
