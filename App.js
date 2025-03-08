import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import { Row,Col, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch as faSearch} from '@fortawesome/free-solid-svg-icons';
import web from "./image/WhatsApp Image 2025-02-28 at 3.37.10 AM.jpeg"
import about from "./image/WhatsApp Image 2025-02-28 at 3.23.00 AM (1).jpeg"



function App() {
  let displaydata=()=>{
    alert("WELCOME TO STUDENT")
  }
  let adddata=(a,b)=>{
console.log(a+b)
  }
  return (
  <div className="App">
    <img width={550} height={850}src={web}/>
    <img width={150} src={about}/>
    <button onClick={displaydata}>Login</button><br></br>
    <button onClick={()=>adddata(2,5)} >Add data</button>


    
        <Header>
             <h1>welcome header</h1>
             <FontAwesomeIcon icon={faSearch}/>
         </Header>
      <Container fluid>
         <Row>

         </Row>
    </Container>        
      <Footer/>
      
 </div>
  );
}

export default App;
