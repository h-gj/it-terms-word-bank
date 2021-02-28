import logo from './logo.svg';
import './App.css';
import Card from './components/Card'
import React from 'react'
import axios from 'axios'
// import PrimarySearchAppBar from './components/SearchBar'
import Pagination from "react-js-pagination";
// import "bootstrap/less/bootstrap.less";



function debounce(method, wait, immediate) {
  let timeout
  let result
  let debounced = function(...args) {
    return new Promise(resolve => {
      let context = this
      if (timeout) {
        clearTimeout(timeout)
      }
      if (immediate) {
        let callNow = !timeout
        timeout = setTimeout(() => {
          timeout = null
        }, wait)
        if (callNow) {
          result = method.apply(context, args)
          resolve(result)
        }
      } else {
        timeout = setTimeout(() => {
          result = method.apply(context, args)
          resolve(result)
        }, wait)
      }
    })
  }
  debounced.cancel = function() {
    clearTimeout(timeout)
    timeout = null
  }
  return debounced
}


class App extends React.Component {
  constructor () {
    super();
    this.state = {
      'terms': [],
      activePage: 1
    };
    this.deboundHandleSearch = debounce(this.handleSearch, 5, true)
  }

  componentDidMount () {
    axios.get('http://localhost:3000/').then(
      (res, err) => {
        console.log('11112121212');
          const terms = res.data;
          this.setState({'terms': terms})
          // console.log('resss', res)
        }
    )
  }

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
  }

  handleSearch = (e) => {
    const search = e.target.value;
    axios.get('http://localhost:3000/' + '?search=' + search).then(
      (res, err) => {
          const terms = res.data;
          this.setState({'terms': terms})
          // console.log('resss', res)
        }
    )
    console.log(this.state, 'Search box changed.');
  }

  render() {
    return (
      <div className="App">
      {/* <PrimarySearchAppBar onChange={this.handleSearch}/> */}
      <embed src="http://dict.youdao.com/dictvoice?audio=python"/>
      <input type='text' placeholder='Search keyword'
      

        onChange={this.handleSearch}
      />
        {
          this.state.terms.slice(0, 10).map(
          item => (<div>

            <Card word={item.word} definition={item.definition}/> <br />
          </div>)
        )
        }

        <div>
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={10}
          totalItemsCount={450}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange.bind(this)}
        />
      </div>

        
      </div>
    );
  }   
}

export default App;
