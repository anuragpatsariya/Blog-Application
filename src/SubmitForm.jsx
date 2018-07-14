import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
//import TopicOptions from './TopicOptions';

class SubmitForm extends Component {
  constructor(props) {
    super(props);
    this.state = {bname:'',topic:'',content:'',category:'it'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event){
    //this.setState({banme: event.target.bname,topic:event.target.topic,content:event.target.content});
    /*const target = event.target;
    const bname = target.bname;
    const topic = target.topic;
    const content = target.content;
    const category = target.category;*/
    this.setState({
      [event.target.name]: event.target.value
    });
    //console.log(bname+" "+topic+" "+content);
  }

  handleSubmit(event){
    console.log("One more entry to store: "+ this.state.bname+" "+this.state.topic+" "+this.state.category+" "+this.state.content);
    console.log(this.uploadInput.files[0]);
    let formData = new FormData();
    formData.append('username', this.state.bname);
    formData.append('btopic', this.state.topic);
    formData.append('bcategory', this.state.category);
    formData.append('bcontent',this.state.content);
    formData.append('filename',this.uploadInput.files[0].name);
    formData.append('file',this.uploadInput.files[0]);
    axios({
      method: 'post',
      url: '/new_blog',
      data: formData,
      config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
    .then(response => {
      console.log(response.data);
      //ReactDOM.render(response.data, document.getElementById('blogParent'));
    })
    .catch(error => {
      console.log(error.response)
    });
    //event.preventDefault();
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit} >
        <div>
          <h4>Write your Blog here..</h4>
        </div>
        <div className="mdl-textfield mdl-js-textfield">
          <input name="bname" className="mdl-textfield__input" type="text" id="bname" value={this.state.bname} onChange={this.handleChange} ></input>
          <label className="mdl-textfield__label" htmlFor="name">Your name please ...</label>
        </div>
        <div className="mdl-textfield mdl-js-textfield">
          <input name="topic" className="mdl-textfield__input" type="text" id="topic" value={this.state.topic} onChange={this.handleChange} ></input>
          <label className="mdl-textfield__label" htmlFor="name">Topic of your writing ...</label>
        </div>
        {/*<div>
          <select className="" id="category" name="category" value={this.state.category} onChange={this.handleChange} >
          <option value="it" defaultValue>Information Technology</option>
          <option value="cloud">Cloud Computing</option>
          <option value="ml">Machine Learning</option>
          <option value="others">Others..</option>
          </select>
          </div>*/}

          <a className='dropdown-trigger btn' href='#' data-target='dropdown1'>Category</a>
          <ul id='dropdown1' className='dropdown-content'>
            <li><a href="#!">Information Technology</a></li>
            <li><a href="#!">Hardware</a></li>
          </ul>
          <div className="input-field col s12">
            <textarea rows="10" cols="100" id="content" name="content" value={this.state.content} onChange={this.handleChange} >
            </textarea>
          </div>

          {/*<div className="file-field input-field">
            <div>
            <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
            </div>
            </div>*/}
            <div className = "file-field input-field">
              <div className = "btn">
                <span>Browse</span>
                <input ref={(ref) => { this.uploadInput = ref; }}  type = "file" />
              </div>

              <div className = "file-path-wrapper">
                <input className = "file-path validate" type = "text"
                  placeholder = "Upload file" />
              </div>
            </div>
            <input type="submit" value="Submit" />
          </form>

        );
      }
    }

    ReactDOM.render(
      <SubmitForm />,
      document.getElementById('root')
    );

    export default SubmitForm;
