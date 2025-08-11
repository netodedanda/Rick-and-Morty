import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Alterando a importação

import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from './components/Navbar';
import HomePage from './pages/Home';
import CharactersPage from './pages/CharactersPerson';
import EpisodesPage from './pages/Episodios';
import LocationsPage from './pages/LocationsPage';
import CharacterDetailPage from './pages/DetalhesPerson';
import EpisodeDetailPage from './pages/DetalheEpisodio';
import LocationDetailPage from './pages/LocationsDetailPage';


const App: React.FC = () => {
  return (
    <Router>
      <div>
      <Navbar />
        <Routes> {/* Alterando de Switch para Routes */}
          <Route path="/" element={<HomePage />} /> {/* Alterando de component para element */}
          <Route path="/characters" element={<CharactersPage />} /> {/* Alterando de component para element */}
          <Route path="/character/:id" Component={CharacterDetailPage} /> {/* Rota para detalhes do personagem */}
          <Route path="/episodes" element={<EpisodesPage />} /> {/* Alterando de component para element */}
          <Route path="/episode/:id" Component={EpisodeDetailPage} /> {/* Rota para detalhes do episódio */}
          <Route path="/locations" element={<LocationsPage />} /> {/* Alterando de component para element */}
          <Route path="/location/:id" Component={LocationDetailPage} />
        </Routes> {/* Alterando de Switch para Routes */}
      </div>
    </Router>
  );
};

export default App;
