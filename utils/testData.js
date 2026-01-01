function getRandomNumber() {
  return Math.floor(Math.random()*3); // random 0-99999
}

module.exports = {
  validUser: {
    email: 'hride.devtech@gmail.com',
    password: '12345',
  },

    invalidUser: {
    email: 'shanjidahride@gmail.com',
  },

  invalidPassword: {
    email: 'shanjidahride8@gmail.com',
    password: 'wrongPassword123',
  },

  roleData: {
    roleName: `AutoRole_${Date.now()}_${getRandomNumber()}`,
    roleDescription: 'This is an automated test role.',
  },

    groupData: {
    groupName: `TGp_${Date.now()}_${getRandomNumber()}`,
    groupDescription: 'This is an automated test Group.',
  },


};
