import './App.css';
import Clock from './Clock.js';

function App() {
  return (
    <div className="App">
      <h1>25 + 5 Clock</h1>
      <Clock />
      <div className="footer">
        <p>by <a id="author-link" href="https://github.com/JayX97" target="_blank">JayX97</a></p>
      </div>
    </div>
  );
}

export default App;
