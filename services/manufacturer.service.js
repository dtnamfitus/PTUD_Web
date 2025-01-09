const Manufacturer = require("../models/manufacturer.model");

// get all
const getAllManufacturers = async () => {
  try {
    const manufacturers = await Manufacturer.find();
    return manufacturers;
  } catch (err) {
    throw new Error("Error fetching manufacturers: " + err.message);
  }
};

const addManufacturer = async (manufacturer) => {
  try {
    const newManufacturer = await Manufacturer.create(manufacturer);
    if (!newManufacturer) {
      throw new Error("Error adding manufacturer");
    }
    return newManufacturer;
  }
  catch (error) {
    throw new Error("Error adding manufacturer: " + error.message);
  }
}

const updateManufacturer = async (manufacturerId, manufacturer) => {
  try {
    const updatedManufacturer = await Manufacturer.findByIdAndUpdate(manufacturerId, manufacturer, { new: true });
    if (!updatedManufacturer) {
      throw new Error("Error updating manufacturer");
    }
    return updatedManufacturer;
  } catch (error) {
    throw new Error("Error updating manufacturer: " + error.message);
  }
}

const deleteManufacturer = async (manufacturerId) => {
  try {
    const deletedManufacturer = await Manufacturer.findByIdAndDelete(manufacturerId);
    if (!deletedManufacturer) {
      throw new Error("Error deleting manufacturer");
    }
    return deletedManufacturer;
  }
  catch (error) {
    throw new Error("Error deleting manufacturer: " + error.message);
  }
}
  

module.exports = {
  getAllManufacturers,
  addManufacturer,
  updateManufacturer,
  deleteManufacturer,
};
