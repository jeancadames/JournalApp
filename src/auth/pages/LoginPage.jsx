import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, Link, TextField, Typography, useFormControl, Alert } from '@mui/material'
import { Google } from '@mui/icons-material'
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth/thunks';

import { AuthLayout } from '../layout/AuthLayout';

import { useForm } from '../../hooks/useForm';

export const LoginPage = () => {

  const {status, errorMessage} = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const {email, password, onInputChange, formState} = useForm({
    email: '',
    password: ''
  });

  const isAuthenticating = useMemo(()=> status === 'checking', [status]);

  const onSubmit = (event) => {
    event.preventDefault();

    //debo despachar la accion del thunk startLoginWithEmailPassword
    dispatch(startLoginWithEmailPassword(formState));
  }

  const onGoogleSignIn = () => {
    dispatch(checkingAuthentication(email, password));
    dispatch(startGoogleSignIn());
  }

  return (
    <AuthLayout title="Login">
        <form onSubmit={ onSubmit }
              className="animate__animated animate__fadeIn animate__faster">
          <Grid container>
            <Grid item xs={12} sx={{mt: 2}}>
              <TextField 
                label="Correo" 
                type="email" 
                placeholder="correo@gmail.com"
                fullWidth
                name="email"
                value={email}
                onChange={onInputChange}
                />
          </Grid>

          <Grid item xs={12} sx={{mt: 2}}>
              <TextField 
                label="Contraseña" 
                type="password" 
                placeholder="contraseña"
                fullWidth
                name="password"
                value={password}
                onChange={onInputChange}
                />
            </Grid>

            <Grid container spacing={2} sx={{mb: 2, mt: 1}}>
            <Grid 
              item 
              xs={12}
              display={!!errorMessage ? '' : 'none'}
              >
                <Alert severity='error'>
                  {errorMessage}
                </Alert>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Button 
                  type="submit" 
                  variant="contained" 
                  fullWidth
                  disabled={isAuthenticating}>
                  Login
                </Button>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Button 
                  variant="contained" 
                  fullWidth
                  onClick={onGoogleSignIn}
                  disabled={isAuthenticating}>
                  <Google/>
                  <Typography sx={{ml:1}}>Google</Typography>
                </Button>
              </Grid>

            </Grid>

            <Grid container direction='row' justifyContent='end'>
              <Link component={ RouterLink } color='inherit' to="/auth/register">
                Crear una cuenta
              </Link>
            </Grid>

          </Grid>
          
        </form>
      </AuthLayout>
    )
}
