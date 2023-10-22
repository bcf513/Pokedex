import { useContext } from "react";
import { Pokemon } from "../../../Interfaces/Pokemon";
import capitalizeString from "../../../Utils/capitalizeString";
import "./Forms.modules.css";
import { PokemonSelectedContext } from "../SpecieProfile";

function returnNameOfForm(name: string) {
  const nameArray = capitalizeString(name).split(" ");
  return nameArray.length == 1 ? "Normal" : nameArray.slice(1).join(" ");
}

export function Forms({ forms }: { forms: Pokemon[] }) {
  const contextValue = useContext(PokemonSelectedContext);
  if (!contextValue) return;
  const { currentPokemon, setcurrentPokemon } = contextValue;

  return (
    <div id="forms" className="container">
      {forms.map((pokemon, key) => (
        <div
          className={`form ${
            pokemon.name == currentPokemon.name ? "pokemon_selected" : ""
          }`}
          onClick={() => setcurrentPokemon(pokemon)}
          key={key}
        >
          <div className="form-sprite">
            {pokemon.sprites.front_default && (
              <img src={pokemon.sprites.front_default} alt="" />
            )}
          </div>
          <p>{returnNameOfForm(pokemon.name)}</p>
        </div>
      ))}
    </div>
  );
}

export default Forms;
