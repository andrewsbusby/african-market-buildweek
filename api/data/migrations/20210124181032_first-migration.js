exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (users) => {
      users.increments('user_id')
      users.string('username', 200).notNullable().unique()
      users.string('password', 200).notNullable()
      users.timestamps(false, true)
    })
  await knex.schema.createTable('products', (tbl) => {
    tbl.increments('product_id')
    tbl.string('product_name', 200).notNullable()
    tbl.string('product_description', 300).notNullable()
  })
  await knex.schema.createTable('listings', (tbl) => {
    tbl.increments('listing_id')
    tbl.integer('user_id')
      .unsigned()
      .references('users.user_id')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT')
    tbl.string('listing_catagory', 200).notNullable()
    tbl.string('listing_name', 200).notNullable()
    tbl.string('listing_description', 300).notNullable()
    tbl.string('listing_location', 150).notNullable()
    tbl.decimal('listing_price', 10, 2).notNullable()
  })
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('users')
  await knex.schema.dropTableIfExists('products')
  await knex.schema.dropTableIfExists('listings')
  
}
