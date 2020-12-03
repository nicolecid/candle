import React from 'react';
import './App.css';
import logo from './logo.png';
import FilteredList from './filteredlist.jsx';
import {useState} from 'react';



function App() {
  const [cart, setCart] = useState([]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a data-scroll href="#full">
          <div class="arrow"></div>
        </a>
      </header>
      <div className='App-elements' id='full'>
        <FilteredList cart={cart} setCart={setCart}></FilteredList>
      </div>
      <footer>
        <br></br>
        <br></br>
        <br></br>
      </footer>
    </div>
  )

}
export default App;
