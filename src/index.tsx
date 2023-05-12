import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/index';
import App from './App';
import {ModalState} from './context/ModalContext'
import {BrowserRouter} from 'react-router-dom'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ModalState>
        <App />
      </ModalState>
    </BrowserRouter>
  </Provider>
)
