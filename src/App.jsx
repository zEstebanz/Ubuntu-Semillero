import { RouterProvider } from 'react-router-dom'
import './assets/styles/App.scss'
import router from './routes'

function App() {
  return (<RouterProvider router={router}/>)
}

export default App