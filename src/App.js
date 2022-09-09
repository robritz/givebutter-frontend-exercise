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
            setPokemonDetails();
        })
    }, [searchValue])

    const onSearchValueChange = (event) => {
        setSearchValue(event.target.value)
    }

    const onGetDetails = (name) => {
        const fetchPokemonDetails = async (name) => await fetchPokemonDetailsByName(name)
       
        fetchPokemonDetails(name).then((result) => {
            return result
        }).then(async result => {
            return await fetchEvolutionChainById(result.id).then(evolutionChain => {
                setPokemonDetails({...result, ...evolutionChain})
            })
        })
        
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
                ) || `No Results Found`}
                {
                    pokemonDetails && (
                        <div className={'pokedex__details'}>
                            <div className="pokedex__details-name">
                                <strong>{pokemonDetails.name}</strong>
                            </div>
                            <div className="pokedex__details-type">
                                <strong>Types</strong>
                                <ul>
                                    {
                                        pokemonDetails.types.map(type => {
                                            return (
                                                <li key={type.type.name}>{type.type.name}</li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                            <div className="pokedex__details-moves">
                                <strong>Moves</strong>
                                <ul>
                                    {
                                        pokemonDetails.moves.map(move => {
                                            return (
                                                <li key={move.move.name}>{move.move.name}</li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                            { pokemonDetails.chain.evolves_to.length > 0 && (
                            <div className="pokedex__details-evolutions">
                                <strong>Evolutions</strong>
                                <ul>
                                    {
                                        pokemonDetails.chain.evolves_to.map(ev => {
                                            return (
                                                <li key={ev.species.name}>{ev.species.name}</li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                            )}
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default App;
