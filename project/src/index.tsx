import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {App, ErrorMessage} from './components';
import {store} from './store';
import { loadFilm, checkAuthStatus } from './store/action';
import REVIEWS from './mocks/review';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

store.dispatch(loadFilm());
store.dispatch(checkAuthStatus());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App reviews={REVIEWS}/>
      <ErrorMessage/>
    </Provider>
  </React.StrictMode>,
);
