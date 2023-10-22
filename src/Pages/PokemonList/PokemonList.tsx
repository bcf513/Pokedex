import { useState, useEffect, useRef, useCallback } from "react";
import NameList from "../../Components/NameList/NameList";
import SpriteList from "../../Components/SpriteList/SpriteList";
import { Pokemon } from "../../Interfaces/Pokemon";
import Modal from "../../Components/Modal/Modal";
import "./PokemonList.modules.css";
import SpecieProfile from "../PokemonProfile/SpecieProfile";
import useFetch from "../../Hooks/useFetch";
import {
  TSearchResult,
  fetchPokemons,
  getAllPokemonsNamedAPIResource,
  searchPokemonsOfType,
} from "./CommonCode";
import PokemonFilters from "./PokemonFilters/PokemonFilters";
import fetchData from "../../Utils/fetchData";

export type Tfilter = {
  types: string[];
  typesOptions: {
    showOnlyOfSelectedTypes: boolean;
    showOnlyOfExactTypes: boolean;
  };
};

const initialListToFetch = `https://pokeapi.co/api/v2/pokemon/?limit=40&offset=00`;

function PokemonList() {
  const effectRan = useRef(false);
  const spriteListRef = useRef<HTMLUListElement>(null);
  const nameListRef = useRef<HTMLUListElement | null>(null);
  const nameSearchRef = useRef<HTMLInputElement>(null);
  const [filtersModalOpen, setFiltersModalOpen] = useState(false);
  const [listToFetch, setlistToFetch] = useState<string>(initialListToFetch);
  const [pokemonSelected, setPokemonSelected] = useState<Pokemon | null>(null);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [filters, setFilters] = useState<Tfilter>({
    types: [],
    typesOptions: {
      showOnlyOfSelectedTypes: false,
      showOnlyOfExactTypes: false,
    },
  });
  const [filteredList, setfilteredList] = useState(false);
  const { data } = useFetch<TSearchResult>(listToFetch);
  const handleNameListRef = useCallback((node: HTMLUListElement | null) => {
    if (node !== null) {
      nameListRef.current = node;
    }
  }, []);
  async function search() {
    setfilteredList(true);
    setPokemonList([]);

    if (filters.types.length > 0) {
      const pokemonsOfTypes = await searchPokemonsOfType(filters);
      if (!pokemonsOfTypes || !nameSearchRef.current) return;

      const listOfNamesSearched = pokemonsOfTypes.filter(({ name }) => {
        if (nameSearchRef.current)
          return name.includes(nameSearchRef.current.value.toLowerCase());
      });

      setPokemonList(listOfNamesSearched);
    } else {
      if (nameSearchRef.current?.value != "") {
        const listToSearch = await getAllPokemonsNamedAPIResource();
        if (!listToSearch) return;
        const newList = listToSearch.filter(({ name }) => {
          if (nameSearchRef.current)
            return name.includes(nameSearchRef.current.value.toLowerCase());
        });
        const pokemonSearched = await fetchPokemons(newList);
        setPokemonList(pokemonSearched);
      } else {
        setfilteredList(false);
        if (listToFetch == initialListToFetch) {
          const initialData = await fetchData<TSearchResult>(
            initialListToFetch
          );
          if (!initialData || !initialData.results) return;
          const fetchedPokemons = await fetchPokemons(initialData.results);
          setPokemonList(fetchedPokemons);
        } else {
          setlistToFetch(initialListToFetch);
        }
      }
    }
  }

  const fetchNext = async () => {
    if (!data || !data.next) return;
    setlistToFetch(data.next);
  };

  useEffect(() => {
    if (effectRan.current && data && data.results) {
      fetchPokemons(data.results).then((res) => {
        setPokemonList((prevPokemonList) => {
          if (prevPokemonList) {
            return [...prevPokemonList, ...res];
          } else {
            return res;
          }
        });
      });
    }
    return () => {
      effectRan.current = true;
    };
  }, [data]);

  useEffect(() => {
    function handleScroll(e: Event) {
      if (!nameListRef.current || !spriteListRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } =
        e.currentTarget as HTMLUListElement;
      const outraLista = spriteListRef.current;

      const alturaItensEsquerda =
        spriteListRef.current.scrollHeight /
        spriteListRef.current.children.length;
      const alturaItensDireita =
        nameListRef.current.scrollHeight / nameListRef.current.children.length;

      // Calcular a diferença de altura entre os itens das duas listas
      const diferencaAlturaItens = alturaItensEsquerda - alturaItensDireita;
      // Calcula a posição de rolagem da outra lista
      const outraListaScrollTop =
        (scrollTop / (scrollHeight - clientHeight)) *
        (outraLista.scrollHeight - outraLista.clientHeight);

      // Ajusta a posição de rolagem da outra lista levando em consideração a diferença de altura dos itens
      outraLista.scrollTop =
        outraListaScrollTop -
        diferencaAlturaItens *
          (outraListaScrollTop /
            (outraLista.scrollHeight - outraLista.clientHeight));
    }

    if (!nameListRef.current) return;
    nameListRef.current.addEventListener("scroll", handleScroll);

    return () => {
      if (!nameListRef.current) return;
      nameListRef.current.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div id="lists-container">
      {!pokemonList ? (
        <p>Carregando...</p>
      ) : (
        <>
          <div id="search-div">
            <button onClick={search}>Search</button>
            <input ref={nameSearchRef} type="text" name="" id="" />
            <button onClick={() => setFiltersModalOpen(true)}>Filters</button>
          </div>
          <div id="name-and-sprite-lists">
            <SpriteList
              listRef={spriteListRef}
              list={pokemonList}
              selectedPokemon={setPokemonSelected}
            />
            <NameList
              handleNameListRef={handleNameListRef}
              list={pokemonList}
              selectedPokemon={setPokemonSelected}
              fetchNext={fetchNext}
              filteredList={filteredList}
            />
          </div>
          {filtersModalOpen && (
            <Modal onClose={() => setFiltersModalOpen(false)}>
              <PokemonFilters filters={filters} setFilters={setFilters} />
            </Modal>
          )}
          {pokemonSelected && (
            <Modal onClose={() => setPokemonSelected(null)}>
              <SpecieProfile pokemon={pokemonSelected} />
            </Modal>
          )}
        </>
      )}
    </div>
  );
}

export default PokemonList;
