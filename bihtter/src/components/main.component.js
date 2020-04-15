import React, { Component } from 'react';
import axios from 'axios';
import Feed from "./feed.component";
import { getFromStorage } from "../storage";
export default class Main extends Component{
  constructor(props){
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangePost = this.onChangePost.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.state = {
      username: '',
      description: '',
      like:[],
      date:0,
    }
  }  
    componentDidMount(){
      const id = getFromStorage("user_id");
      console.log(id)
      
      const req = {
        id: id
        }

      axios.post('/users/username',req ) 
      .then(res => {
        this.setState({
          username: res.data.username
        })
    })
    } 
    onChangePost(e){ 
    this.setState({
      description: e.target.value
      });
    }
    onSubmit(e){ 
      e.preventDefault();
      const post = {
        username: this.state.username,
        description: this.state.description,
        like: this.state.like,
        date: this.state.date,
        liked: this.state.liked
      }

     console.log(post);
     //tweets.call(post);
     axios.post('http://localhost:5000/tweets/post', post)
     .then(res => console.log(post));
      
     window.location = '/main'
    
    }
    onLogout(e){
  const id = getFromStorage("user_id");
      console.log(id)
      
      const req = {
        id: id
        }

      axios.post('/users/logout', req) 
      .then(res => {
        window.location = '/'
        console.log(res)
         }).catch((err) =>{
           console.log(err);
       })
  }
        render(){
          return(
          <div>
            <form  onSubmit={this.onSubmit}>

              <div className="form-group">
<<<<<<< HEAD
              <label className="form-control-label">Usename:  {this.state.username}</label>
=======
                <label className="form-control-label">User:</label>
                <input type="text" name="user" className="form-control" value="user"></input>
>>>>>>> Caleb
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
<<<<<<< HEAD
            
            
            
            <div className="customContainer">
            <button className="btn btn-primary" onClick={this.onLogout}>
              Logout</button>
            </div>
          
          
          
            </div>
=======
          </div>
>>>>>>> Caleb
        )
    }
}
