exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('dogs')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('dogs').insert([
        { name: 'Loolz', breed: 'Akita', birth_year: 2010 },
        { name: 'Chacha', breed: 'Leonberg', birth_year: 2012 },
        { name: 'Salsa', breed: 'Redbone', birth_year: 2016 },
      ])
    })
}
