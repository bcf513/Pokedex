import { NamedAPIResource } from "../../Interfaces/Common";
import {
  ChainLink,
  EvolutionChain,
  EvolutionDetail,
} from "../../Interfaces/Evolution";
import {
  Location,
  Item,
  Move,
  Pokemon,
  PokemonSpecies,
} from "../../Interfaces/Pokemon";
import fetchData from "../../Utils/fetchData";
import { preloadSprite } from "../../Utils/preloadSprite";

export type DetailObject = {
  trigger: NamedAPIResource;
  relevantDetails: object[];
};

export type ChainObject = {
  species: PokemonSpecies | null;
  pokemon: Pokemon | null;
  evolves_to: ChainObject[] | [];
  evolution_details: DetailObject[] | [];
  is_baby?: boolean;
};

async function fetchFullChain(fetchUrl: string): Promise<ChainObject> {
  let fullChain: ChainObject = {
    species: null,
    pokemon: null,
    evolves_to: [],
    evolution_details: [],
  };
  const promises: unknown[] = [];

  const fetchChainLink = async (obj: ChainLink): Promise<ChainObject> => {
    const chainLink: ChainObject = {
      species: null,
      pokemon: null,
      evolves_to: [],
      evolution_details: [],
    };

    if (!obj.species || !obj.species.url) return chainLink;

    promises.push(
      fetchData<PokemonSpecies>(obj.species.url).then(
        (res) => (chainLink.species = res)
      )
    );

    promises.push(
      fetchData<PokemonSpecies>(obj.species.url).then((res) => {
        if (res)
          fetchData<Pokemon>(
            res?.varieties.filter((variety) => variety.is_default)[0].pokemon
              .url
          ).then((res) => {
            if (!res) return;
            chainLink.pokemon = res;
            if (res.sprites.front_default)
              promises.push(preloadSprite(res.sprites.front_default));
          });
      })
    );

    const evolutionDetailsPromises: Promise<DetailObject>[] = [];

    obj.evolution_details.map((detail) => {
      evolutionDetailsPromises.push(returnDetailsList(detail));
    });

    const evolvesToPromises: Promise<ChainObject>[] = [];

    if (obj.evolves_to.length > 0) {
      obj.evolves_to.map((child) => {
        evolvesToPromises.push(fetchChainLink(child));
      });
    }
    chainLink.evolution_details = await Promise.all(evolutionDetailsPromises);
    chainLink.evolves_to = await Promise.all(evolvesToPromises);

    return chainLink;
  };

  try {
    const myFetchData = await fetchData<EvolutionChain>(fetchUrl);
    if (!myFetchData?.chain) throw new Error("Invalid data received from API");
    const firstSpecie = await fetchData<PokemonSpecies>(
      myFetchData.chain?.species.url
    );
    if (!firstSpecie) throw new Error("Invalid data received from API");
    fullChain = await fetchChainLink(myFetchData?.chain);
    await Promise.all(promises);
  } catch (error) {
    if (error instanceof Error) console.error("Error: " + error.message);
    return fullChain;
  }

  return fullChain;
}

async function returnDetailsList(details: EvolutionDetail) {
  const relevantDetails: object[] = [];
  const detailsPromises: unknown[] = [];

  async function returnFetchedObject(url: string) {
    const fetchedObject = await fetchData<Item | Move | Location>(url);
    if (
      fetchedObject &&
      "sprites" in fetchedObject &&
      fetchedObject.sprites.default
    ) {
      try {
        await preloadSprite(fetchedObject.sprites.default);
      } catch (error) {
        console.error("Erro: " + error);
      }
    }

    return fetchedObject;
  }

  for (const key in details) {
    const value = details[key as keyof EvolutionDetail];

    if (
      value == null ||
      key == "trigger" ||
      (key == "time_of_day" && value == "") ||
      (key == "needs_overworld_rain" && value == false) ||
      (key == "turn_upside_down" && value == false)
    )
      continue;

    if (key == "known_move" || key == "held_item" || key == "item") {
      const objectUrl = value as NamedAPIResource;
      detailsPromises.push(
        returnFetchedObject(objectUrl.url).then((res) => {
          if (res) relevantDetails.push({ [key]: res });
        })
      );
    } else {
      relevantDetails.push({ [key]: value });
    }
  }

  await Promise.all(detailsPromises);

  return {
    trigger: details.trigger,
    relevantDetails: relevantDetails,
  };
}

export default fetchFullChain;
