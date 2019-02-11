import { createStore, applyMiddleware } from 'redux';
import app from './kioskReducer';
import thunk from 'redux-thunk';

export default function storeConfig() {
    let store = createStore(app, applyMiddleware(thunk))
    return store
}
