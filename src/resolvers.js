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
      Routes
      - search (helper, helpee) --only base profile info returned
      -
    */

    /*
      Search for needs
      todo: make it work both ways
    */
    search: async(_, {query, type}) =>{
      console.log(type)
      try{
        // todo: check unions instead of nested populate
        // todo: also check for related instead of _just_ title
        // todo: remove related, and weight searches with exact match instead

        // const needs = await Need.find({title: query});
        // const textSearch = { $text: { $search: query } }, { $score: { $meta: "textScore"} }
        // const needs = await Need.find(
        //   { $text: { $search: query } }, { $score: { $meta: "textScore"} }
        // ).sort({ $score: { $meta: "textScore"} })
        //
        // console.log(needs)
        // return []

        try{
          const hi = await User.aggregate([
            { $match: { $text: { $search: query } } },
            { $match: { 'catalog': { $elemMatch: { type: type } } } },
            // { $match: { $text: { $search: query }, 'catalog.type': type }}
            // { $match: { $text: { $search: query } }},
            // { "$unwind": "$catalog" },
            // { $match: { "catalog.type": type }},
            // { $match: {"catalog":{"$elemMatch":{"type":type}}} }
            { "$project": {
              _id: 1, name: 1, username: 1,
              // score: { $meta: "textScore" } ,
              catalog: {$filter:
                {input: ["$catalog"], as:"cat", cond: { $eq : ["$$cat.type", "NEED"], } }
              }}

            },
            //   // "peopleId": "$people.peopleId",
            //   // "status": "$people.status"
            // }},
            // { $match: { score: { $lt: 1.0 } } }
            // { $match: { score: { $gt: -1 } } },

            // {
            //   $match: {
            //     $and: [
            //       {$text: { $search: query }},
            //       {'catalog.type': type},
            //     ]
            //   }
            // },

            // {
            //   $project: {
            //     _id: 1, name: 1, username: 1, catalog: 1,
            //   }
            // }
          //


            // {$project:
            //   {
            //     _id: 1, name: 1, username: 1,
            //     catalog:
            //     {$filter:
            //       {input: "$catalog", as:"cat", cond: { $eq : ["$$cat.type", "NEED"], } }
            //     }
            //   }
            // }


          //
          //   // {$project: {
          //   //    _id: 1, name: 1, username: 1,
          //   //   'catalog': {$filter: {
          //   //       input: '$catalog',
          //   //       as: 'catalog',
          //   //       cond: {$eq: ['$$catalog.type', type]}
          //   //   }},
          //   // }}
          //
          //
          //
          //   // {$project: {
          //   //    _id: 1, name: 1, username: 1,
          //   //   'catalog': {$filter: {
          //   //       input: '$catalog',
          //   //       as: 'catalog',
          //   //       cond: {$eq: ['$$catalog.type', type]}
          //   //   }},
          //   // }}
          //
          //   // { $sort: { score: { $meta: "textScore" } } },
          //   // { $match: { 'catalog.type': type }}
          //
          ])

          // console.log(JSON.stringify(hi))

          // const hi2 = hi.filter((user)=>{
          //   return user.catalog.map((entry)=> {
          //     if( entry.type === type ){
          //       console.log('OMGOM');
          //     }
          //   })
          // })

          // console.log(hi2)
          // return hi2
          console.log(JSON.stringify(hi, null, 2))
          return hi

          // .sort({ $score: { $meta: "textScore"} })
          // return hi;
        }


        // try{
        //   const hi = await User.find({
        //     'catalog.type': type,
        //     // score: { $gt: x },   // depending on your exact scenario, you'd need to use $gte
        //     $text: { // here comes the text search
        //         $search: query
        //     },
        //   }, {
        //     _id: 1, name: 1, username: 1, catalog:
        //             {$filter:
        //               {input: "$catalog", as:"cat", cond: { $eq : ["$$cat.type", "NEED"], } }
        //             }
        //
        //   })
        //
        //   // $project: {
        //   //    _id: 1, name: 1, username: 1,
        //   //   'catalog': {$filter: {
        //   //       input: '$catalog',
        //   //       as: 'catalog',
        //   //       cond: {$eq: ['$$catalog.type', type]}
        //   //   }},
        //   // }
        // return hi;
        // }


        catch(e){
          console.log(e);
          return []
        }




        // return await User.find().populate({
        //   path: 'needs',
        //   model: Need,
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
