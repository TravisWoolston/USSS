const KoaRouter = require("koa-router");
const sqlite3 = require("sqlite3");
const path = require("path");
const dbFile = path.resolve(__dirname, "../data/sqlitedb");
const db = new sqlite3.Database(dbFile, (err) => {
  if (err) {
    return console.error(err);
  }
});
const indexRouter = new KoaRouter();

const contactList = [];
db.all("SELECT * FROM members", function (err, members) {
  members.forEach(function (member) {
    console.log(member);
	contactList.push(member)
    // const address = db.get(
    //   `SELECT * FROM addresses WHERE memberId = ${member.id}`
    // );
    console.log(member);
  });
});
// const addresses = db.all("SELECT * FROM addresses",  function(err, rows) {
// 	rows.forEach(function (row) {
// 	  console.log(row.id + ": " + row.name + " (" + row.age + ")");
// 	  const member = db.get(`SELECT * FROM members WHERE id = ${row.id}`)
// 	  console.log(row)
// 	});
// })

indexRouter.get("/", async function (ctx) {
	console.log('contact list', contactList)
  ctx.body = "Hello World !";
});

module.exports = indexRouter;
