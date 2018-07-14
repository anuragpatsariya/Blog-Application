import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Options extends Component {
  constructor(props) {
    super(props);
  }

  <select className="" id="category" name="category" onChange={this.handleCategoryChange} >
    <option value="it">Information Technology</option>
    <option value="cloud">Cloud Computing</option>
    <option value="ml">Machine Learning</option>
    <option value="others">Others..</option>
  </select>
}

ReactDOM.render(
  <TopicOptions />,
  document.getElementById('root')
);

export default Options;
