import './App.css';
import Card from './components/Card'
import React from 'react'
import axios from 'axios'
import TextField from '@material-ui/core/TextField';


class App extends React.Component {
  constructor () {
    super();
    this.state = {
      'terms': [],
      activePage: 1
    };
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
        <TextField id="outlined-basic" style={{width: 825}} onChange={this.handleSearch} label="Enter keyword" variant="outlined" />
        {
          this.state.terms.slice(0, 10).map (
          item => (<div>

            <Card word={item.word} definition={item.definition}/> <br />
          </div>)
        )
        }
      </div>
    );
  }   
}

export default App;
