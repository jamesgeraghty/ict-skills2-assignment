import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const LoginPage = (props) => {
  const context = useContext(AuthContext);
  const classes = useStyles();

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
      <form className={classes.root} noValidate autoComplete="off">
      <Input defaultValue="Email Address" inputProps={{ 'aria-label': 'description' }} />
      <Input defaultValue="Password" inputProps={{ 'aria-label': 'description' }} />
    </form>
    <Button onClick={login} variant="contained">Login</Button>
     
    </>
  );
};

export default LoginPage;
