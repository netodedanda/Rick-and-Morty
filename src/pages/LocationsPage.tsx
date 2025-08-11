// Arquivo: src/pages/LocationsPage.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LocationsPage: React.FC = () => {
  const [locations, setLocations] = useState<any[]>([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get('https://rickandmortyapi.com/api/location');
        setLocations(response.data.results);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);

  return (
    <div className='container'>
      <h1>Página de Localizações</h1>
      <ul>
        {locations.map((location: any) => (
          <li key={location.id}>
            <Link to={`/location/${location.id}`}> {/* Link para os detalhes da localização */}
              <h3>{location.name}</h3>
            </Link>
            <p>Type: {location.type}</p>
            <p>Dimension: {location.dimension}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocationsPage;
