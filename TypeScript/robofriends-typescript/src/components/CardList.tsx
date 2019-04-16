import * as React from 'react';
import Card from './Card';
import { IRobot } from '../containers/App'

// type declared in solution without interface.
// interface ICardListProps {
//   robots: Array<IRobot>
// }

const CardList = ({ robots }: {robots: Array<IRobot>}): React.ReactElement<{}> => {
  return (
    <div>
      {
        robots.map((user, i) => {
          return (
            <Card
              key={i}
              id={robots[i].id}
              name={robots[i].name}
              email={robots[i].email}
              />
          );
        })
      }
    </div>
  );
}

export default CardList;