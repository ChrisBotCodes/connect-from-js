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

const id = process.argv[2];

knex('famous_people').whereNull('first_name').orWhereNull('last_name').del().then()
console.log("Item deleted!");