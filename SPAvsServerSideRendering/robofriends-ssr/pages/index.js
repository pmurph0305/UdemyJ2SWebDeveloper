import React from 'react';
import ReactDOM from 'react-dom';
import App from './app'
// When you hit the Back button, it navigates the page to the
// index page entirely via the client; next/link does all the
// location.history handling for you.
//You don't need to write even a single line of client-side routing code.
const Index = () => {
  return (
    <div>
      <link href='/static/styles.css' rel='stylesheet'></link>
      <link rel="stylesheet" href="https://unpkg.com/tachyons@4.10.0/css/tachyons.min.css"/>
      <App/>
    </div>
    
  );
}

export default Index;