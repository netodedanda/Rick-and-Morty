import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Badge } from 'react-bootstrap';

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
  location: {
    name: string;
  };
}

const CharacterCard: React.FC<{ character: Character }> = ({ character }) => {
  return (
    <div className="col-md-4 mb-4">
      <Link className="text-decoration-none" to={`/character/${character.id}`}>
        <Card>
          <Card.Img variant="top" src={character.image} />
          <Card.Body>
            <Card.Title>{character.name}</Card.Title>
            <Card.Text>Status: {character.status}</Card.Text>
            <Card.Text>Species: {character.species}</Card.Text>
            <Card.Text>
              <span className="text-secondary">Last known location:</span> {character.location.name}
            </Card.Text>
            <Badge bg={character.status === "Alive" ? "success" : "danger"}>
              {character.status}
            </Badge>
          </Card.Body>
        </Card>
      </Link>
    </div>
  );
};

export default CharacterCard;
