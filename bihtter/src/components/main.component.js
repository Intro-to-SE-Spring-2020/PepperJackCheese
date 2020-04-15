import React, { Component } from 'react';
import axios from 'axios';
import Feed from "./feed.component";
import { getFromStorage } from "../storage";

export default class Main extends Component{
  constructor(props){
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangePost = this.onChangePost.bind(this);
    this.onChangeUser = this.onChangeUser.bind(this);
   
   
    this.state = {
      username: '',
      description: '',
      date: 123
    }
  }  

    componentDidMount(){
    // gets the session token from local storage
    const token_id = getFromStorage("token");
    console.log(token_id)
    // put the user_id token from local storage
    // don't works right it retrun  
    const user_id = getFromStorage("user_id");
    console.log(user_id)
    }
    
  
    onChangePost(e){ 
    this.setState({
      description: e.target.value
      });
    }
    onChangeUser(e){ 
      this.setState({
        username: e.target.value
        });
    }
    
    onSubmit(e){ 
      e.preventDefault();
      const post = {
        username: this.state.username,
        description: this.state.description,
        date: this.state.date
      }

     console.log(post);
     //tweets.call(post);
     axios.post('http://localhost:5000/tweets/post', post)
     .then(res => console.log(post));
      
     window.location = '/main'
    
    }
        render(){
          return(
          <div>
            <form  onSubmit={this.onSubmit}>

              <div className="form-group">
                <label className="form-control-label">User:</label>
                <input type="text" name="user" className="form-control" value="user"></input>
              </div>
                
              <div className="form-group">
                <label className="form-control-label">Description:</label>
                <textarea name="description" className="form-control" onChange={this.onChangePost}></textarea>
              </div>
  
              <div className="form-group">
                <input type="submit" style={{background: "#8b0000", border:"white"}} value="Post!"
                 className="btn btn-primary">
                </input>
              </div>
            </form>

            <Feed/>
          </div>
        )
    }
}
