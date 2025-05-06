import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createHashRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Customers from './pages/Customers.jsx'
import Trainings from './pages/Trainings.jsx'
import Calendar from './pages/Calendar.jsx'
import { RouterProvider } from 'react-router-dom'


const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/customers',
        element: <Customers />,
      },
      {
        path: '/trainings',
        element: <Trainings />,
      },
      {
        path: '/calendar',
        element: <Calendar />,
      },
    ],
  },
])



createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
