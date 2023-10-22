import { useState } from "react";
import "./App.css";
import PokemonList from "./Pages/PokemonList/PokemonList";
import Modal from "./Components/Modal/Modal";

function App() {
  const [initialModalOpen, setinitialModalOpen] = useState(true);
  return (
    <main>
      <PokemonList />
      {initialModalOpen && (
        <Modal onClose={() => setinitialModalOpen(false)}>
          <div className="modal-window initial-modal">
            <h1>Warning!</h1>
            <div className="container">
              <p>
                This site pulls pokemon data directly from{" "}
                <a href="https://pokeapi.co/">PokeAPI</a>, so keep that in mind
                if you see something incorrect (but you can also warn me, of
                course).
              </p>
              <p>
                New features are coming! If you have any suggestions feel free
                to
                <a href="https://bcf513.vercel.app/"> contact me!</a>
              </p>
            </div>
          </div>
        </Modal>
      )}
    </main>
  );
}

export default App;
