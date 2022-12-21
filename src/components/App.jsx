import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import getImages from './services/api';

import SearchBar from './SearchBar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';

class App extends Component {
  state = {
    images: [],
    name: '',
    page: 1,
    totalPages: null,
    isLoading: false,
    isloadMore: false,
    error: null,
  }

  handleSearchBar = searchName => {
    this.setState(() => ({ 
      name: searchName,
      images: [],
      page: 1,
     }));
  };

  async componentDidUpdate(_, prevState) {
    if (
      prevState.name !== this.state.name ||
      prevState.page !== this.state.page
    ) {
      try {
        this.setState({
          isLoading: true,
          error: null,
          isloadMore: true,
        });
        const searchImages = await getImages(
          this.state.name,
          this.state.page
				);
				const newImages = searchImages.map(searchImage=>({ id: searchImage.id, tags: searchImage.tags, smallImg: searchImage.webformatURL, bigImg: searchImage.largeImageURL }));
				this.setState(prevState => ({
          images: [...prevState.images, ...newImages],
        }));
        if (searchImages.length !== 12) {
          this.setState.apply({ isloadMore: false });
        }
      } catch {
        this.setState({
          error: 'Щось пішло не так, спробуйте ще раз!',
        });
      } finally {
        this.setState({ isLoading: false });
      }
    }
    if (this.state.page > 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      })
    }
  }


  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleOpenModal = image => {
    this.setState({ currentImage: image });
  };

  render() {
    const vewLoadMoreButton = this.state.images.length > 0 && this.state.page < this.state.totalPages && !this.state.isloadMore;
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
      {this.state.isLoading && <Loader />}
      {vewLoadMoreButton && <Button onClick={this.loadMore} />}
    </div>
  );
    }
};

export default App;