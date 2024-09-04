import Footer from '@/components/common/Footer'
import NavbarStore from '@/components/NavbarStore'
import AuthGuard from '@/guards/AuthGuard'

import { NextPage } from 'next'
import React from 'react'

const Store: NextPage<{ children: JSX.Element, auth?: boolean }> = ({ children, auth = false }) => {
  if (auth) {
    return (
      <AuthGuard>
        <NavbarStore />
        {children}
        <Footer />
      </AuthGuard>
    )
  } else {
    return (
      <>
        <NavbarStore />
        {children}
        <Footer />
      </>
    )
  }

}

export default Store