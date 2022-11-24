import logo from './logo.svg';
import './App.css';
import Button from './components/button';
import Sidebar from './components/sidebar';

function App() {
  const onHandlerClick = () => {
    alert('Hello World');
  }
  return (
    <div className="App">
      <Sidebar>
        <h2>Item List</h2>
      </Sidebar>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Button text='Click me' onHandlerClick={onHandlerClick}/>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
