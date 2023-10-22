import { NamedAPIResource } from "./Common";
import { PokemonSpecies } from "./Pokemon";

export type EvolutionDetail = {
  gender: number | null;
  held_item: NamedAPIResource;
  item: NamedAPIResource | null;
  known_move: NamedAPIResource;
  known_move_type: null;
  location: Location;
  min_affection: number | null;
  min_beauty: number | null;
  min_happiness: number | null;
  min_level: number | null;
  needs_overworld_rain: boolean;
  party_species: PokemonSpecies;
  party_type: null;
  relative_physical_stats: number | null;
  time_of_day: "" | "day" | "night";
  trade_species: PokemonSpecies;
  trigger: NamedAPIResource;
  turn_upside_down: null;
};

export type ChainLink = {
  is_baby: boolean;
  species: NamedAPIResource;
  evolution_details: EvolutionDetail[];
  evolves_to: ChainLink[] | [];
};

export type EvolutionChain = {
  id: number;
  baby_trigger_item: null;
  chain: ChainLink | null;
};
