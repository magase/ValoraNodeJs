const bcrypt = require("bcrypt");
const helpers = {};

helpers.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  return hash;
};

helpers.matchPassword = async (password, savePassword) => {
  try {
    await bcrypt.compare(password, savePassword);
  } catch (err) {
    console.log(err);
  }
};

module.exports = helpers;