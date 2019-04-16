import * as React from 'react';

interface IScrollProps {
  children: object
}

const Scroll = (props:IScrollProps): React.ReactElement<{}> => {
  return (
    <div style={{ overflow: 'scroll', border: '5px solid black', height: '800px'}}>
      {props.children}
    </div>
  );
};

export default Scroll;