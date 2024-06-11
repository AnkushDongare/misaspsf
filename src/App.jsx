import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import EntryForm from './components/misasps/EntryForm'
import Instructions from './components/misasps/Instructions'
import AISTest from './components/misasps/AISTest'
import SuccessfulSubmit from './components/misasps/SuccessfulSubmit'
import ResultList from './components/misasps/ResultList'
import Result from './components/misasps/Result'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/entry/:id' element={<EntryForm />} />
        <Route path='/instructions/:id' element={<Instructions />} />
        <Route path='/test/:language/:id' element={<AISTest />} />
        <Route path='/successful-submit/:id' element={<SuccessfulSubmit />} />

        <Route path='/result' element={<ResultList />} />
        <Route path='/result/:id' element={<Result />} />
      </Routes>
    </Router>
  )
}

export default App
