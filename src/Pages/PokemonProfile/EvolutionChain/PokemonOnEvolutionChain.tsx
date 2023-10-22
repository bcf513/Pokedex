import { Pokemon } from "../../../Interfaces/Pokemon";
import { useContext } from "react";
import { PokemonSelectedContext } from "../SpecieProfile";
import capitalizeString from "../../../Utils/capitalizeString";

function PokemonOnEvolutionChain({ pokemon }: { pokemon: Pokemon }) {
  const contextValue = useContext(PokemonSelectedContext);
  if (!contextValue) return;
  const { currentPokemon, setcurrentPokemon } = contextValue;
  if (!currentPokemon) return null;
  const { name, sprites, species } = pokemon;
  return (
    <div
      className={`pokemon-on-chain ${
        species.name == currentPokemon.species.name ? "pokemon_selected" : ""
      }`}
      onClick={() => setcurrentPokemon(pokemon)}
    >
      {sprites.front_default && <img src={sprites.front_default} alt="" />}
      <p>{capitalizeString(name)}</p>
    </div>
  );
}

export default PokemonOnEvolutionChain;
