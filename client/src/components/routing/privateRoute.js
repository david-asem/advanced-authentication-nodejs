import { Redirect, Route } from "react-router-dom";

import React, { Component } from 'react'

const privateRoute = ({component: Component, ...rest}) => {
  return (
    <Route
      {...rest}
      render=(props.) => {
  localStorage.getItem("authToken") ? (
            <Component {...props} />
          ):(
            <Redirect to="/login" />
          )
      }
    
    />

    
  )
}

export default privateRoute
