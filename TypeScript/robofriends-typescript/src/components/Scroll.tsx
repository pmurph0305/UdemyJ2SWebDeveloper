import * as React from 'react';

// interface IScrollProps {
//   children: object
// }

type Props = {
  children?: JSX.Element;
}

const Scroll = (props:Props) => {
  return (
    <div style={{ overflow: 'scroll', border: '5px solid black', height: '800px'}}>
      {props.children}
    </div>
  );
};

export default Scroll;