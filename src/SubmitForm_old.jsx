import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
//import TopicOptions from './TopicOptions';

class SubmitForm extends Component {
  constructor(props) {
    super(props);
    this.state = {bname: '',topic:'',content:'',category:''};

    this.handleBNameChange = this.handleBNameChange.bind(this);
    this.handleTopicChange = this.handleTopicChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    //this.handleFilePathChange = this.handleFilePathChange.bind(this);
    //this.handleFileInputChange = this.handleFileInputChange.bind(this);
  }

  handleBNameChange(event){
    this.setState({bname:event.target.value});
  }

  handleTopicChange(event){
    this.setState({topic:event.target.value});
  }

  handleContentChange(event){
    this.setState({content:event.target.value});
  }

  handleCategoryChange(event){
    this.setState({category:event.target.value});
  }

   // handleFilePathChange(event){
   //   this.setState({filepath:event.target.value});
   //
   //   }
   // handleFileInputChange(event){
   //   this.setState({fileinput:event.target.value});
   // }

  handleSubmit(event){
    console.log("bname: "+event.target.bname.value);
    console.log("topic: "+event.target.topic.value);
    console.log("category: "+event.target.category.value);
    console.log("content: "+event.target.content.value);
    //console.log("filepath: "+event.target.filepath.value);

    const bname =  event.target.bname.value;
    const topic = event.target.topic.value;
    const category = event.target.category.value
    const content = event.target.content.value;
    // let filepath = event.target.filepath.value;
    // filepath = filepath.replace(/C:\\fakepath\\/, '');
    let formData = new FormData();
    formData.append('username', bname);
    formData.append('btopic', topic);
    formData.append('bcategory', category);
    formData.append('bcontent',content);
    //formData.append('bfilpath',filepath);
    formData.append('file',this.uploadInput.files[0]);
        for (var [key, value] of formData.entries()) {
      console.log(key, value);
    }

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


    /*
    axios({
      method: 'post',
      url: '/new_blog',
      params: {
        username:  bname,
        btopic:  topic,
        bcategory: category,
        bcontent: content,
        bfilepath: filepath
      }
    })
    .then(response => {
      console.log(response.data);
      //ReactDOM.render(response.data, document.getElementById('blogParent'));
    })
    .catch(error => {
      console.log(error.response)
    });*/

  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} >
        <div>
          <h4>Write your Blog here..</h4>
        </div>
        <div className="mdl-textfield mdl-js-textfield">
          <input name="bname" className="mdl-textfield__input" type="text" id="bname" onChange={this.handleBNameChange} ></input>
          <label className="mdl-textfield__label" htmlFor="name">Your name please ...</label>
        </div>
        <div className="mdl-textfield mdl-js-textfield">
          <input name="topic" className="mdl-textfield__input" type="text" id="topic" onChange={this.handleTopicChange} ></input>
          <label className="mdl-textfield__label" htmlFor="name">Topic of your writing ...</label>
        </div>
        <div>
          <select className="" id="category" name="category" onChange={this.handleCategoryChange} >
            <option value="it">Information Technology</option>
            <option value="cloud">Cloud Computing</option>
            <option value="ml">Machine Learning</option>
            <option value="others">Others..</option>
          </select>
        </div>
        <div className="input-field col s12">
          <textarea rows="10" cols="100" id="content" onChange={this.handleContentChange}>
          </textarea>
        </div>

        <div className="file-field input-field">
          <div>
          <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
        </div>
        <div>
          <input ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Enter the desired name of file" />
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
