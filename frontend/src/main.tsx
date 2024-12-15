import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Products from './comps/Products.tsx'
import { AppProvider } from './contexts/AppContext.tsx'
import Cart from './comps/Cart.tsx'
import Login from './comps/Login.tsx'
import Register from './comps/Register.tsx'
import Profile from './comps/Profile.tsx'

const router = createBrowserRouter([
  {
    path: "/products",
    element: <Products/>
  },
  {
    path: "/cart",
    element: <Cart/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/register",
    element: <Register/>
  },
  {
    path: "/profile",
    element: <Profile/>
  }
])
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router}/>
    </AppProvider>
    
  </StrictMode>,
)
