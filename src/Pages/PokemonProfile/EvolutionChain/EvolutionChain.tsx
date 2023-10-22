import { ChainObject } from "../fetchChain";
import "./EvolutionChain.modules.css";
import SingleChain from "./SingleChain";

function EvolutionChainTeste({ chain }: { chain: ChainObject }) {
  return (
    <div id="evolution-chain" className="container">
      {<SingleChain chain={chain} />}
    </div>
  );
}

export default EvolutionChainTeste;
