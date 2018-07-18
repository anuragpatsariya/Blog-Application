
import React, { Component } from 'react';
//import Modal from 'react-modal';

import SubmitForm from './SubmitForm';
import AllBlogs from './AllBlogs';
import NavBar from './nav_bar';
import WriteBlogModal from './write_blog_modal';
//for Modal
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
//Modal.setAppElement('#root');

class App extends Component {
  constructor(){
    super();

    /*this.state = {
    modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);*/
  }
  /*
  openModal() {
  this.setState({modalIsOpen:true});
  }

  afterOpenModal() {
  //this.subtitle.style.color = '#f00';
  console.log("Modal is open");
  }

  closeModal() {
  this.setState({modalIsOpen:false});
  }*/




  render() {
    return(
      <div>
        <NavBar />
        <WriteBlogModal />
        <AllBlogs />
      </div>
    )
  }
}

export default App;
