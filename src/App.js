import {Routes , Route} from 'react-router';
import DisplayPicture from './Components/DisplayPicture';
import Bio from './Components/Bio';
import Footer from './Components/Footer';
import "./Styles/App.css";
import Body from './Components/Body';
import Home from './Components/Home';
import AddLink from './Components/AddLink';




function App() {
  return (
    <Routes>
        <Route exact path='/' element={<Home/>}></Route>
        <Route exact path='/links/:id'  element={<Body/>}></Route>
        <Route exact path ='/AddLinks/:id' element={<AddLink />}></Route>
    </Routes>
  );
}

export default App;

