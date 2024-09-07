import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Hero from './Components/Hero/Hero';
import Programs from './Components/Programs/Programs';
import Title from './Components/Title/Title';
import About from './Components/About/About';
import Product from './Components/Product/Product';
import Contact from './Components/Contact/Contact';
import Footer from './Components/Footer/Footer';
import './App.css'
import './custom-toastr.css';

function App() {
  return (
    <div >
      <Navbar/>
      <Hero/>
      <div className='container'>
        <Title subTitle='' title='What We Offer'/>
        <Programs/>
        <About/>
        <Title subTitle='Product' title='Popular Items'/>
        <Product/>
        <Title subTitle='Contact Us' title='Get In Touch'/>
        <Contact/>
        <Footer/>
      </div>
    </div>
  );
}

export default App;
