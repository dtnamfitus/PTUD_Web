const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const createUser = async (userData) => {
  try {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    let existingUser = await User.findOne({ email: userData.email });

    if (existingUser) {
      existingUser.password = hashedPassword;
      await existingUser.save();
      return existingUser;
    } else {
      const newUser = new User({
        ...userData,
        password: hashedPassword,
        isVerified: false,
        isAdmin: false,
      });
      await newUser.save();
      return newUser;
    }
  } catch (err) {
    throw new Error("Error creating user: " + err.message);
  }
};

const getUser = async (query) => {
  try {
    const user = await User.findOne(query).select("+otp +otpExpiresAt");
    return user;
  } catch (err) {
    throw new Error("Error fetching user: " + err.message);
  }
};

const getUserFullInformation = async (query) => {
  try {
    const user = await User.findOne(query).select("+otp +otpExpiresAt");
    return user;
  } catch (err) {
    throw new Error("Error fetching user: " + err.message);
  }
};

const updateUser = async (id, userData) => {
  try {
    if (userData.password) {
      delete userData.password;
    }
    const user = await User.findByIdAndUpdate(id, userData, { new: true });
    return user;
  } catch (err) {
    throw new Error("Error updating user: " + err.message);
  }
};

const updateUserByEmail = async (email, userData) => {
  try {
    if (userData.password) {
      delete userData.password;
    }
    const user = await User.findOneAndUpdate({ email }, userData, {
      new: true,
    });
    return user;
  } catch (err) {
    throw new Error("Error updating user: " + err.message);
  }
};

const loginUser = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }
    return user;
  } catch (err) {
    throw new Error("Error logging in: " + err.message);
  }
};

const getUserById = async (id) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (err) {
    throw new Error("Error fetching user: " + err.message);
  }
};

const changePassword = async (id, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.findByIdAndUpdate(id, { password: hashedPassword });
    return user;
  } catch (err) {
    throw new Error("Error changing password: " + err.message);
  }
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  loginUser,
  getUserById,
  updateUserByEmail,
  getUserFullInformation,
  changePassword,
};
