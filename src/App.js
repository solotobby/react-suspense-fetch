import React, { Suspense } from 'react';
import './App.css';

import { fetchData } from './Api';

const resource = fetchData();

const App = () => (
    <div className="App">
      <h1>Welcome to React Fetch (using suspense)</h1>
      <p>Love the Lord with all your heart!</p>
      <Suspense fallback={<h1>Loading</h1>}>
      <ProfileDetails />
      <ProfilePosts />
      <hr />
      <h4>Users List</h4>
      <GoalList />
      </Suspense>
      
    </div>
  );

  const ProfileDetails = () => {
    const user = resource.user.read();
    return (
      <div className='card card-body my-3'>
        <h1 className='large text-primary'>{user.name}</h1>
        <ul>
          <li>Username: {user.username} </li>
          <li>Email: {user.email} </li>
          <li>Citye: {user.address.city} </li>
        </ul>
      </div>
    );
  }

  const ProfilePosts = () => {
    const posts = resource.posts.read();
    return (
      <ul className='list-group'>
        <li className='list-group-item'>
          <strong>Latest Post</strong>
        </li>
        {posts.map(post => (
          <li className='list-group-item' key={post.id}>
            {post.title}
          </li>
        ))}
      </ul>
    );
  }

  const GoalList = () => {
    const goal = resource.goal.read();
    return (
      <ul>
        {goal.map(gl => (
            <li>Name: { gl.name } <br/>  Username: { gl.username } <br/> Email: { gl.email } <br/> Phone: { gl.phone } <hr/></li>
           
        ))}
      </ul>
    );
  }




export default App;
