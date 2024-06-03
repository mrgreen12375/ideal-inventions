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
    },
    {
      name: "Hover Board",
      description: "This is a levitating board used for personal transportation.",
      image: "https://cdn.thisiswhyimbroke.com/thumb/back-to-the-future-hoverboard-replica_400x333.jpg",
      price: 29.99,
      inventory: 300
    },
    {
      name: "Laser Gun",
      description: "This laser gun emits highly Focused beams of light that deal fire damage. These beams can pass through glass and other transparent physical barriers, dealing damage to such barriers as they pass through.",
      image: "https://m.media-amazon.com/images/I/61nj3EBtcxL._AC_UF350,350_QL50_.jpg",
      price: 89.99,
      inventory: 100
    },
    {
      name: "Spaceship",
      description: "This spaceship is a vehicle that is designed to fly in outer space and operate there. Spacecraft are used for a variety of purposes, including communications, Earth observation, meteorology, navigation, space colonization, planetary exploration, and transportation of humans and cargo.",
      image: "https://img.freepik.com/free-photo/view-spaceship-from-future_23-2150675455.jpg",
      price: 999.99,
      inventory: 5
    },
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
