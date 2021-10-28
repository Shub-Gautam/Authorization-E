const bcrypt = require("bcrypt");

module.exports = {
  isValidPassword: async (password, hashpassword) => {
    try {
      const type = await bcrypt.compare(password, hashpassword); // return boolean
      return type;
    } catch (err) {
      throw err;
    }
  },
  generateHashedPassword: async (password) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      return hashedPassword;
    } catch (err) {
      throw err;
    }
  },
};
