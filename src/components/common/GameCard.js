import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import roulette_thumb from '../../assets/images/roulette_thumb.png';

function GameCard() {
  return (
    <Card className='text-center'>
      <Card.Img variant="top" src={roulette_thumb} />
      <Card.Body>
         <h5>Slot Game</h5>
         <p>avatarux</p>
        <Link className='btn play' to="/game">Play Now</Link>
      </Card.Body>
    </Card>
  );
}

export default GameCard;