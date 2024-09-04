import Footer from '@/components/common/Footer'
import NavbarDashboard from '@/components/NavbarDashboard'
import AuthGuard from '@/guards/AuthGuard'
import { NextPage } from 'next'
import React from 'react'

const Index: NextPage<{ children: JSX.Element }> = ({ children }) => {
    return (
        <AuthGuard>
            <NavbarDashboard />
            <>{children}</>
            <Footer />
        </AuthGuard>
    )
}

export default Index