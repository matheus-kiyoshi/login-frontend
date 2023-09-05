'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.push('/sign-in')
  })

  return (
    <main>
      <p>Something Went Wrong! Try this link</p>
      <Link href="/sign-in">Sign-in</Link>
    </main>
  )
}
