import React, { useState, useEffect } from 'react';
import Pokemon from '../Pokemon/pokemon';
import Filter from '../Filter/filter';
import pokemonListStyle from './pokemonList.module.css';

const PokemonList = () => {

  // Initialize state of pokemons 
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [types, setTypes] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [pokemonTypes, setPokemonTypes] = useState({});

  // Fetch list of pokemons from pokeapi
  useEffect(() => {

    const limit = 25;
    const offset = (currentPage - 1) * limit;
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setPokemonList(json.results);
        setTotalPages(Math.ceil(json.count / limit));
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();

  }, [currentPage]);


  //Pagination
  function pagePrev() {
    setCurrentPage(currentPage - 1);
  }

  function pageNext() {
    setCurrentPage(currentPage + 1);
  }

  // Get pokemon types
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/type')
      .then(response => response.json())
      .then(data => {
        const typeNames = data.results.map(type => type.name);
        setTypes(typeNames);
      })
      .catch(error => console.log('Error:', error));
  }, []);

  // Fetch pokemon types
  useEffect(() => {
    const fetchPokemonTypes = async () => {
      const typePromises = pokemonList.map((pokemon) =>
        fetch(pokemon.url).then((response) => response.json())
      );
      const typeResults = await Promise.all(typePromises);
      const pokemonTypes = typeResults.reduce(
        (acc, { types }, index) => ({ ...acc, [pokemonList[index].name]: types }),
        {}
      );
      console.log(pokemonTypes);
      setPokemonTypes(pokemonTypes);
    };

    fetchPokemonTypes();
  }, [pokemonList]);

  const typeChange = (event) => {
    const { value } = event.target;
    setSelectedTypes((prevSelectedTypes) => {
      if (prevSelectedTypes.includes(value)) {
        return prevSelectedTypes.filter((type) => type !== value);
      }
      return [...prevSelectedTypes, value];
    });
  };

  // Filter pokemon list 
  const filteredPokemonList = pokemonList.filter((pokemon) =>
    (selectedTypes.length === 0) || pokemonTypes[pokemon.name]?.some(({ type }) => selectedTypes.includes(type.name))
  );

  // Render list of pokemon
  return (
    <div className={pokemonListStyle.container}>
      <h1>Test front-end React o2web</h1>
      <h5>By Annabelle Gamache</h5>
      <div>
        <Filter types={types} onTypeChange={typeChange} selectedTypes={selectedTypes} />
      </div>
      <div className={pokemonListStyle.pokemonGrid}>
        {filteredPokemonList.map((pokemon, index) => (
          <Pokemon key={index} pokemon={pokemon} />
        ))}
      </div>
      <div className={pokemonListStyle.pagination}>
        <button onClick={pagePrev} disabled={currentPage === 1}>Prev</button>
        <span>{currentPage} of {totalPages}</span>
        <button onClick={pageNext} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  )
}


export default PokemonList;
