// Arquivo: src/components/ResidentsList.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Resident {
  id: number;
  name: string;
}

interface ResidentsListProps {
  locationId: number;
}

const ResidentsList: React.FC<ResidentsListProps> = ({ locationId }) => {
  const [residents, setResidents] = useState<Resident[]>([]);

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/location/${locationId}`);
        const residentURLs: string[] = response.data.residents;

        const residentIds = residentURLs.map((url: string) => {
          const parts = url.split('/');
          return parseInt(parts[parts.length - 1]);
        });

        
        
  
        const residentsData = await Promise.all(
          residentIds.map((id: number) => axios.get(`https://rickandmortyapi.com/api/character/${id}`))
        );


        const residentsInfo = residentsData.map((resident: any) => resident.data);

        setResidents(residentsInfo);
      } catch (error) {
        console.error('Erro ao buscar residentes da localização:', error);
      }
    };

    fetchResidents();
  }, [locationId]);

  return (
    <div>
      <h2>Residentes da Localização</h2>
      {residents.length > 0 ? (
        <ul>
          {residents.map((resident) => (
            <li key={resident.id}>
              <Link to={`/character/${resident.id}`}>{resident.name}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum residente encontrado para esta localização.</p>
      )}
    </div>
  );
};

export default ResidentsList;
