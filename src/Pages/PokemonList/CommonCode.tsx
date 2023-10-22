import { NamedAPIResource } from "../../Interfaces/Common";
import { Pokemon, Type } from "../../Interfaces/Pokemon";
import fetchData from "../../Utils/fetchData";
import { preloadSprite } from "../../Utils/preloadSprite";
import { Tfilter } from "./PokemonList";

export type TSearchResult = {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedAPIResource[] | null;
};

export async function fetchPokemons(listOfUrls: NamedAPIResource[]) {
  const fetchDataPromises = listOfUrls.map(async ({ url }) => {
    return fetchData<Pokemon>(url);
  });

  const resolvedData = await Promise.all(fetchDataPromises);

  const filteredData = resolvedData.filter(
    (pokemon) => pokemon !== null && pokemon !== undefined
  ) as Pokemon[];

  const defaultPokemons = filteredData.filter(({ is_default }) => is_default);

  const fetchImages = defaultPokemons.map(({ sprites }) => {
    if (sprites.front_default) preloadSprite(sprites.front_default);
  });

  await Promise.all(fetchImages);

  return defaultPokemons;
}

export async function getAllPokemonsNamedAPIResource() {
  let listOfPokemons: NamedAPIResource[] = [];

  async function fetchChain(url: string) {
    if (!url) return;
    const searchResult = await fetchData<TSearchResult>(url);
    if (!searchResult || !searchResult.next || !searchResult.results) return;
    listOfPokemons = [...listOfPokemons, ...searchResult.results];
    return fetchChain(searchResult.next);
  }

  await Promise.all([
    fetchChain(`https://pokeapi.co/api/v2/pokemon/?limit=40&offset=00`),
  ]);

  return listOfPokemons;
}

export async function searchPokemonsOfType(filters: Tfilter) {
  const listsOfEachType = await Promise.all(
    filters.types.map(
      (type) =>
        fetchData<Type>(
          "https://pokeapi.co/api/v2/type/" + type
        ) as Promise<Type>
    )
  );

  const combinedLists = listsOfEachType.map(({ pokemon }) => pokemon).flat();

  const mapa: { [key: string]: boolean } = {};
  const listWithoutDuplicates = combinedLists.reduce(
    (listaSemDuplicatas: NamedAPIResource[], objeto) => {
      if (!mapa[objeto.pokemon.name]) {
        mapa[objeto.pokemon.name] = true;
        listaSemDuplicatas.push(objeto.pokemon);
      }
      return listaSemDuplicatas;
    },
    []
  );

  const listOfPokemons = await fetchPokemons(listWithoutDuplicates);
  const pokemonFiltered = listOfPokemons.filter(({ types }) =>
    types.filter(({ type }) => filters.types.includes(type.name))
  );

  const pokemonSorted = pokemonFiltered.sort((a, b) => a.id - b.id);

  let pokemonsOnlyOfTypes: Pokemon[] = [];

  if (filters.typesOptions.showOnlyOfSelectedTypes) {
    pokemonsOnlyOfTypes = pokemonSorted.filter(({ types }) => {
      const typesOfPokemon = types.map((typeObject) => typeObject.type.name);

      if (filters.typesOptions.showOnlyOfExactTypes) {
        return (
          !typesOfPokemon.some(
            (typeName) => !filters.types.includes(typeName)
          ) && types.length == filters.types.length
        );
      } else {
        return !typesOfPokemon.some(
          (typeName) => !filters.types.includes(typeName)
        );
      }
    });
  }

  return pokemonsOnlyOfTypes.length == 0 ? pokemonSorted : pokemonsOnlyOfTypes;
}
