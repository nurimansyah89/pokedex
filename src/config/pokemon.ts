export default {
  // API URL Endpoints
  apiUrl: process.env.REACT_APP_POKEMON_API_URL || 'https://pokeapi.co/api/v2',

  // Pokemon Image URL Endpoint
  imageUrl: process.env.REACT_APP_POKEMON_IMAGE_URL || 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail',

  // We assign manually because the api isn't completed yet
  totalPokemons: process.env.REACT_APP_POKEMON_TOTAL || 807,
};
