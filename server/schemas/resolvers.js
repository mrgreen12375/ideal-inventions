const { User, Invention, History } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const stripe = require('stripe')('sk_test_51RA1sCROcOxKW9HednVmPoIAx41eUPVLC4pkwmOemJFCYWSX2fugygtI29GmLPKroKgBqeoXiPRvp6yOswzcL0n900SX744baf');

const resolvers = {
  Query: {
    inventions: async () => {
      const inventions = await Invention.find();
      return inventions;
    },
    invention: async (parent, { _id }) => {
      const invention = await Invention.findById(_id);
      return invention;
    },

    users: async () => {
        const users = await User.find()
        return users;
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate('history');

        user.history.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw AuthenticationError;
    },
    history: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate('invention');

        return user.history.id(_id);
      }

      throw AuthenticationError;
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      // We map through the list of products sent by the client to extract the _id of each item and create a new Order.
      await History.create({ inventions: args.inventions.map(({ _id }) => _id) });
      const line_items = [];

      for (const invention of args.inventions) {
        line_items.push({
          price_data: {
            currency: 'usd',
            product_data: {
              name: invention.name,
              description: invention.description,
              images: [`${url}/images/${invention.image}`],
            },
            unit_amount: invention.price * 100,
          },
          quantity: invention.purchaseQuantity,
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });

      return { session: session.id };
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    addInvention: async (parent, args) => {
      const invention = await Invention.create(args);
      return { invention };
    },
    addHistory: async (parent, { inventions }, context) => {
      if (context.user) {
        const order = new History({ inventions });

        await User.findByIdAndUpdate(context.user._id, {
          $push: { history: order },
        });

        return order;
      }

      throw AuthenticationError;
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw AuthenticationError;
    },
    updateInvention: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await Invention.findByIdAndUpdate(
        _id,
        { $inc: { quantity: decrement } },
        { new: true }
      );
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;