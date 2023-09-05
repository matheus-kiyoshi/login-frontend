'use client'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import axios from 'axios'

type User = {
  id: string
  firstName: string
  lastName: string
  email: string
}

export default function User() {
  const [user, setUser] = useState<User>()
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/sign-in')
    }

    handleFetch()
  })

  const handleFetch = async () => {
    const apiURL = 'https://login-api-sage.vercel.app/users/'
    const id = localStorage.getItem('user')
    const token = localStorage.getItem('token')

    try {
      const response = await axios.get(apiURL + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setUser(response.data)
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error)
    }
  }

  const handleClick = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/sign-in')
  }

  return (
    <main>
      <h1>
        Seja bem vindo, {user?.firstName} {user?.lastName}
      </h1>
      <button onClick={handleClick}>Sair</button>
    </main>
  )
}
