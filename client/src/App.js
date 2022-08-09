import './App.css';
import Header from './components/Header';
import CreateNote from "./components/CreateNote";
import Notes from "./components/Notes";

function App() {
  return (
    <div className="App">
      <Header/>
      <CreateNote/>
      <Notes/>
    </div>
  );
}

export default App;
