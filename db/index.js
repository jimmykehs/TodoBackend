const { Client } = require("pg");
const client = new Client(
  process.env.DATABASE_URL || "postgres://localhost:5432/todo"
);

const createUser = async ({ username, password }) => {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        INSERT INTO users (username, password)
        VALUES ($1, $2)
        ON CONFLICT (username) DO NOTHING
        RETURNING *
    `,
      [username, password]
    );
    return user;
  } catch (error) {
    throw error;
  }
};

const getUserbyUsername = async ({ username }) => {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        SELECT * FROM users
        WHERE username = ($1);
        `,
      [username]
    );
    return user;
  } catch (error) {
    throw error;
  }
};

const createTodo = async ({ id, title, body }) => {
  try {
    const {
      rows: [todo],
    } = await client.query(
      `
        INSERT INTO todos ("creatorID", title, body)
        VALUES ($1,$2,$3)
        RETURNING *;
    `,
      [id, title, body]
    );

    return todo;
  } catch (error) {
    throw error;
  }
};

const getTodos = async ({ id }) => {
  const { rows } = await client.query(
    `
    SELECT * FROM todos
    WHERE "creatorID" = ($1);
  `,
    [id]
  );
  return rows;
};

module.exports = {
  client,
  createUser,
  getUserbyUsername,
  createTodo,
  getTodos,
};
