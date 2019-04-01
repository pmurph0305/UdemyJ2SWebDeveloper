import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import 'tachyons';
import { searchRobotsReducer } from './reducers';

const logger = createLogger();

const store = createStore(searchRobotsReducer, applyMiddleware(logger));

ReactDOM.render(<Provider store={store}>
                    <App/>
                </Provider>,
                document.getElementById('root'));
registerServiceWorker();

