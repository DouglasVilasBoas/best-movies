const { getFilms } = require("../controllers");

module.exports = {
  method: 'GET',
  url: '/filmes',
  handler: getFilms
}
