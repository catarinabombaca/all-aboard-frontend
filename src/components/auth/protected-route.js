import React from 'react';
import { Route, Redirect } from 'react-router-dom';
 
const protectedRoute  = ({component: Component, loggedInUser, ...rest}) => {
  console.log({component: Component, loggedInUser, ...rest})
    return (
      <Route
        {...rest}
        render={ props  => {
            if(loggedInUser){
              return <Component {...props} loggedInUser={loggedInUser}/>
            } else {
              return <Redirect to={{pathname: '/', state: {from: props.location}}} />
            }
          }
        }
      />
    )
}
export default protectedRoute;