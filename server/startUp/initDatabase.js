const Category = require('../models/Category');
const Food = require('../models/Food');

const categoriesMock = require('../mock/categories.json');
const foodsMock = require('../mock/foods.json');

module.exports = async () => {
  const categories = await Category.find();
  if (categories.length !== categoriesMock.length) {
    await createInitialEntity(Category, categoriesMock);
  }

  const foods = await Food.find();
  if (foods.length !== foodsMock.length) {
    await createInitialEntity(Food, foodsMock);
  }
};

async function createInitialEntity(Model, data) {
  await Model.collection.drop();
  return Promise.all(
    data.map(async (item) => {
      try {
        delete item._id;
        const newItem = new Model(item);
        await newItem.save();
        return newItem;
      } catch (error) {
        return error;
      }
    })
  );
}
