import { Google } from "@mui/icons-material"
import { Button, Grid, Link, TextField, Typography, Alert } from "@mui/material"
import { useMemo } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link as RouterLink} from 'react-router-dom';
import { useForm } from "../../hooks/useForm";
import { startCreatingUserWithEmailPassowrd } from "../../store/auth/thunks";
import { AuthLayout } from "../layout/AuthLayout";

const formValidations = {
  email: [(value) => value.includes('@'), 'El correo no es válido'],
  password: [(value) => value.length >= 6, 'El password debe de tener más de 6 caracteres'],
  displayName: [(value) => value.length >= 1, 'El nombre es obligatorio']
}

const formData = {
  email: '',
  password: '',
  displayName: ''
}


export const RegisterPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const {status, errorMessage} = useSelector(state => state.auth);
  const isCheckingAuthetication = useMemo(()=> status === 'checking', [status]);

  const dispatch = useDispatch();

  const {email, password, onInputChange, displayName, formState, isFormValid, emailValid, passwordValid, displayNameValid} = useForm(formData, formValidations);


  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if(!isFormValid) return;

    dispatch(startCreatingUserWithEmailPassowrd(formState));
  }

  return (
    <AuthLayout title="Registrate">
        <form onSubmit={onSubmit}
                className="animate__animated animate__fadeIn animate__faster">
          <Grid container>
          <Grid item xs={12} sx={{mt: 2}}>
              <TextField 
                label="Nombre completo" 
                type="text" 
                placeholder="John Cena"
                fullWidth
                name="displayName"
                value={displayName}
                onChange={onInputChange}
                error={!!displayNameValid && formSubmitted}
                helperText={displayNameValid}
                />
          </Grid>

            <Grid item xs={12} sx={{mt: 2}}>
              <TextField 
                label="Correo" 
                type="email" 
                placeholder="correo@gmail.com"
                fullWidth
                name="email"
                value={email}
                onChange={onInputChange}
                error={!!emailValid && formSubmitted}
                helperText={emailValid}
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
                error={!!passwordValid && formSubmitted}
                helperText={passwordValid}
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

              <Grid item xs={12}>
                <Button 
                  type="submit"
                  variant="contained" 
                  fullWidth
                  disable={isCheckingAuthetication}>
                  Crear cuenta
                </Button>
              </Grid>

            </Grid>

            <Grid container direction='row' justifyContent='end'>
              <Typography sx={{mr: 1}}>Ya tienes cuenta?</Typography>
              <Link component={ RouterLink } color='inherit' to="/auth/login">
                Ingresar
              </Link>
            </Grid>

          </Grid>
          
        </form>
      </AuthLayout>
    )
}
