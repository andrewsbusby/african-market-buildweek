exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (users) => {
      users.increments('user_id')
      users.string('username', 200).notNullable().unique()
      users.string('password', 200).notNullable()
      users.timestamps(false, true)
    })
  await knex.schema
    .createTable('country', (country) => {
      country.increments('country_id')
      country.string('country_name', 120).notNullable()
      country.string('country_abr', 10)
    })
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('users')
  await knex.schema.dropTableIfExists('country')
}
