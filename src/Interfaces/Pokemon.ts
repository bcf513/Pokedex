import { NamedAPIResource } from "./Common";

export type Move = {
  id: number;
  name: string;
  accuracy: number;
  effect_chance: number;
  pp: number;
  priority: number;
  power: number;
  contest_combos: null;
  contest_type: NamedAPIResource;
  contest_effect: null;
  damage_class: NamedAPIResource;
  effect_entries: null[];
  effect_changes: null[];
  learned_by_pokemon: NamedAPIResource[];
  flavor_text_entries: null[];
  generation: NamedAPIResource;
  machines: null[];
  meta: null;
  names: Name[];
  past_values: null[];
  stat_changes: null[];
  super_contest_effect: null;
  target: NamedAPIResource;
  type: NamedAPIResource;
};

export type Location = {
  id: number;
  name: string;
  region: NamedAPIResource;
  names: Name[];
  game_indices: null[];
  areas: null[];
};

type Language = {
  name: string;
  url: string;
};

type Version_Group = {
  name: string;
  url: string;
};

export type Item = {
  id: number;
  name: string;
  cost: number;
  fling_power: number;
  fling_effect: NamedAPIResource;
  attributes: NamedAPIResource[];
  category: NamedAPIResource;
  effect_entries: null[];
  flavor_text_entries: null[];
  game_indices: null[];
  names: null[];
  sprites: {
    default: string | null;
  };
  held_by_pokemon: null[];
  baby_trigger_for: null;
  machines: null[];
};

export type Ability = {
  id: number;
  name: string;
  is_main_series: boolean;
  generation: {
    name: string;
    url: string;
  };
  names: {
    name: string;
    language: Language;
  }[];
  effect_entries: {
    effect: string;
    short_effect: string;
    language: Language;
  }[];
  effect_changes: {
    version_group: Version_Group;
    effect_entries: {
      effect: string;
      language: Language;
    }[];
  }[];
  flavor_text_entries: {
    flavor_text: string;
    language: Language;
    version_group: Version_Group;
  }[];
  pokemon: {
    is_hidden: true;
    slot: number;
    pokemon: {
      name: string;
      url: string;
    };
  }[];
};

export type Types = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

type Name = {
  name: string;
  language: NamedAPIResource;
};

type Genus = {
  genus: string;
  language: NamedAPIResource;
};

export type Pokemon = {
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];
  base_experience: number;
  forms: NamedAPIResource[];
  game_indices: unknown[];
  height: number;
  held_items: unknown[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: unknown[];
  name: string;
  order: number;
  past_types: unknown[];
  species: {
    name: string;
    url: string;
  };
  sprites: {
    back_default: string | null;
    back_female: string | null;
    back_shiny: string | null;
    back_shiny_female: string | null;
    front_default: string | null;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
    other: object | null;
    versions: object | null;
  };
  stats: {
    stat: NamedAPIResource;
    effort: number;
    base_stat: number;
  }[];
  types: Types[];
  weight: number;
};

export type PokemonSpeciesVariety = {
  is_default: boolean;
  pokemon: NamedAPIResource;
};

export type PokemonSpecies = {
  id: number;
  name: string;
  order: number;
  gender_rate: number;
  capture_rate: number;
  base_happiness: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  hatch_counter: number;
  has_gender_differences: boolean;
  forms_switchable: boolean;
  growth_rate: null;
  pokedex_number: null;
  egg_groups: null;
  color: null;
  shape: null;
  evolve_from_species: PokemonSpecies;
  evolution_chain: {
    url: string;
  };
  habitat: null;
  generation: NamedAPIResource;
  names: Name[];
  pal_park_encounters: null[];
  flavor_text_entries: {
    flavor_text: string;
    language: NamedAPIResource;
    version_group: NamedAPIResource;
  }[];
  form_descriptions: null[];
  genera: Genus[] | [];
  varieties: PokemonSpeciesVariety[];
};

export type Type = {
  id: number;
  name: string;
  damage_relations: TypeRelations;
  past_damage_relations: null[];
  game_indices: null[];
  generation: null;
  move_damage_class: NamedAPIResource;
  names: Name[];
  pokemon: TypePokemon[];
  moves: NamedAPIResource[];
};

type TypePokemon = {
  slot: number;
  pokemon: NamedAPIResource;
};

type TypeRelations = {
  no_damage_to: NamedAPIResource[];
  half_damage_to: NamedAPIResource[];
  double_damage_to: NamedAPIResource[];
  no_damage_from: NamedAPIResource[];
  half_damage_from: NamedAPIResource[];
  double_damage_from: NamedAPIResource[];
};
