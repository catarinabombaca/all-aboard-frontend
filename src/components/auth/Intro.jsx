import React, { Component } from 'react';
import intro from './intro-image.svg';
 
class Intro extends Component {
 
  render(){
    return (
      <div className='container-fluid d-flex h-100 flex-column'>
        <div className='row flex-grow-1'>
          <div className='col-sm d-flex flex-column justify-content-start align-items-center'>
            <h2 className='Big-top-margin text-white text-lg-start fs-1 fw-bold mx-5'>Employee onboarding has never been easier.</h2>
            <p className='text-white text-lg-start mx-5 my-4'>Transform your team onboarding process by creating <b>highly-customizable and flexible paths</b>. 
            Include courses, ramp up projects and track progress.</p>
            <button className='btn-red btn btn-primary btn-lg rounded-pill align-self-lg-start mx-5 px-4'>Get started!</button>
          </div>
          <div className='col-sm'>
            <img className='intro-img' alt='intro' src={intro}/>
          </div>
        </div>
      </div>
    )
  }
}
 
export default Intro;