import { useEffect, useState } from "react";
import { fetchAllPokemon, fetchPokemonDetailsByName, fetchEvolutionChainById } from "./api";

function App() {
    const [pokemon, setPokemon] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [pokemonDetails, setPokemonDetails] = useState()

    useEffect(() => {
        const fetchPokemon = async () => await fetchAllPokemon()

        fetchPokemon().then((results) => {
            const {results: pokemonList} = results
            setPokemon(
                pokemonList.filter(monster => monster.name.includes(searchValue))
            )
        })
    }, [searchValue])

    const onSearchValueChange = (event) => {
        setSearchValue(event.target.value)
    }

    const onGetDetails = (name) => {
        const fetchPokemonDetails = async (name) => await fetchPokemonDetailsByName(name)
       
        fetchPokemonDetails(name).then((result) => {
            const evolutionChain = getEvolutionChain(result.id)
            setPokemonDetails(result)
            console.log(evolutionChain);
        })
    }

    const getEvolutionChain = async (id) => {
        const fetchPokemonDetails = async (id) => await fetchEvolutionChainById(id)
       
        return fetchPokemonDetails(id).then((result) => result.chain)
    }

    return (
        <div className={'pokedex__container'}>
            <div className={'pokedex__search-input'}>
                <input value={searchValue} onChange={onSearchValueChange} placeholder={'Search Pokemon'}/>
            </div>
            <div className={'pokedex__content'}>
                {pokemon.length > 0 && (
                    <div className={'pokedex__search-results'}>
                        {
                            pokemon.map(monster => {
                                return (
                                    <div className={'pokedex__list-item'} key={monster.name}>
                                        <div>
                                            {monster.name}
                                        </div>
                                        <button onClick={() => { onGetDetails(monster.name) }}>Get Details</button>
                                    </div>
                                )
                            })
                        }
                    </div>
                )}
                {
                    pokemonDetails && (
                        <div className={'pokedex__details'}>
                            <div className="name">
                                <strong>{pokemonDetails.name}</strong>
                            </div>
                            <div className="type">
                                <strong>Types</strong>
                                <ul className="types">
                                    {
                                        pokemonDetails.types.map(type => {
                                            return (
                                                <li key={type.type.name}>{type.type.name}</li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                            <div className="moves">
                                <strong>Moves</strong>
                                <ul className="moves">
                                    {
                                        pokemonDetails.moves.map(move => {
                                            return (
                                                <li key={move.move.name}>{move.move.name}</li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                            <div className="evolutions">
                                <strong>Evolutions</strong>
                                <ul className="evolutions__list">
                                    {
                                        pokemonDetails.moves.map(move => {
                                            return (
                                                <li key={move.move.name}>{move.move.name}</li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default App;
