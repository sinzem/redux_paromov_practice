import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.tsx'
import { store } from './store.ts'
import { fetchUsers } from './modules/users/model/fetch-users.ts'

fetchUsers(store.dispatch, store.getState); /* (логика изменения состояний соответственно состоянию запроса вынесена из компонента в отдельную функцию - теперь можно использовать в любом месте приложения) */

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
