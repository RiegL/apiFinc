import bcrypt from "bcrypt";
import knex from "../../config/database.js";

export const getAll = async () => {
  return knex("users").select(
    "id",
    "name",
    "email",
    "created_at",
    "updated_at"
  );
};

export const getById = async (id) => {
  return knex("users")
    .where({ id })
    .select("id", "name", "email", "created_at", "updated_at");
};

export const save = async (params) => {
  params.password = await bcrypt.hash(params.password, 10);
  return knex("users").insert(params);
};

export const remove = async (id) => {
  return knex("users").where({ id }).delete();
};

export const update = async (id, params) => {
  return knex("users").where({ id }).update(params);
};

export const getByEmail = async (email) => {
  return knex("users").where({ email }).first();
};
