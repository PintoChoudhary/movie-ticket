import React from 'react'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'


function ErrorPage() {
  return (
    <>
    <Navbar/>
    <div className="container">
        <div style={{backgroundColor : '#fff' , borderRadius : '10px' , marginTop : '100px' , padding : '40px'}}>
            <h2>404</h2>
            <p>Oops !!!! Something Went Wrong </p>
        </div>
    </div>
    <Footer/>
    </>
  )
}

export default ErrorPage