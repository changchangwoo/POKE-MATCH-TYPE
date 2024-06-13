import axios from "axios";

interface IAPI {
    url : string
}

const baseURL = 'https://pokeapi.co/api/v2/'

export const API = async ({url} : IAPI) => {
    try {
        const response = await axios.get(baseURL+url)
        console.log(response.data)
        return response.data
    }
    catch (e) {
        console.log(e)
    }
}

export const fetchAllPokemonList = async () => {
    return API({url : 'pokemon-species/1'});
}

export const fetchDetailPokem = async () => {
    return API({url : 'pokemon-species?limit=10000'});
}
