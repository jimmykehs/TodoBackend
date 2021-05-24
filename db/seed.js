const { client } = require("./index");

const dropTables = async () => {
  try {
    console.log("Starting to drop tables!");
    await client.query(`
        DROP TABLE IF EXISTS todos;
        DROP TABLE IF EXISTS users;
    `);
    console.log("Finished dropping tables!");
  } catch (error) {
    console.error("Error dropping tables");
    throw error;
  }
};

const createTables = async () => {
  try {
    console.log("Creating tables!");
    await client.query(`
        CREATE TABLE users (
            id serial PRIMARY KEY,
            username VARCHAR (255) UNIQUE NOT NULL,
            password VARCHAR (255) NOT NULL);

        CREATE TABLE todos (
            id serial PRIMARY KEY,
            "creatorID" INTEGER REFERENCES users(id),
            title VARCHAR (255) NOT NULL,
            body TEXT);
    `);
    console.log("Finished creating tables!");
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const rebuildDB = async () => {
  client.connect();
  await dropTables();
  await createTables();
};

rebuildDB();
