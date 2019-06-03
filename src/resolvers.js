const User  = require('./models/User');
const Need  = require('./models/Need');
const Category  = require('./models/Category');

module.exports = {
  Query: {
    /*
      Get a user by username
    */
    user: async (_, {username}) => {
      try{
        return await User.find({username})
      } catch(e){
        return {error: e}
      }
    },

    /*
      Search for needs
      todo: make it work both ways
    */
    search: async(_, {query}) =>{
      try{
        // todo: check unions instead of nested populate
        // todo: also check for related instead of _just_ title

        return await User.aggregate(
          {}
        )
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
      } catch(e){
        return {error: e}
      }
    }
  }


  /*
    Mutation Resolvers
  */
  // Mutation: {
  //
  //
  // },
}
