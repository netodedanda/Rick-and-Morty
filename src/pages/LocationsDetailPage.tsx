// Arquivo: src/pages/LocationDetailPage.tsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BackButton from '../components/BackButton';
import ResidentsList from '../components/location/ResidentsList';

interface Location {
  id: number;
  name: string;
}

const LocationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [location, setLocation] = useState<any>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/location/${id}`);
        setLocation(response.data);
      } catch (error) {
        console.error('Erro ao buscar localização:', error);
      }
    };

    fetchLocation();
  }, [id]);

  if (!location) {
    return <div>Carregando...</div>;
  }

  return (
    <div className='container'>
        <BackButton />
      <h1>{location.name}</h1>
      <p>Tipo: {location.type}</p>
      <p>Dimensão: {location.dimension}</p>
      
      <ResidentsList locationId={location.id} /> {/* Passa o ID da localização */}
    </div>
  );
};

export default LocationDetailPage;
