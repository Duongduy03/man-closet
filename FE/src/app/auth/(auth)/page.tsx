'use client'
import { BannerV2 } from '@/components/banner'
import AuthForm from '@/components/main/pageComponents/auth/AuthForm'
import { useRouter } from 'next/navigation'
import React from 'react'

const Auth = () => {
  return (
      <section >
        <AuthForm />
      </section>
  )
}

export default Auth