import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Provider } from 'jotai';
import { store } from './store';

import './index.css';
import { App } from './App';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
