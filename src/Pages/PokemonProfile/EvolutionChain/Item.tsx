import capitalizeString from "../../../Utils/capitalizeString";
import { Item as TItem } from "../../../Interfaces/Pokemon";

export function Item({ item }: { item: TItem }) {
  const { name, sprites } = item;
  return (
    <>
      {sprites.default && <img src={sprites.default} alt="" />}
      <p>{capitalizeString(name)}</p>
    </>
  );
}
