export default class pokedexAPI {
    constructor(){
        this.URL = 'https://pokeapi.co/api/v2'
        this.preLoadList = null;
    }

    _makeRequest = async URL => {
        const request = await fetch(URL)
        return request.json();
    }
    list = async () => {
        this.preLoadList = await this._makeRequest(`${this.URL}/pokemon`)
        return this._loadList(this.preLoadList.results);
    }

    _loadList = async pokemonsList => {
        const pokemonsPromise = pokemonsList.map(prePokemons => this._makeRequest(prePokemons.url))
        const pokemons = await Promise.all(pokemonsPromise)
        return this._normalize(pokemons)
    }

    next = async () => {
        this.preLoadList = await this._makeRequest(this.preLoadList.next)
        return await this._loadList(this.preLoadList.results);
    }

    previous = async () => {
        this.preLoadList = await this._makeRequest(this.preLoadList.previous)
        return this._loadList(this.preLoadList.results);
    }

    _normalize(pokemons) {
        return pokemons.map( pokemon => {
            return {
                name: pokemon.name,
                image: pokemon.sprites.front_default,
                id: `${pokemon.id}`,
                types: pokemon.types.reverse().map(slot => slot.type.name),
                moves: pokemon.moves.map(slot => slot.move.name),
            }

        })
    }
}