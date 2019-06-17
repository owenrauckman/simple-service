const User  = require('./models/User');
const Need  = require('./models/Need');
const Ability  = require('./models/Ability');

module.exports = {
  Query: {
    /**
     * Get a user's profile information and populate refs
     * @param {string} username - username we are retrieving
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

    /**
     * Search for Needs or Abilities and optionally by category, city, state, and zip
     * First fetch from the Needs/Abilities collections, then return users that match criteria
     * @param {string} query - user defined query
     * @param {string} type - an enum of [NEED, ABILITY] defining the offering type
     * @param {string} category - user can optionally search by category too
     * @param {string} state - state user optionally searches by
     * @param {string} city - city user optionally searches by
     * @param {string} zip - zip user optionally searches by
     */
    search: async(_, {query, type, category, state = null, city = null, zip = null}) =>{
      let modelName = (type === 'NEED' ? Need : Ability);
      let pathName = (type === 'NEED' ? 'needs' : 'abilities');

      try{
        const offerings = await modelName.aggregate([
          { $match: { $text: {$search: `${query} ${category}` } } }, // space delimites query vs cat
          { $project: { score: { $meta: "textScore" } } },
          { $match: { score: { $gt: 0.5 } } } // todo, adjust score
        ]);

        return await User.find({
          [pathName]: { $in: offerings.map((offering)=> offering._id) },
          $or: [
            zip ? { ... zip && { 'location.zip': zip } } : null,
            {
              $or: [
                { ... state && { 'location.state': state }},
                { ... city && { 'location.city': city } }

              ]
            }
          ].filter(Boolean) // filter falsy items (if zip is null)
        }).populate({
          path: pathName,
          model: modelName,
        });

        }catch(e){
          console.error(e);
          return [];
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
