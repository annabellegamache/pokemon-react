import React, { useEffect, useState } from 'react';
import pokemonStyle from './pokemon.module.css';

const Pokemon = props => {
  const { pokemon } = props;

  // Initialize state of pokemons informastions
  const [pokemonInformations, setPokemonInformations] = useState();

  // Fetch informations of pokemon
  useEffect(() => {
    const fetchPokemonInformations = async () => {
      try {
        const response = await fetch(pokemon.url);
        const json = await response.json();

        setPokemonInformations(json);

      } catch (error) {
        console.log("error", error);
      }
    };

    fetchPokemonInformations();
  }, [pokemon.url]);

  //Get pokemon types
  const pokemonTypes = pokemonInformations?.types.map((type) => {
    return (
      <span key={type.slot}>{type.type.name}</span>
    );
  });

  // Display name, id and image
  return (
    <div className={pokemonStyle.container}>
      <p className={pokemonStyle.info}><span><small>#</small>{pokemonInformations?.id}</span>{pokemon?.name.charAt(0).toUpperCase() + pokemon?.name.slice(1)}</p>
      <div className={pokemonStyle.sprite}>
        <img src={pokemonInformations?.sprites?.front_default} alt={pokemon?.name} />
      </div>
      <div className={pokemonStyle.type}>{pokemonTypes}</div>
    </div>
  )
}

export default Pokemon;
