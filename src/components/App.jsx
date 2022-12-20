import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SearchBar from './SearchBar';
import ImageGallery from './ImageGallery';

class App extends Component {
  state = {
    images: [],
  }

  handleSearchBar = img => {
    this.setState({
      images: [img],
      
    });
  };

  render() {
  return (
    <div
      // style={{
      //   height: '100vh',
      //   display: 'flex',
      //   justifyContent: 'center',
      //   alignItems: 'center',
      //   fontSize: 40,
      //   color: '#010101'
      // }}
    >
      <SearchBar onSubmit={this.handleSearchBar}/>
      <ImageGallery images={this.state.images} onModal={this.handleOpenModal} />
      <ToastContainer autoClose={2000} />
    </div>
  );
    }
};

export default App;