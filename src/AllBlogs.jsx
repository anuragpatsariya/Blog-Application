import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
class AllBlogs extends Component{
  state = {
     all_blogs: []
   }
   componentDidMount() {
     axios.get('/all_blogs')
       .then(res => {
         const all_blogs = res.data;
         this.setState({ all_blogs });
         console.log(all_blogs);
         for(var i=0;i<all_blogs.length;i++){
           console.log(all_blogs[i].username);
           console.log(all_blogs[i].topic);
           console.log(all_blogs[i].category);
           console.log(all_blogs[i].filepath);
           console.log(all_blogs[i].content);

         }
       })
       .catch(err => console.log(err))
   }
  render(){
    return(
      <ul>
        <h3>All Blogs</h3>
          <div>

            { this.state.all_blogs.map(
              (blog, index) => <div key={index}>
              <p> {blog.username} </p>
              <p> {blog.topic} </p>
              <p> {blog.category} </p>
              <p> {blog.filepath} </p>
              <p> {blog.content} </p></div>
            )
          }
     </div>
     </ul>
    )
  }
}
export default AllBlogs;
