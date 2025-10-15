import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
// import App from './App.tsx'
import { store } from './store.ts'
import { fetchUsers } from './modules/users/model/fetch-users.ts'
import { RouterProvider } from 'react-router-dom'
import { router } from './router.tsx'

// fetchUsers(store.dispatch, store.getState); 
store.dispatch(fetchUsers()); /* (миддлвер thunk позволяет диспатчить функции) */

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      {/* <App /> */}
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
