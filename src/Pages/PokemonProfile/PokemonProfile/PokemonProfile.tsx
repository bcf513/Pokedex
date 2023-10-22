import { Pokemon, PokemonSpecies } from "../../../Interfaces/Pokemon";
import capitalizeString from "../../../Utils/capitalizeString";
// import "..";
import "./PokemonProfile.modules.css";

function PokemonProfile({
  pokemon,
  specie,
}: {
  pokemon: Pokemon;
  specie: PokemonSpecies;
}) {
  if (!pokemon || !specie) return <div>Carregando...</div>;
  const {
    sprites,
    types,
    abilities,
    height,
    weight,
    name: pokemonName,
  } = pokemon;
  const {
    name: specieName,
    id,
    generation,
    genera,
    flavor_text_entries,
  } = specie;

  const flavor_text_entries_en = flavor_text_entries.filter(
    ({ language }) => language.name == "en"
  );

  const englishGenus = genera.filter(
    ({ language }) => language.name == "en"
  )[0];

  return (
    <div id="pokemon-profile">
      <div className="pokemon-id-name container">
        <p className="pokemon-id">{id.toString().padStart(4, "0")}</p>
        <p className="pokemon-name">{capitalizeString(specieName)}</p>
        {specieName != pokemonName && (
          <span>
            ({capitalizeString(pokemonName).split(" ").slice(1).join(" ")})
          </span>
        )}
      </div>
      <div className="sprite-and-details">
        <div className="pokemon-sprite">
          {sprites.front_default && <img src={sprites.front_default}></img>}
        </div>
        <div id="types-and-genera">
          <div className="types">
            {types.map(({ type }, index) => (
              <div className={`type ${type.name}`} key={index}>
                <p>{capitalizeString(type.name)}</p>
              </div>
            ))}
          </div>
          <div>
            {genera.length > 0 && <p>{englishGenus.genus}</p>}
            <p>Generation: {generation.name.split("-")[1].toUpperCase()}</p>
          </div>
        </div>
      </div>
      <div>
        <div>
          <p>Description</p>
          <div className="container">
            <p>
              {flavor_text_entries_en.length > 0 &&
                flavor_text_entries_en[0].flavor_text
                  .replace("\n", " ")
                  .replace("&shy; ", " ")
                  .replace("\f", " ")}
            </p>
          </div>
        </div>
        <div id="habilites-and-measures">
          <div id="habilities-container">
            <p>Habilities</p>
            <div className="container">
              {abilities.map(({ ability }, index) => (
                <div key={index}>
                  <p>{capitalizeString(ability.name)}</p>
                </div>
              ))}
            </div>
          </div>
          <div id="width-and-height">
            <div className="measure">
              <p>Weight:</p>
              <div className="container">
                <p className="measure-value">{(weight * 0.1).toFixed(2)}</p>
              </div>
              <p>kg</p>
            </div>
            <div className="measure">
              <p>Height:</p>
              <div className="container">
                <p className="measure-value">{(height * 0.1).toFixed(2)}</p>
              </div>
              <p>m</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonProfile;
