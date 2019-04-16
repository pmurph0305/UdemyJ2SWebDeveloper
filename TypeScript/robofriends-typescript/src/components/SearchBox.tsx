import * as React from 'react';

interface ISearchBoxProps {
  searchChange: (ev: React.FormEvent<HTMLInputElement>) => void;
}

const SearchBox = ({ searchChange }:ISearchBoxProps) : React.ReactElement<{}> => {
  return (
    <div className='pa2'>
      <input
        className='pa3 ba b--green bg-lightest-blue'
        type='search'
        placeholder='search robots'
        onChange={searchChange}
      />
    </div>
  );
};

export default SearchBox;