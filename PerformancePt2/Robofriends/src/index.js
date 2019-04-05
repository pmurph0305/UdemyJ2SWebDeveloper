import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import 'tachyons';
import { searchRobotsReducer, requestRobotsReducer } from './reducers';

const logger = createLogger();

const rootReducer = combineReducers({searchRobotsReducer, requestRobotsReducer});

const store = createStore(rootReducer, 
                applyMiddleware(thunkMiddleware));

ReactDOM.render(<Provider store={store}>
                    <App/>
                </Provider>,
                document.getElementById('root'));
registerServiceWorker();

