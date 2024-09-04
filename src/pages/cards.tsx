import Layout from '@/layouts';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Head from 'next/head';
import React, { useState } from 'react'

const Cards = () => {

    const [selectedCard, setSelectedCard] = useState('/cards/mainCard.webp')
    return (
        <>
            <Head>
                <title>{"KonnektVPN - Cards"}</title>
                <meta property="og:description"
                    content="KonnektVPN encrypts your internet connection and hides your IP address and location, making you much safer and more private online." />
                <meta property="twitter:card" content="summary_large_image" />
                <meta
                    name="description"
                    content="KonnektVPN encrypts your internet connection and hides your IP address and location, making you much safer and more private online."
                ></meta>
                <meta property="og:title" content="KonnektVPN" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://konnektvpn.com/logo.png" />
                <meta property="og:url" content="https://konnektvpn.com/" />
                <meta property="og:description"
                    content="KonnektVPN encrypts your internet connection and hides your IP address and location, making you much safer and more private online." />
            </Head>
            <main className='bg-gradient-to-b from-[#223C35] from-40%  via-[#2A584B]  to-[#223D36] '>
                <section className='md:py-24 py-12'>
                    <Container maxWidth="xl">
                        <div className='flex flex-col md:flex-row justify-center gap-5 md:bg-cards-hero-image bg-contain bg-no-repeat min-h-[50rem] bg-center'>
                            <div className='my-auto flex flex-col gap-5 md:w-2/5'>
                                <h1 className='lg:text-5xl text-3xl font-bold '>Konnektvpn cards. your way to financial freedom</h1>
                                <p className='lg:text-base text-sm'>Experience the ease and convenience of KPN Cards, designed to make your digital
                                    transactions smooth and secure. Enjoy a new level of payment flexibility with plenty of
                                    features</p>
                                <div>
                                    <Button variant='outlined'>Coming soon</Button>
                                </div>
                            </div>
                            <div className='my-auto flex flex-col gap-5'>
                                <img className='md:min-w-[28rem] md:w-96 w-5/6 mx-auto' src={selectedCard} alt="" />
                                <div className='flex gap-5 mx-auto'>
                                    {/* {['/cards/mainCard.webp', '/cards/card1.webp', '/cards/card2.webp', '/cards/card3.webp'].map((src, inx) => ( */}
                                    {['/cards/mainCard.webp', '/cards/card2.webp'].map((src, inx) => (
                                        <img onClick={() => {
                                            setSelectedCard(src)
                                        }} className={`w-16 rounded-md cursor-pointer ${src === selectedCard ? "border-2 border-primary " : ""}`} src={src} alt={src} key={inx} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Container>
                </section>

                {/* <section className='py-16'>
                    <Container maxWidth="md">
                        <div className="grid md:grid-cols-2 gap-x-40 gap-y-32">
                            {[1, 1].map(() => (
                                <div className='grid gap-y-10'>
                                    <div className='font-bold'>Card type</div>
                                    <div>
                                        <div className='text-textSecond'>Card type</div>
                                        <div className='text-textSecond'>Visa, UnionPay</div>
                                        <div className='text-textSecond'>Issued Country : Laos</div>
                                    </div>

                                    <div className='font-bold'>Fee</div>
                                    <div>
                                        <div className='grid md:grid-cols-5 grid-cols-4 md:gap-10'><div className='md:col-span-4 col-span-3 text-textSecond'>Card Issue Fee</div> <div className='text-primary'>199USD</div></div>
                                        <div className='grid md:grid-cols-5 grid-cols-4 md:gap-10'><div className='md:col-span-4 col-span-3 text-textSecond'>Top-Up Fee</div> <div className='text-primary'>2.8%</div></div>
                                        <div className='grid md:grid-cols-5 grid-cols-4 md:gap-10'><div className='md:col-span-4 col-span-3 text-textSecond'>Annual Fee</div> <div className='text-primary'>60 USD</div></div>
                                        <div className='grid md:grid-cols-5 grid-cols-4 md:gap-10'><div className='md:col-span-4 col-span-3 text-textSecond'>Consumption Fee</div> <div className='text-primary'>0.75%</div></div>
                                        <div className='grid md:grid-cols-5 grid-cols-4 md:gap-10'><div className='md:col-span-4 col-span-3 text-textSecond'>ATM Withdrawal Fee</div> <div className='text-primary'>0.75%</div></div>
                                    </div>

                                    <div className='font-bold'>Card type</div>
                                    <div>
                                        <div className='text-textSecond'>Card type</div>
                                        <div className='text-textSecond'>Visa, UnionPay</div>
                                        <div className='text-textSecond'>Issued Country : Laos</div>
                                    </div>

                                    <div className='font-bold'>Transaction Rule</div>
                                    <div>
                                        <div className='grid md:grid-cols-5 grid-cols-4 md:gap-10'><div className='md:col-span-4 col-span-3 text-textSecond'>Card Issue Fee</div> <div className='text-primary'>199USD</div></div>
                                        <div className='grid md:grid-cols-5 grid-cols-4 md:gap-10'><div className='md:col-span-4 col-span-3 text-textSecond'>Card Issue Fee</div> <div className='text-primary'>199USD</div></div>
                                        <div className='grid md:grid-cols-5 grid-cols-4 md:gap-10'><div className='md:col-span-4 col-span-3 text-textSecond'>Card Issue Fee</div> <div className='text-primary'>199USD</div></div>
                                        <div className='grid md:grid-cols-5 grid-cols-4 md:gap-10'><div className='md:col-span-4 col-span-3 text-textSecond'>Card Issue Fee</div> <div className='text-primary'>199USD</div></div>
                                        <div className='grid md:grid-cols-5 grid-cols-4 md:gap-10'><div className='md:col-span-4 col-span-3 text-textSecond'>Card Issue Fee</div> <div className='text-primary'>19USD</div></div>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </Container>
                </section> */}
            </main>
        </>
    )
}

Cards.getLayout = function getLayout(page: JSX.Element) {
    return <Layout>{page}</Layout>
};

export default Cards