import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import {
  Pokemon,
  PokemonSpecies,
  PokemonSpeciesVariety,
} from "../../Interfaces/Pokemon";
import "./SpecieProfile.modules.css";
import PokemonProfile from "./PokemonProfile/PokemonProfile";
import useFetch from "../../Hooks/useFetch";
import EvolutionChain from "./EvolutionChain/EvolutionChain";
import Forms from "./Forms/Forms";
import { preloadSprite } from "../../Utils/preloadSprite";
import fetchFullChain, { ChainObject } from "./fetchChain";
import fetchData from "../../Utils/fetchData";

type PokemonContextType = {
  currentPokemon: Pokemon;
  setcurrentPokemon: Dispatch<SetStateAction<Pokemon>>;
};

export const PokemonSelectedContext = createContext<
  PokemonContextType | undefined
>(undefined);

function SpecieProfile({ pokemon }: { pokemon: Pokemon }) {
  const [currentPokemon, setcurrentPokemon] = useState(pokemon);
  const [fullEvolutionChain, setFullEvolutionChain] =
    useState<ChainObject | null>(null);
  const [forms, setForms] = useState<Pokemon[]>([]);
  const [pagina, setPagina] = useState<"Profile" | "Evolution" | "Forms">(
    "Profile"
  );
  const { data: currentPokemonSpecie } = useFetch<PokemonSpecies>(
    currentPokemon.species.url
  );

  useEffect(() => {
    async function fetchVarieties(varietiesToFetch: PokemonSpeciesVariety[]) {
      const promises = varietiesToFetch.map(({ pokemon }) =>
        fetchData<Pokemon>(pokemon.url)
      );

      const varietiesFetched = await Promise.all(promises);

      const filteredData = varietiesFetched.filter(
        (pokemon) => pokemon !== null && pokemon !== undefined
      ) as Pokemon[];

      const sprites = filteredData.map(({ sprites }) => {
        if (sprites.front_default) preloadSprite(sprites.front_default);
      });

      await Promise.all(sprites);

      setForms(filteredData);
    }

    if (currentPokemon.sprites.front_default)
      preloadSprite(currentPokemon.sprites.front_default);

    if (
      currentPokemonSpecie?.varieties &&
      currentPokemonSpecie.varieties.length > 0
    ) {
      fetchVarieties(currentPokemonSpecie.varieties);
    }

    if (currentPokemonSpecie?.evolution_chain.url)
      fetchFullChain(currentPokemonSpecie.evolution_chain.url).then((res) =>
        setFullEvolutionChain(res)
      );
    setPagina("Profile");
  }, [currentPokemon, currentPokemonSpecie]);

  if (!currentPokemonSpecie || !currentPokemon || !fullEvolutionChain)
    return (
      <div>
        <p>Carregando...</p>
      </div>
    );

  function pageToShow() {
    switch (pagina) {
      case "Profile": {
        if (!currentPokemonSpecie || !currentPokemon) return null;
        return (
          <PokemonProfile
            pokemon={currentPokemon}
            specie={currentPokemonSpecie}
          />
        );
      }
      case "Evolution":
        if (!fullEvolutionChain) return null;
        return <EvolutionChain chain={fullEvolutionChain} />;
      case "Forms":
        if (!forms) return null;
        return <Forms forms={forms} />;
    }
  }

  return (
    <PokemonSelectedContext.Provider
      value={{ currentPokemon, setcurrentPokemon }}
    >
      <div id="specie-profile">
        <div id="profile-buttons">
          <button onClick={() => setPagina("Profile")}>Profile</button>
          {fullEvolutionChain.evolves_to.length > 0 && (
            <button onClick={() => setPagina("Evolution")}>Evolution</button>
          )}
          {forms.length > 1 && (
            <button onClick={() => setPagina("Forms")}>Forms</button>
          )}
        </div>
        <>{pageToShow()}</>
      </div>
    </PokemonSelectedContext.Provider>
  );
}

export default SpecieProfile;
