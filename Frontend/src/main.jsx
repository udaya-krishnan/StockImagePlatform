import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configStore from './redux/store.js';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

createRoot(document.getElementById('root')).render(
  <Provider store={configStore}>
    <BrowserRouter>
      <StrictMode>
        <DndProvider backend={HTML5Backend}>
          <App />
        </DndProvider>
      </StrictMode>
    </BrowserRouter>
  </Provider>
);
