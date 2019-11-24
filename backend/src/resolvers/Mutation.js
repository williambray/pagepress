const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Mutations = {
  async signin(parent, { email, password }, ctx, info) {
    // Check a user exists with the email
    const user = await ctx.db.query.user({ where: email });
    if (!user) throw new Error(`Sorry, no such user found for email: ${email}`);
    // Check if password is correct
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error(`Invalid Password!`);

    // if user exists and password is valid, generate JWT
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // set cookie with token
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 // 1 day
    });
    // return the user
    return user;
  },
  signout(parent, args, ctx, info) {
    ctx.response.clearCookie("token");
    return { message: "Signed Out!" };
  },
  // todo: requestReset & resetPassword
  async createUser(parent, args, ctx, info) {
    const loggedIn = await ctx.db.exists.user({ id: ctx.request.user.id });
    if (!loggedIn) throw new Error("You must be logged in");
    isAdmin(ctx.request.user);
    // Start creating new user
    args.email = args.email.toLowerCase();
    const password = await bcrypt.hash(args.password, 10);
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
          role: { set: "USER" }
        }
      },
      info
    );
    // Notify user about their new account
    // todo: set up mailing server.
    return user;
  },
  async updateUser(parent, args, ctx, info) {
    const loggedIn = await ctx.db.exists.user({ id: ctx.request.user.id });
    if (!loggedIn) throw new Error("You must be logged in");
    isAdmin(ctx.request.user);
    // copy updates
    let updates = { ...args };
    delete updates.id;
    if (updates.password !== "")
      updates.password = await bcrypt.hash(updates.password, 10);
    else delete updates.password;
    // run update
    return ctx.db.mutation.updateUser(
      {
        data: {
          ...updates
        },
        where: {
          id: args.id
        }
      },
      info
    );
  },
  async deleteUser(parent, args, ctx, info) {
    const loggedIn = await ctx.db.exists.user({ id: ctx.request.user.id });
    if (!loggedIn) throw new Error("You need to be logged in");
    isAdmin(ctx.request.user);
    const where = { id: args.id };
    return ctx.db.mutation({ where }, info);
  }
};

module.exports = Mutations;
