import React from 'react'

const Register = React.lazy( () =>  import("../../modules/authentication/containers/Register"))
const Logout = React.lazy( () => import("../../modules/authentication/containers/Logout"))
const Login = React.lazy( () => import("../../modules/authentication/containers/Login"))


export const register = {
  path: "/register",
  component: Register
}

export const login = {
  path: "/login",
  component: Login
}

export const logout = {
  component: Logout
}
