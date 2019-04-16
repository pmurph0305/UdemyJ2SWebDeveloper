import * as React from 'react';

interface ICardProps {
  name: string;
  email: string;
  id: number;
}

// I typed the props through the interface.
// In the solution, Card was typed through React.SFC

const Card: React.SFC<ICardProps> = ({ name, email, id }) => {
  return (
    <div className='tc grow bg-light-green br3 pa3 ma2 dib bw2 shadow-5'>
      <img alt='robots' src={`https://robohash.org/${id}?200x200`} />
      <div>
        <h2>{name}</h2>
        <p>{email}</p>
      </div>
    </div>
  );
};

export default Card;