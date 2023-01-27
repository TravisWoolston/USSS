const KoaRouter = require("koa-router");

const indexRouter = new KoaRouter();
const sqlite3 = require("sqlite3");
const path = require("path");
const dbFile = path.resolve(__dirname, "../data/sqlitedb");
const db = new sqlite3.Database(dbFile, (err) => {
  if (err) {
    return console.error(err);
  }
});

let contactList = [];
let addressList = [];

indexRouter.get("/members", async function (ctx, next) {
  await db.all("SELECT * FROM members", function (err, members) {
    members.forEach(function (member) {
      contactList.push(member);
    });
  });
  ctx.body = contactList;
  await next()
});
indexRouter.get("/member", async function (ctx, next) {
  const queryStr = `SELECT * FROM members WHERE firstName LIKE '${ctx.request.query.query}%'`;
  await db.all(queryStr, async function (err, members) {
    if (err) {
      console.log("error", err);
    }
    contactList = [];
    members?.forEach(function (member) {
      contactList.push(member);
    });
  });
  ctx.body = contactList;
  await next()
});
indexRouter.get("/addresses", async function (ctx, next) {
  await db.all(`SELECT * FROM addresses`, function (err, addresses) {
    addresses.forEach(function (address) {
      addressList.push(address);
    });
  });
  ctx.body = addressList;
  await next()
});

indexRouter.options("error", (err, ctx) => {
  console.log(err, ctx);
});
module.exports = indexRouter;
