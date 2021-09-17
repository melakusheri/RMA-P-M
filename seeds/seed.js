const sequelize = require('../config/connection');
const { County, Park, Museum, User} = require('../models');
const countyData = require('./county-seeds.json');
const parkData = require('./park-seeds.json');
const museumData = require('./museum-seeds.json');
const userData = require('./user-seeds.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  
  for (const county of countyData) {
    await County.create({
      ...county
    });
  }

  for (const park of parkData) {
    await Park.create({
      ...park
    });
  }

  for (const museum of museumData) {
    await Museum.create({
      ...museum
    });
  }

  process.exit(0);
};

seedDatabase();
