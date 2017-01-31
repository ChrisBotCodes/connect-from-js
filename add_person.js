const settings = require("./settings"); // settings.json
const knex = require("knex")({
  client: 'pg',
  connection: {
    host     : settings.hostname,
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    port     : settings.port,
    ssl      : settings.ssl
  }
});

const fname = process.argv[2];
const lname = process.argv[3];
const birth = process.argv[4];

knex('famous_people').insert([{first_name: fname, last_name: lname, birthdate: birth}]).then(function(result) {
  console.log(result);
  process.exit();
})
console.log("Item added!");
