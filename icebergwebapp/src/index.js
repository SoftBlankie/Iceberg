import { ThemeProvider } from '@material-ui/core';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import Root from './components/Root';
import './index.css';
import rootReducer from './reducers';
import * as serviceWorker from './serviceWorker';
import theme from './theme';

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Root store={store} />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
