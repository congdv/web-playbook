import { Component } from "react";
import Button from ".";
import Loading from "../Loading";

const withLoading = (Component) => ({isLoading, ...rest}) => 
 isLoading ? <Loading/> : <Component {...rest}/>;

 const ButtonWithLoading = withLoading(Button);

 export default ButtonWithLoading;