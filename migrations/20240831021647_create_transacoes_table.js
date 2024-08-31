/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable("transacoes", (table) => {
    table.increments("id");
    table.string("descricao");
    table.integer("valor");
    table.date("data");
    table.string("tipo");
    table
      .integer("categoria_id")
      .unsigned()
      .references("id")
      .inTable("categorys");
    table.integer("user_id").unsigned().references("id").inTable("users");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTable("transacoes");
}
