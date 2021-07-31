import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


const LoginPage = (props) => {
  const context = useContext(AuthContext);

  const login = () => {
    const username = Math.random().toString(36).substring(7);
    context.authenticate(username, "pass1");
  };

  // Set 'from' to path where browser is redirected after a successful login.
  // Either / or the protected path user tried to access.
  const { from } = props.location.state || { from: { pathname: "/" } };

  return context.isAuthenticated ? (
    <Redirect to={from} />
  ) : (
    <>
     
      <h2>Login page</h2>
      <p>You must log in to view the Playlist  </p>
      <form>
          <label>Username:<input type="text" name="name"/></label>
          <label>Password:<input type="password" name="name"/></label>
        </form>
      <button onClick={login}>Submit</button>
    </>
  );
};

export default LoginPage;
