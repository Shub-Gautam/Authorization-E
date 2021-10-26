const bcrypt = require("bcrypt");

module.exports = {
  isValidPassword: async (password, hashpassword) => {
    try {
      return await bcrypt.compare(password, hashpassword); // return boolean
    } catch (err) {
      throw err;
    }
  },
};
