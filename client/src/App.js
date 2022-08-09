import './App.css';
import Header from './components/Header';
import CreateNote from "./components/CreateNote";
import Notes from "./components/Notes";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Header/>
      <CreateNote/>
      <Notes/>
      <Footer/>
    </div>
  );
}

export default App;
