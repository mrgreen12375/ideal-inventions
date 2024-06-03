const db = require('./connection');
const { User, Invention } = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  await cleanDB('Invention', 'inventions');
  await cleanDB('User', 'users');

  const invetions = await Invention.insertMany([
    {
      name: "Time Machine",
      description: "This is an all in one time machine. Set the date past or future and hit the red button. The time machine with send you to this date in less than 5 seconds.",
      image: "https://cdn.pixabay.com/photo/2023/12/13/09/48/ai-generated-8446635_1280.jpg",
      price: 99.99,
      inventory: 200
    },
    {
      name: "Lightsaber",
      description: "An energy blade composed of a diatium power cell and crystals that focus the energy into a beam.",
      image: "https://cdn.pixabay.com/photo/2020/04/23/19/05/star-wars-5083664_1280.jpg",
      price: 49.99,
      inventory: 100
    }
  ]);

  console.log('inventions seeded');

  await User.create({
    firstName: 'Steven',
    lastName: 'Green',
    email: 'steven@email.com',
    password: 'password',
    history: [
      {
        inventions: [invetions[0]._id, invetions[1]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Shawn',
    lastName: 'Green',
    email: 'shawn@email.com',
    password: 'password'
  });

  console.log('users seeded');

  process.exit();
});
