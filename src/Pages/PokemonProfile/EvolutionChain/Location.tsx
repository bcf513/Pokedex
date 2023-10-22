import capitalizeString from "../../../Utils/capitalizeString";
import { Location as TLocation } from "../../../Interfaces/Pokemon";

export function Location({ location }: { location: TLocation }) {
  const { name } = location;
  return (
    <>
      <p>Location: {capitalizeString(name)}</p>
    </>
  );
}
