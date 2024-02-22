
import React from 'react';
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer';


function About() {
  return (
    <>
    <Navbar/>
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h2 className="text-center mb-4">About Us</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus nisi at justo varius ultrices.
            Sed sit amet ullamcorper velit, eget ultrices libero. Nulla facilisi. Cras congue euismod ligula vel
            porttitor. Sed in fermentum eros, vel tempus sapien. Mauris id scelerisque nunc. Proin tristique nulla
            sit amet mi bibendum varius. Vivamus vehicula pulvinar magna vel commodo.
          </p>
          <p>
            Aenean ac consequat odio. Vivamus nec purus a odio hendrerit lobortis. Nulla facilisi. In hac habitasse
            platea dictumst. Cras porttitor mauris sit amet tortor volutpat, non mattis turpis condimentum.
            Integer maximus tincidunt sollicitudin. Vestibulum tempor urna in turpis commodo, vel auctor nisi cursus.
          </p>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default About;
