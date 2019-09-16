import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
// import AppBar from '@material-ui/core/AppBar';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import axios from 'axios';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.brucemolina.com/">
        Bruce Molina
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    width: '100%',    
  },
  toolbarTitle: {
    flex: 1,
    fontSize: "30px",
  },
  container: {
    width: '100%'

  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '30%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp(props) {

  const classes = useStyles();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const handleSubmit = e => {
    e.preventDefault();
    console.log(email, password)
    const userDetails = {email, password}
    axios.post('http://localhost:4000/users/login', userDetails)
    .then(res => {
      if (!res.data.error){
        props.history.push("/journal")
      } else {
        console.log("cant find user")
        setError(true)
        setEmail('')
        setPassword('')
      }
    })
  };

  return (
    <Container className={classes.container}>
    <Toolbar className={classes.toolbar} >
        <Typography            
            align="center"
            noWrap
            className={classes.toolbarTitle}
        >
    Bruce's Awesome Blog
  </Typography>
        <Button variant="outlined" size="small" href="/signup">
            Sign up
        </Button>
    </Toolbar>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>

        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                onChange={ e => setEmail(e.target.value)}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Typography align="center" component="h1" variant="h5" color="error">
            {error && "User Not Found!"}
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signup" variant="body2">
                Don't have an account? Sign up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}