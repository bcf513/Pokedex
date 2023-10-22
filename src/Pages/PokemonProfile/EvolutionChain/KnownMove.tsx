import capitalizeString from "../../../Utils/capitalizeString";
import { Move } from "../../../Interfaces/Pokemon";

export function KnownMove({ move }: { move: Move }) {
  const { name } = move;
  return (
    <>
      <p>Known Move: {capitalizeString(name)}</p>
    </>
  );
}
