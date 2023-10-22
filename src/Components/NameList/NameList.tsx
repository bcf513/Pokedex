import { useRef, useEffect } from "react";
import { Pokemon } from "../../Interfaces/Pokemon";
import capitalizeString from "../../Utils/capitalizeString";
import "./NameList.modules.css";

function NameList({
  handleNameListRef,
  list,
  selectedPokemon,
  fetchNext,
  filteredList,
}: {
  handleNameListRef: (node: HTMLUListElement | null) => void;
  list: Pokemon[] | null;
  selectedPokemon: (pokemon: Pokemon) => void;
  fetchNext: () => void;
  filteredList: boolean;
}) {
  const fetchNextRef = useRef(fetchNext);
  useEffect(() => {
    fetchNextRef.current = fetchNext;
  }, [fetchNext]);
  const effectRan = useRef(false);
  const containerRef = useRef<HTMLUListElement | null>(null);

  const lastElementRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (!effectRan.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              fetchNextRef.current();
            }
          });
        },
        {
          root: containerRef.current,
          rootMargin: "300px",
        }
      );

      if (lastElementRef.current) observer.observe(lastElementRef.current);

      return () => {
        observer.disconnect();
      };
    }

    return () => {
      effectRan.current = true;
    };
  }, [filteredList]);

  useEffect(() => {
    handleNameListRef(containerRef.current);
  }, [handleNameListRef]);

  return (
    <ul id="pokemon-list" ref={containerRef}>
      {list &&
        list.map((pokemon, index) => {
          return (
            <li
              key={index}
              className="pokemon-list-item"
              onClick={() => selectedPokemon(pokemon)}
            >
              <p className="pokemon-id">
                {pokemon.id.toString().padStart(4, "0")}
              </p>
              <p className="pokemon-name">
                {capitalizeString(pokemon.species.name)}
              </p>
            </li>
          );
        })}
      {!filteredList && <li ref={lastElementRef}></li>}
    </ul>
  );
}

export default NameList;
