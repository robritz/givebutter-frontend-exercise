import { useEffect, useState } from "react";
import { fetchAllPokemon, fetchPokemonDetailsByName } from "./api";

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
            console.log("pokemonDetails", name, result)
            setPokemonDetails(result)
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
                )}
                {
                    pokemonDetails && (
                        <div className={'pokedex__details'}>
                            {pokemonDetails.name}
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default App;
