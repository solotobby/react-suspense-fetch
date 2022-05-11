 import axios from "axios";

 export const fetchData = () => {
     const userPromise = fetchUser();
     const postPromise = fetchPost();
     const goalPromise = fetchGoal();
     return{
         user: wrapPromise(userPromise), 
         posts: wrapPromise(postPromise),
         goal: wrapPromise(goalPromise)
     }
 }

 const wrapPromise = (promise) => {
     //set the initial status
     let status = 'pending';
     //store result
     let result;
     //wait for promise
     let suspender = promise.then(
         res => {
            status = 'success';
            result = res;
         },
         error =>  {
             status = 'error';
             result = error
         }
     );

     return {
        read() {
            if(status === 'pending') {
                throw suspender;
            }else if(status === 'error') {
                throw result;
            }else if(status === 'success'){
                return result;
            }
        }
     }
 }


 const fetchUser = () => {
     console.log('fetching user')
     return axios.get('https://jsonplaceholder.typicode.com/users/10')
     .then(res => res.data)
     .catch(error => console.log(error))
     
 }

 const fetchPost = () => {
    console.log('fetching posts')
    return axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
    .then(res => res.data)
    .catch(error => console.log(error))
    
}

const fetchGoal = () => {
    console.log('fetching goals')
    return axios.get('https://jsonplaceholder.typicode.com/users')
    .then(res => res.data)
    .catch(error => console.log(error))
}