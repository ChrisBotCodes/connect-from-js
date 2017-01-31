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

const input = process.argv[2];

const q = knex.select().from('famous_people')
  .where('first_name', 'like', input)
  .orWhere('last_name', 'like', input)
  .then(function (result) {
    console.log('Searching ...');
    if (result.length === 0) {
      return console.log("error - cannot find any matches");
    } else {
      console.log(typeof result);
      if (input.indexOf('%') > -1) {
        const inputSplit = input.split('%').toString()
        const contains = inputSplit.substring(1, inputSplit.length -1);
        console.log(`Found ${result.length} person(s) containing '${contains}':`)
      } else {
        console.log(`Found ${result.length} person(s) by the name '${input}':`)
      }
      for (let i = 0; i < result.length; i++) {
        console.log(`- ${i+1}: ${result[i].first_name} ${result[i].last_name}, born '${result[i].birthdate.getFullYear()}-${result[i].birthdate.getMonth()+1}-${result[i].birthdate.getDate()}'`);
      }
    }
  });
