const User = require('../mongoose/User');
const Organization = require('../mongoose/Organization');

/**
 * Get an organization's profile information
 * Additionally, query for all users that belong to the org and return them
 * @param {string} username - username we are retrieving
 */
const getOrganization = async (_, {username}) => {
  try{
    const organization = await Organization.findOne({username})
    organization.members = await User.find({organizations: organization._id})

    return [organization];
  } catch(e){
    console.log(e)
    return {error: e}
  }
}

module.exports = { getOrganization }
