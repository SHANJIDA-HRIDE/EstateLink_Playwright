function getRandomNumber(max = 99999) {
  return Math.floor(Math.random() * max);
}

module.exports = {
  validUser: {
    email: 'shanjidahride8@gmail.com',
    password: 'jklmctM1&@&',
  },

  invalidUser: {
    email: 'shanjidahride@gmail.com',
    password: 'wrongPassword123',
  },

  roleData: {
    roleName: `AutoRole_${Date.now()}_${getRandomNumber()}`,
    roleDescription: 'This is an automated test role.',
  },

  groupData: {
    groupName: `TGp_${Date.now()}_${getRandomNumber()}`,
    groupDescription: 'This is an automated test group.',
  },

  getRandomNumber,
};
