import Layout from '@/layouts';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import Link from 'next/link';
import React from 'react'

const App = () => {
    return (
        <>
            <main>
                <section className='py-24 bg-AppPageHeroStripe-image bg-no-repeat bg-contain bg-center'>
                    <Container>
                        <section className='flex flex-col gap-20'>
                            <h1 className='text-primary text-center md:text-5xl  text-2xl font-bold'>KonnektVPN app: Your Gateway to Next-Gen VPN</h1>
                            <img className='mx-auto ' src="/AppPage/appPageHeroSection.webp" alt="" />
                        </section>
                    </Container>
                </section>

                <section className='py-16'>
                    <Container>
                        <section className='flex flex-col lg:flex-row justify-center gap-5'>
                            <div className='flex flex-col my-auto md:gap-10 gap-5'>
                                <h2 className='md:text-3xl text-2xl md:w-3/4 text-primary font-bold'>You train our AI model and we offer you rewards for it.                             </h2>
                                <div className='md:w-3/4 md:text-base text-sm'>Be part of shaping the future with KonnektVPN as we refine our
                                    next-gen AI technology. Sign up now to assist in training our AI, enhancing
                                    VPN performance for all.</div>
                                <div className="flex flex-col xxs:flex-row gap-3 text-white">
                                    <Tooltip title="iOS version not available at the moment">
                                        <a className="" href="#">
                                            <button className="h-14 w-52 border-[#3582A0] filter grayscale border-2 flex rounded-xl md:py-1 py-1 md:px-5 px-4 gap-4">
                                                <img src="/blueApple.svg" alt="" className="-ml-2" />
                                                <div className='mx-auto'>
                                                    <div className="text-xs font-medium opacity-90 w-max">Download on The</div>
                                                    <div className="md:text-xl text-base font-bold text-justify w-max">App Store</div>
                                                </div>
                                            </button>
                                        </a>
                                    </Tooltip>
                                    <a href="https://play.google.com/store/apps/details?id=com.konnektvpn.app" target='_blank'>
                                        <button className="h-14 w-52 border-[#3582A0] border-2 flex rounded-xl md:py-1 py-1 md:px-5 px-4 gap-4">
                                            <img src="/bluePlaystore.svg" alt="" className="-ml-2" />
                                            <div className='mx-auto'>
                                                <div className="text-xs font-medium opacity-90 uppercase text-left w-max">Get it on</div>
                                                <div className="md:text-xl text-base font-bold text-justify w-max">Google Play</div>
                                            </div>
                                        </button>
                                    </a>
                                </div>
                            </div>
                            <img className='md:w-1/2 mx-auto' src="/AppPage/phone1.webp" alt="" />
                        </section>
                    </Container>
                </section>

                <section className='py-16'>
                    <Container>
                        <section className='flex flex-col gap-16'>
                            {/* <h1 className='text-center text-4xl font-bold text-primary'>Lorem ipsum dolor sit amet</h1> */}
                            <div className='flex flex-col lg:flex-row justify-center gap-12'>
                                <img className='md:w-1/2 mx-auto' src="/AppPage/secondPhone.webp" alt="" />
                                <div className='flex flex-col my-auto gap-10'>
                                    <h2 className='md:text-3xl text-2xl  font-bold text-primary'>Invite your friends and earn exclusive rewards. join our affiliate program today.</h2>
                                    <div className='md:text-base text-sm'>Unlock rewards together! Dive into our affiliate program page where you'll find exciting
                                        opportunities for both you and your friends to earn exclusive perks, bonuses, and more. Join
                                        now and start enjoying the benefits!
                                    </div>
                                    <Link href={'/affiliates'}>
                                        <button className="text-white bg-primary px-6 py-2 rounded-full transition-all cursor-pointer hover:opacity-90">Join Now</button>
                                    </Link>
                                </div>
                            </div>
                        </section>
                    </Container>
                </section>

                <section className='py-16'>
                    <Container>
                        <section className='flex flex-col gap-16'>
                            <div className='flex flex-col-reverse lg:flex-row justify-center gap-12'>
                                <div className='flex flex-col my-auto gap-10'>
                                    <h2 className='md:text-3xl text-2xl  font-bold text-primary'>Check our lifetime plans and secure your future with unmatched value</h2>
                                    <div className='md:text-base text-sm'>KonnektVPN offers different plans adding extra layers of benefits and more rewards . So, pick a
                                        plan today that suits you and optimize browsing</div>
                                    <Link href={'/plans'}>
                                        <button className="text-white bg-primary px-6 py-2 rounded-full transition-all cursor-pointer hover:opacity-90">View Plans</button>
                                    </Link>
                                </div>
                                <img className='md:w-1/2 mx-auto' src="/AppPage/thirdPhone.webp" alt="" />
                            </div>
                        </section>
                    </Container>
                </section>

                <section className='py-16'>
                    <Container>
                        <section className='flex flex-col gap-16'>
                            {/* <h1 className='text-center text-4xl font-bold text-primary'>Lorem ipsum dolor sit amet</h1> */}
                            <div className='flex flex-col lg:flex-row justify-center gap-12'>
                                <img className='md:w-1/2 mx-auto' src="/AppPage/forthPhone.webp" alt="" />
                                <div className='flex flex-col my-auto gap-10'>
                                    <h2 className='md:text-3xl text-2xl  font-bold text-primary'>KonnektVPN's level system</h2>
                                    <div className='md:text-base text-sm'>Discover KonnektVPN's "Levels" system, designed to help you earn more passive
                                        income on your investment, invest now, and earn rewards in USDT.
                                    </div>
                                    <Link href={'/levels'}>
                                        <button className="text-white bg-primary px-6 py-2 rounded-full transition-all cursor-pointer hover:opacity-90">Learn More</button>
                                    </Link>
                                </div>
                            </div>
                        </section>
                    </Container>
                </section>
            </main>
        </>
    )
}

App.getLayout = function getLayout(page: JSX.Element) {
    return <Layout>{page}</Layout>
};

export default App