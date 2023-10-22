import capitalizeString from "../../../Utils/capitalizeString";
import { Item } from "./Item";
import { Location } from "./Location";
import "./EvolutionChain.modules.css";
import { KnownMove } from "./KnownMove";
import { DetailObject } from "../fetchChain";
import { NamedAPIResource } from "../../../Interfaces/Common";

export function Detail({ detail }: { detail: DetailObject }) {
  return (
    <div className="detail">
      <p>{capitalizeString(detail.trigger.name)}</p>
      {detail.relevantDetails.map((value, index) => {
        return (
          <div className="detail-specifications" key={index}>
            {Object.entries(value).map(([key, keyValue]) => {
              if (key == "item") return <Item key={key} item={keyValue}></Item>;
              if (key == "held_item")
                return <Item key={key} item={keyValue}></Item>;
              if (key == "known_move")
                return <KnownMove key={key} move={keyValue}></KnownMove>;
              if (key == "known_move_type") {
                const actualKeyValue = keyValue as NamedAPIResource;
                return <p key={key}>{actualKeyValue.name}</p>;
              }
              if (key == "location")
                return <Location key={key} location={keyValue}></Location>;
              if (key == "gender")
                return (
                  <p key={key}>
                    {`${capitalizeString(key)}: ${
                      keyValue == 2 ? "Male" : "Female"
                    }`}
                  </p>
                );
              return (
                <p key={key}>{`${capitalizeString(key)}: ${
                  typeof keyValue == "string"
                    ? capitalizeString(keyValue)
                    : keyValue
                }`}</p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
