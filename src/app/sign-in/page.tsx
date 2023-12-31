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
import axios from 'axios'
import { useRouter } from 'next/navigation'

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
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

type FormValues = {
  email: string
  password: string
}

type Errors = {
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
  }

  return {
    values,
    errors,
  }
}

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver })
  const router = useRouter()

  const handleFetch = async (data: FormValues) => {
    const apiURL = 'https://login-api-sage.vercel.app/users/login'

    try {
      const response = await axios.post(apiURL, data)
      const token = response.data.token
      localStorage.setItem('token', token)
      localStorage.setItem('user', response.data.id)
      router.push(`/user/`)
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error)
    }
  }

  const onSubmit = (data: FormValues): void => {
    handleFetch(data)
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
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            autoFocus
            {...register('email')}
          />
          {errors.email && (
            <p style={{ color: 'red', fontSize: '13px', marginTop: '0' }}>
              {errors?.email?.message}
            </p>
          )}{' '}
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            {...register('password')}
          />
          {errors.password && (
            <p style={{ color: 'red', fontSize: '13px', marginTop: '0' }}>
              {errors.password.message}
            </p>
          )}{' '}
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/sign-up" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  )
}
