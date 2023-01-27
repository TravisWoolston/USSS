const KoaRouter = require("koa-router");
const cors = require("cors");

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
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  ctx.set("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  await db.all("SELECT * FROM members", function (err, members) {
    members.forEach(function (member) {
      contactList.push(member);
    });
  });
  ctx.body = contactList;
});
indexRouter.get("/member", async function (ctx, next) {
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  ctx.set("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
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
});
indexRouter.get("/addresses", async function (ctx, next) {
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  ctx.set("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  await db.all(`SELECT * FROM addresses`, function (err, addresses) {
    addresses.forEach(function (address) {
      addressList.push(address);
    });
  });
  ctx.body = addressList;
});

indexRouter.options("error", (err, ctx) => {
  console.log(err, ctx);
});
module.exports = indexRouter;
