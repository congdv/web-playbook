import logo from './logo.svg';
import './App.css';
import { AsyncButton } from './components/AsyncButton';
import {useState} from 'react';

function App() {

  const [imageUrl,setUrl] = useState(null);
  const handleClick = () => {
    console.log("click");
    return new Promise(resolve => setTimeout(resolve, 3000))
  }

  const handleFetchImage = () => {
    return new Promise((resolve, reject) => {
      return fetch("https://dog.ceo/api/breeds/image/random").then((data) => data.json()).then((data) => {console.log(data); setUrl(data.message); resolve();}).catch((error) => reject(error))
      // try {
      //   const data = await fetch("https://dog.ceo/api/breeds/image/random");
        
      //   console.log(data.json());
      //   resolve(data);
      // } catch (error) {
      //   reject(error)
      // }

    })
  }
  return (
    <div className="App">
      <AsyncButton onClick={handleFetchImage} loadingNode={'Doing stuff...'}>Click me</AsyncButton>
      <img src={imageUrl}/>
    </div>
  );
}

export default App;
