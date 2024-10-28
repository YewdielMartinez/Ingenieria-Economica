import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import { Home } from './pages/index.ts'
import { CompoundInterest, SimpleInterest,PaybackPeriod, VPN, VAE,TIR} from './components/index.ts'

const router = createBrowserRouter ([
  {
    path: '/',
    element: <Home/>
  },
  {
    path: 'interes-simple',
    element: <SimpleInterest/>
  },
  {
    path: 'interes-compuesto',
    element:<CompoundInterest/>
  },
  {
    path: 'periodo-recuperacion',
    element:<PaybackPeriod/>
  },
  {
    path: 'VPN',
    element:<VPN/>
  },
  {
    path: 'VAE',
    element: <VAE/>
  },
  {
    path: 'TIR',
    element:<TIR/>
  }

]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router}/>
)
