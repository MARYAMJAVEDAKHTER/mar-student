import './App.css';
import Footer from './Footer';
import 'react-notifications/lib/notifications.css';
import Navbar from './component/Navbar';
import Features from './component/Features';
import Hero from './component/Hero';
import './index.css'
import Home from './Home';

function App() {
  return ( 
  <div className="App">
     <Home />
      <Navbar/>
      <Hero/>
      <Features/>
      <Footer/>
  </div>
  );
}

export default App;
