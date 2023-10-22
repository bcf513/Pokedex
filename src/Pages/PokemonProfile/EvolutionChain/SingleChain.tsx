import { ChainObject } from "../fetchChain";
import { Detail } from "./Detail";
import PokemonOnEvolutionChain from "./PokemonOnEvolutionChain";

export default function SingleChain({ chain }: { chain: ChainObject }) {
  const { species, evolves_to, pokemon, evolution_details } = chain;
  if (!species || !evolves_to || !pokemon || !evolution_details) return null;
  return (
    <div key={species.name} className="chain">
      {evolution_details.length > 0 && (
        <div className="details">
          {evolution_details.map((evolutionDetail, index) => (
            <Detail key={index} detail={evolutionDetail}></Detail>
          ))}
        </div>
      )}
      <PokemonOnEvolutionChain key={species.name} pokemon={pokemon} />
      {evolves_to.length > 0 && (
        <div>
          {evolves_to.map((newChain, key) => (
            <SingleChain key={key} chain={newChain} />
          ))}
        </div>
      )}
    </div>
  );
}
