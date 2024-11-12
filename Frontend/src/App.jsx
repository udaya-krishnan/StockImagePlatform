
import {Route, Routes} from 'react-router-dom'
import LoginPage from '../src/pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import HomePage from './pages/HomePage'
import Middieware from '../src/components/middieware'
import ForgotPage from './pages/auth/ForgotPage'

function App() {

  return (
    <>
     <Routes>
      <Route path='/' element={<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
      <Route path='/forgot' element={<ForgotPage/>}/>
      <Route path='/home' element={<Middieware><HomePage/></Middieware>}/>
     </Routes>
    </>
  )
}

export default App
