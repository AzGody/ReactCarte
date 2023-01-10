import logo from './logo.svg';
import './App.css';
import MyComponent from './API.js'


function App() {
  
  return (
    <div>
      <div class="header">
        <h1>Projet React</h1>
        {/* <p>My supercool header</p> */}
      </div>
      
        <MyComponent />
      
    </div>
  );
}

export default App;
