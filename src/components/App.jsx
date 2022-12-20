import { Component } from 'react';

import SearchBar from './SearchBar';

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
    </div>
  );
    }
};

export default App;