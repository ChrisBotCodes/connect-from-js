const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const input = process.argv[2];

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }

  const q = `
    SELECT *
    FROM famous_people
    WHERE first_name LIKE $1::text
    OR last_name LIKE $1::text
  `;

  client.query(q, [input], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log('Searching ...')
    if (input.indexOf('%') > -1) {
      const inputSplit = input.split('%').toString()
      const contains = inputSplit.substring(1, inputSplit.length -1);
      console.log(`Found ${result.rows.length} person(s) containing '${contains}':`)
    } else {
      console.log(`Found ${result.rows.length} person(s) by the name '${input}':`)
    }
    for (let i = 0; i < result.rows.length; i++) {
      console.log(`- ${i+1}: ${result.rows[i].first_name} ${result.rows[i].last_name}, born '${result.rows[i].birthdate.getFullYear()}-${result.rows[i].birthdate.getMonth()+1}-${result.rows[i].birthdate.getDate()}'`)
    }
    client.end();
  });
});