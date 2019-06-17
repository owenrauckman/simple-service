const zipcodes = require('zipcodes');

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

    /**
     * Search for Needs or Abilities and optionally by category, city, state, and zip
     * First fetch from the Needs/Abilities collections, then return users that match criteria
     * If remote is passed as true, we ignore the location options in the user query
     * @param {string} query - user defined query
     * @param {string} type - an enum of [NEED, ABILITY] defining the offering type
     * @param {string} category - user can optionally search by category too
     * @param {string} state - state user optionally searches by
     * @param {string} city - city user optionally searches by
     * @param {int} zip - zip user optionally searches by
     * @param {int} searchRadius - radius, in miles, a user is searching in
     * @param {boolean} remote - lets us know if user is search for a remote worker
     */
    search: async(_, {query, type, category, state = null, city = null, zip = null, searchRadius = null, remote = false}) => {
      let modelName = (type === 'NEED' ? Need : Ability);
      let pathName = (type === 'NEED' ? 'needs' : 'abilities');

      try{
        const offerings = await modelName.aggregate([
          {
            $match: {
              $and: [
                { $text: { $search: `${query} ${category}` } }, // space delimites query vs cat
                { searchable: true },
                { startDate: { $lte : new Date() } },
                { endDate: { $gte : new Date() } },
                { ... remote && { remote: remote } },
              ]
            },
          },
          { $project: { score: { $meta: "textScore" } } },
          { $match: { score: { $gt: 0.5 } } } // todo, adjust score
        ]);

        return await User.find({
          $and: [
            { [pathName]: { $in: offerings.map((offering)=> offering._id) } },
            (zip && !remote) ? { ... zip && { 'location.zip': { $in: zipcodes.radius(zip, searchRadius).map((code)=> parseInt(code, 10)) } } } : null,
            ( (state || city) && !remote ) ? {
              $and: [
                { ... state && { 'location.state': state } },
                { ... city && { 'location.city': city } },
              ]
            } : null,
          ].filter(Boolean) // filter falsy items (if zip is null)
        }).populate({
          path: pathName,
          model: modelName,
        });

      } catch(e){
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
