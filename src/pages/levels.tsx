import Layout from '@/layouts';
import getAPRAndKPN from '@/utils/getAPRAndKPN';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Head from 'next/head'
import React, { useState } from 'react'

const Levels = () => {
    const [selectedMonth, setSelectedMonth] = useState(6);
    const [selectedLevel, setSelectedLevel] = useState(1);
    const increaseLevel = () => {
        setSelectedLevel(old => (old + 1) % 6)
    }

    return (
        <>
            <Head>
                <title>{"KonnektVPN - Levels"}</title>
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
            <main className='bg-levels-image bg-cover'>
                <section className='pt-24 pb-12'>
                    <Container>
                        <div className='flex flex-col lg:flex-row'>
                            <div className='my-auto flex flex-col gap-5'>
                                <h1 className='lg:text-5xl text-3xl'>Konnekt Levels are here</h1>
                                <p className='lg:text-base text-sm'>Introducing our staking system within the KonnektVPN ECOSYSTEM, where users can stake
                                    KPN tokens for periods of 6, 12, or 24 months. There are six levels, with each level offering
                                    higher Annual Percentage Rates (APR) and requiring more KPN tokens for staking.</p>
                                <p className='lg:text-base text-sm'>The rewards
                                    from staking are given in USDT, and the longer the staking period, the higher the APR users
                                    can earn. Users need to commit a set amount of KPN to unlock each level, which in turn can
                                    boost their potential earnings from the staking process</p>
                                <p className='lg:text-base text-sm'>Users can also terminate the staking contract any time they need or claim the reward from
                                    within the app</p>
                            </div>
                            <img className='md:mt-0 mt-20' src="/levelsParadaim.webp" alt="" />
                        </div>
                    </Container>
                </section>

                <section className='pb-10 pt-5'>
                    <Container maxWidth={'xl'}>
                        <div className='flex flex-col text-center'>
                            {/* <h1 className='lg:text-5xl text-3xl font-bold my-10'>Choose Your Level</h1> */}
                            <div className='flex flex-col lg:gap-0 gap-10 justify-around lg:flex-row  bg-gradient-to-b from-[#282828] to-[#08080A] p-12 rounded-xl border-t border-slate-400'>
                                <img onClick={() => {
                                    increaseLevel();
                                }} className='cursor-pointer lg:w-2/5 w-4/5 mx-auto lg:mx-0' src={`/levels/level${selectedLevel}.webp`} alt="" />
                                <div className='flex flex-col gap-12'>
                                    <div className='grid  sm:grid-cols-3 gap-2'>
                                        {[6, 12, 24].map((month) => (
                                            <button onClick={() => {
                                                setSelectedMonth(month);
                                            }} className={`text-white border-2 lg:px-6 px-4 py-2 rounded-full border-[#9effe4ab]  transition-all ${month === selectedMonth ? "bg-primary" : "hover:bg-[#9effe468]"}`}>{month} Months</button>
                                        ))}
                                    </div>
                                    <div>
                                        <h2 className='text-3xl font-bold'>Choose Your Level</h2>
                                        <div className='text-xs text-[#7A7A7A]'>Level can boost your Income more </div>
                                    </div>
                                    <div className='text-left flex flex-col gap-2'>
                                        <h3 className='text-primary'>Level {selectedLevel + 1}</h3>
                                        <div className='justify-between flex'>
                                            <div className='text-[#7A7A7A]'>APR:</div>
                                            <div className='flex gap-2'><div>{getAPRAndKPN(selectedMonth, selectedLevel + 1)?.apr}$</div>
                                                {/* <div className='text-primary text-xs mt-auto'>+30</div> */}
                                            </div>
                                        </div>
                                        <div className='justify-between flex'>
                                            <div className='text-[#7A7A7A]'>KPN Needed</div>
                                            <div className='flex gap-2'><div>{getAPRAndKPN(selectedMonth, selectedLevel + 1)?.kpnNeeded} KPNs</div>
                                                {/* <div className='text-primary text-xs mt-auto'>+30</div> */}
                                            </div>
                                        </div>
                                    </div>
                                    <Button disabled variant='contained' className=" bg-primary px-6 py-2 !rounded-full transition-all cursor-pointer hover:opacity-90 text-black">Connect Wallet</Button>
                                </div>
                            </div>
                        </div>
                    </Container>
                </section>
            </main>
        </>
    )
}

Levels.getLayout = function getLayout(page: JSX.Element) {
    return <Layout>{page}</Layout>
};


export default Levels