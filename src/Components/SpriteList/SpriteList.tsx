import { Pokemon } from "../../Interfaces/Pokemon";
import "./SpriteList.modules.css";

function SpriteCarousel({
  listRef,
  list,
  selectedPokemon,
}: {
  listRef: React.RefObject<HTMLUListElement>;
  list: Pokemon[];
  selectedPokemon: (pokemon: Pokemon) => void;
}) {
  return (
    <ul ref={listRef} id="sprite-list">
      {list?.map((pokemon, index) => (
        <li key={index} onClick={() => selectedPokemon(pokemon)}>
          {pokemon.sprites.front_default && (
            <img src={pokemon.sprites.front_default}></img>
          )}
        </li>
      ))}
    </ul>
  );
}

export default SpriteCarousel;
