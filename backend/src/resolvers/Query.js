const { forwardTo } = require("prisma-binding");

const Query = {
  user: forwardTo("db"),
  me(parent, args, ctx, info) {
    // Check if there is a current userId
    if (!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId }
      },
      info
    );
  },
  async users(parent, args, ctx, info) {
    // Check if they are logged in
    const loggedIn = await ctx.db.exists.User({ id: ctx.request.user.id });
    if (!loggedIn) throw new Error("You must be logged in");
    return await ctx.db.query.users({}, info);
  }
};

module.exports = Query;
