import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import './App.css'

import Home from './pages/Home';
// import Detail from './pages/Detail';
import NoMatch from './pages/NoMatch';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import Success from './pages/Success';
// import OrderHistory from './pages/OrderHistory';
import App from './App.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    error: <NoMatch />,
    children: [
      {
        index: true,
        element: <Home />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
