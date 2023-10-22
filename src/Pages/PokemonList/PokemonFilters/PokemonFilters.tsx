import { useEffect, useState } from "react";
import capitalizeString from "../../../Utils/capitalizeString";
import { Tfilter } from "../PokemonList";
import "./PokemonFilters.modules.css";

const types = [
  "normal",
  "fire",
  "fighting",
  "water",
  "flying",
  "grass",
  "poison",
  "electric",
  "ground",
  "psychic",
  "rock",
  "ice",
  "bug",
  "dragon",
  "ghost",
  "dark",
  "steel",
  "fairy",
];

function PokemonFilters({
  filters,
  setFilters,
}: {
  filters: Tfilter;
  setFilters: React.Dispatch<React.SetStateAction<Tfilter>>;
}) {
  const [selectedItens, setSelectedItens] = useState<string[]>(filters.types);
  const [showOnlyOfSelectedTypesOption, setshowOnlyOfSelectedTypesOption] =
    useState(filters.typesOptions.showOnlyOfSelectedTypes);
  const [showOnlyOfExactTypesOption, setshowOnlyOfExactTypesOption] = useState(
    filters.typesOptions.showOnlyOfExactTypes
  );

  useEffect(() => {
    return () => {
      setFilters({
        types: [...selectedItens],
        typesOptions: {
          showOnlyOfSelectedTypes: showOnlyOfSelectedTypesOption,
          showOnlyOfExactTypes: showOnlyOfExactTypesOption,
        },
      });
    };
  }, [
    showOnlyOfExactTypesOption,
    showOnlyOfSelectedTypesOption,
    selectedItens,
    setFilters,
  ]);

  useEffect(() => {
    const typesToFilter = selectedItens;
    function removePreviousTypes() {
      if (typesToFilter.length > 2) {
        typesToFilter.shift();
        removePreviousTypes();
      }
    }
    if (showOnlyOfExactTypesOption) {
      setshowOnlyOfSelectedTypesOption(true);
      removePreviousTypes();
      setSelectedItens(typesToFilter);
    }
  }, [selectedItens, showOnlyOfExactTypesOption]);

  const toggleItem = (itemId: string) => {
    if (selectedItens.includes(itemId)) {
      setSelectedItens(selectedItens.filter((item) => item !== itemId));
    } else {
      setSelectedItens([...selectedItens, itemId]);
    }
  };

  return (
    <div id="filters-modal">
      <div id="clear-and-options">
        <button onClick={() => setSelectedItens([])}>Clear</button>
        <div id="filters-options" className="container">
          <div className="filter-option">
            <input
              id="showOnlyOfSelectedTypesOption"
              type="checkbox"
              checked={showOnlyOfSelectedTypesOption}
              onChange={() =>
                setshowOnlyOfSelectedTypesOption(!showOnlyOfSelectedTypesOption)
              }
            ></input>
            <label htmlFor="showOnlyOfSelectedTypesOption">
              Show only of selected types
            </label>
          </div>
          <div className="filter-option">
            <input
              id="showOnlyOfExactTypesOption"
              type="checkbox"
              checked={showOnlyOfExactTypesOption}
              onChange={() =>
                setshowOnlyOfExactTypesOption(!showOnlyOfExactTypesOption)
              }
            ></input>
            <label htmlFor="showOnlyOfExactTypesOption">
              Show only of exact types
            </label>
          </div>
        </div>
      </div>
      <ul className="types-grid container">
        {types.map((type, index) => (
          <li
            onClick={() => toggleItem(type)}
            key={index}
            className={`type ${type} ${
              selectedItens.includes(type) ? "selected" : ""
            }`}
          >
            <p>{capitalizeString(type)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PokemonFilters;
