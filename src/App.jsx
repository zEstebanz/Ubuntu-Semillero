import { RouterProvider } from 'react-router-dom'
import './assets/styles/App.scss'
import router from './routes'
import { useSession } from './hooks/useSession'

function App() {

  useSession();
  
  return (<RouterProvider router={router}/>)
}

export default App