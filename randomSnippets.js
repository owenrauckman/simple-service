//{ needs: {$elemMatch: {title: query}}
// return await User.find().populate({
//   path: 'needs',
//   model: Need,
//   match: {
//     title: query,
//   },
//   populate: {
//     path: 'categories',
//     model: Category,
//     populate: {
//       path: 'related',
//       model: Category,
//     }
//   }
// })
