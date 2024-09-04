import Footer from '@/components/common/Footer'
import Navbar from '@/components/common/Navbar'
import AuthGuard from '@/guards/AuthGuard'

import { NextPage } from 'next'
import React from 'react'

const Index: NextPage<{ children: JSX.Element, auth?: boolean }> = ({ children, auth = false }) => {
  if (auth) {
    return (
      <AuthGuard>
        <Navbar />
        {children}
        <Footer />
      </AuthGuard>
    )
  } else {
    return (
      <>
        <Navbar />
        {children}
        <Footer />
      </>
    )
  }

}

export default Index