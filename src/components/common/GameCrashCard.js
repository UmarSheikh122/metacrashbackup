import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import roulette_thumb from '../../assets/images/roulette_thumb.png';

function GameCrashCard() {
  return (
    <Card className='text-center'>
      <Card.Img variant="top" src={roulette_thumb} />
      <Card.Body>
         <h5>Crash Game</h5>
         <p>avatarux</p>
        <Link className='btn play' to="/gamecrash">Play Now</Link>
      </Card.Body>
    </Card>
  );
}

export default GameCrashCard;