import React from 'react';

const Pokemon = ({ pokemon, language }) => {
  const getLocalizedPokemonName = () => {
    switch (language) {
      case 'japanese':
        return pokemon.name.japanese;
      case 'chinese':
        return pokemon.name.chinese;
      case 'french':
        return pokemon.name.french;
      default:
        return pokemon.name.english;
    }
  };
  const isDoubleType = pokemon.type.length === 2;
  return (
    <div className="pokemon">
      <img src={pokemon.image} alt={pokemon.name.english} />
      <div>[{pokemon.id}]</div>
      <div>{getLocalizedPokemonName()}</div>
      <div className={`pokemonType ${isDoubleType ? 'double-type' : 'single-type'}`}>
        {pokemon.type.map((type, index) => (
          <div key={index}>{type}</div>
        ))}
      </div>
      <div className="stats-left">
        <div>HP: {pokemon.base.HP}</div>
        <div>Attack: {pokemon.base.Attack}</div>
        <div>Defense: {pokemon.base.Defense}</div>
      </div>
      <div className="stats-right">
        <div>Speed: {pokemon.base.Speed}</div>
        <div>Sp. Attack: {pokemon.base['Sp. Attack']}</div>
        <div>Sp. Defense: {pokemon.base['Sp. Defense']}</div>
      </div>
    </div>
  );
};

export default Pokemon;