import React from 'react'
import Layout from '@/layouts';

const Store = () => {
  return (
    <main className='flex py-96'>
        <div className='m-auto md:text-5xl text-3xl font-bold'>Store is under maintenance</div>
    </main>
  )
}

Store.getLayout = function getLayout(page: JSX.Element) {
    return <Layout>{page}</Layout>
};

export default Store