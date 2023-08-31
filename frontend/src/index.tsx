import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import store from '@src/reducers/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
let persistor = persistStore(store);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null}  persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);


