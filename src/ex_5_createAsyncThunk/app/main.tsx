import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { router } from './router.tsx';
import { store } from './store.ts';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      {/* <App /> */} {/* (вместо App - роутер) */}
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
