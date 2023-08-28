'use client'
import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { useForm, Resolver } from 'react-hook-form'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        login
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

type FormValues = {
  firstName: string
  lastName: string
  email: string
  password: string
}

type Errors = {
  firstName?: {
    type: string
    message: string
  }
  lastName?: {
    type: string
    message: string
  }
  email?: {
    type: string
    message: string
  }
  password?: {
    type: string
    message: string
  }
}

const resolver: Resolver<FormValues> = async (values) => {
  const errors: Partial<Errors> = {}

  if (!values.firstName) {
    errors.firstName = {
      type: 'required',
      message: 'First name is required.',
    }
  }

  if (!values.lastName) {
    errors.lastName = {
      type: 'required',
      message: 'Last name is required.',
    }
  }

  if (!values.email) {
    errors.email = {
      type: 'required',
      message: 'Email is required.',
    }
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = {
      type: 'invalid',
      message: 'Invalid email address.',
    }
  }

  if (!values.password) {
    errors.password = {
      type: 'required',
      message: 'Password is required.',
    }
  } else if (values.password.length < 8) {
    errors.password = {
      type: 'minLength',
      message: 'Password must have at least 8 characters.',
    }
  }

  return {
    values,
    errors,
  }
}

export default function SignUp() {
  const [agreeTerms, setAgreeTerms] = React.useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver })

  const onSubmit = (data: FormValues): void => {
    console.log(data)
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                {...register('firstName')}
              />
              {errors.firstName && (
                <p style={{ color: 'red', fontSize: '13px', marginTop: '0' }}>
                  {errors.firstName.message}
                </p>
              )}{' '}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                autoComplete="family-name"
                {...register('lastName')}
              />
              {errors.lastName && (
                <p style={{ color: 'red', fontSize: '13px', marginTop: '0' }}>
                  {errors.lastName.message}
                </p>
              )}{' '}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                {...register('email')}
              />
              {errors.email && (
                <p style={{ color: 'red', fontSize: '13px', marginTop: '0' }}>
                  {errors?.email?.message}
                </p>
              )}{' '}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                {...register('password')}
              />
              {errors.password && (
                <p style={{ color: 'red', fontSize: '13px', marginTop: '0' }}>
                  {errors.password.message}
                </p>
              )}{' '}
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    value={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    color="primary"
                  />
                }
                label="I agree with terms and conditions"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!agreeTerms}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/sign-in" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  )
}
