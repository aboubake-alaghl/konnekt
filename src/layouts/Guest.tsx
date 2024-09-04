import Footer from '@/components/common/Footer'
import Navbar from '@/components/common/Navbar'
import GuestGuard from '@/guards/GuestGuard'
import { NextPage } from 'next'
import React from 'react'

const Guest: NextPage<{ children: JSX.Element }> = ({ children }) => {

  return (
    <GuestGuard>
      <Navbar />
      <>{children}</>
      <Footer />
    </GuestGuard>
  )
}

export default Guest