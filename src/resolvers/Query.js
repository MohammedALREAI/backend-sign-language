const { forwardTo } = require("prisma-binding");

const Query = {
  items: forwardTo("db"),

  item: forwardTo("db"),
  catogories: forwardTo("db"),
  itemsConnection: forwardTo("db"),
  catogoriesConnection: forwardTo("db"),
  usersConnection: forwardTo("db"),

  catogory: forwardTo("db"),
  me(parent, args, ctx, info) {
    // check if there is a current user ID
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
    // 1. Check if they are logged in
    if (!ctx.request.userId) {
      throw new Error("You must be logged in!👌👌");
    }
    console.log(ctx.request.userId);
    // 2. Check if the user has the permissions to query all the users
    const hasPermissionToSeeOrder = ctx.request.user.permission === true;
    const isAdmin = ctx.db.query.user(
      { where: { AND: [{ id: userId }, { permission: true }] } },
      `{permission}`
    );
    // 2. if they do, query all the users!
    if (!isAdmin || !hasPermissionToSeeOrder) {
      throw new Error("You must be access to go the User in 🤷‍♂️🤷‍♂️");
    }
    return ctx.db.query.user({}, info);
  }
  ,
     async search(parent,args,ctx,info){
          const {title}=args.title;
          const results = await Promise.all([
               ctx.db.query.item({where:{title}},info),
               ctx.db.query.catogory({where:{title}},info),

          ]);
return [...results];


     }
};
module.export = Query;
