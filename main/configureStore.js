import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import app from './reducers';
import { helpers } from './helpers/storage';

export default function configureStore() {
    return createStore(app, applyMiddleware(thunk));
}
