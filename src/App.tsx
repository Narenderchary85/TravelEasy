import { Route, Routes } from 'react-router'
import ExperiencesList from './components/ExperienceList'
import ExperienceDetailsPage from './components/ExperienceDetailsPage'
import Checkoutpage from './components/Checkoutpage'
import SuccessPage from './components/SuccessPage'

function App() {

  return (
    <div>
      <Routes>
          <Route path='/' element={<ExperiencesList/>}/>
          <Route path="/experience/:id" element={<ExperienceDetailsPage />} />
          <Route path="/checkout" element={<Checkoutpage />} />
          <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </div>
  )
}

export default App
