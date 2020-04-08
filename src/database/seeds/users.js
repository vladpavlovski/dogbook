exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(() => {
      // Inserts seed entries
      // word password in hash: $2b$10$zpXKmqEx.k.CbVCiXiFN3enlK8y43qtADOQyVIFYAQOLCOywwPjsq
      return knex('users').insert([
        {
          email: 'vladislav.pavlovski@gmail.com',
          name: 'Vlad',
          password:
            '$2b$10$zpXKmqEx.k.CbVCiXiFN3enlK8y43qtADOQyVIFYAQOLCOywwPjsq',
          disabled: false,
        },
      ])
    })
}
