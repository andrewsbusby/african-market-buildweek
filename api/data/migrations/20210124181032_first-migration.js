exports.up = async (knex) => {
  await knex.schema
    .createTable('owners', (owners) => {
      owners.increments('owner_id')
      owners.string('ownername', 200).notNullable().unique()
      owners.string('password', 200).notNullable()
      owners.timestamps(false, true)
    })
  await knex.schema.createTable('products', (tbl) => {
    tbl.increments('product_id')
    tbl.string('product_name', 200).notNullable()
    tbl.string('product_description', 300).notNullable()
  })
  await knex.schema.createTable('listings', (tbl) => {
    tbl.increments('listing_id')
    tbl.integer('owner_id')
      .unsigned()
      .references('owners.owner_id')
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
  await knex.schema.dropTableIfExists('owners')
  await knex.schema.dropTableIfExists('products')
  await knex.schema.dropTableIfExists('listings')
  
}
