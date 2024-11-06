
import {Route, Routes} from 'react-router-dom'
import LoginPage from '../src/pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'

function App() {

  return (
    <>
     <Routes>
      <Route path='/' element={<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
     </Routes>
    </>
  )
}

export default App
