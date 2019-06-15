const User  = require('./models/User');
const Need  = require('./models/Need');
const Ability  = require('./models/Ability');

module.exports = {
  Query: {
    /*
      Get a user by username
    */
    user: async (_, {username}) => {
      try{
        return await User.find({username})
          .populate({ path: 'needs', model: Need})
          .populate({ path: 'abilities', model: Ability})
      } catch(e){
        console.log(e)
        return {error: e}
      }
    },

    /*
      Routes
      - search (helper, helpee) --only base profile info returned
      -
    */

    /*
      Search for needs
      todo: make it work both ways
    */
    search: async(_, {query, type}) =>{

      let modelName = (type === 'NEED' ? Need : Ability);
      let pathName = (type === 'NEED' ? 'needs' : 'abilities');

      try{
        const offerings = await modelName.aggregate([
          { $match: { $text: {$search: query } } },
          { $project: { score: { $meta: "textScore" } } },
          { $match: { score: { $gt: 0.5 } } } // todo, adjust score
        ]);

        const users = await User.find({
          [pathName]: { $in: offerings.map((offering)=> offering._id) },
        }).populate({
          path: pathName,
          model: modelName,
        });

        return users;

        }catch(e){
          console.log(e);
          return []
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
