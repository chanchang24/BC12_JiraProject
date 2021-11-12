import React from 'react';
// import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const widthLayout = (WrappedComponent) => {
  return ({ component: Component, isPrivate, ...rest }) => {

    // const currentUser = useSelector((state) => state.authReducer.currentUser);
    
    const content = (
      <Route
        {...rest}
        render={(routeProps) => (
          <WrappedComponent>
            <Component {...routeProps} />
          </WrappedComponent>
        )}
      />
    );

    //Protect private routes
    // if (isPrivate) {     
    //   if (currentUser) {
    //     return content;
    //   }else{
    //     alert('Please login');
    //   }
    //   return <Redirect to="/login"/>
    // }
    return content;
    
  };
};
export default widthLayout;
