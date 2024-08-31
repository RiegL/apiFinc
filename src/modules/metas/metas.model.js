
import knex from "../../config/database.js";

const TABLE = 'metas'

export const getAll = async (userId) => {
  console.log("User ID:", userId); // Adicione este log para verificar o valor
  return knex(TABLE).select("*").where({ user_id: userId });
};// busca todas as categorias do usuario

export const getById = async (id,userId) => {
  console.log("User ID:", userId); // Adicione este log para verificar o valor
  return knex(TABLE)
    .where({ id })
    .andWhere({user_id: userId})
    .select('*')
    .first();
};// busca uma categoria pelo id do usuario

export const create = async (params) => {
  console.log("Parâmetros inseridos:", params); // Verifique os parâmetros recebidos
  return knex(TABLE).insert(params); // Insere a nova categoria
};

export const remove = async (id,userId) => {
  return knex(TABLE).delete().where({id}).andWhere({user_id:userId});
}// deleta uma categoria pelo id do usuario

export const update = async (id, params, userId) => {
  return knex(TABLE).where({ id }).andWhere({user_id: userId}).update(params);
};// atualiza uma categoria pelo id do usuario
