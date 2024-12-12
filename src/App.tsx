import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/Main';
import Login from './components/Login';
import Dog from './components/Dog';
import CreateDog from './components/CreateDog';
import EditDog from "./components/EditDog"; 

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path="/:dogId" element={<Dog/>}></Route>
          <Route path='/create' element={<CreateDog/>}></Route>
          <Route path="/edit/:id" element={<EditDog />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App