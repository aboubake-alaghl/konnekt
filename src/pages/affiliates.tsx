import Layout from '@/layouts';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from 'next/link';
import React from 'react'

const Affiliates = () => {
    return (
        <>
            <main className=''>
                <section className='pb-16 pt-24 bg-gradient-to-tr from-[#4cc8a75b] to-transparent'>
                    <Container>
                        <div className='flex lg:flex-row flex-col gap-10'>
                            <div className='flex flex-col gap-10 my-auto'>
                                <h1 className='md:text-5xl text-3xl'>Join Our Affiliate Program</h1>
                                <p>Are you an influencer on social media or other platforms? Excited about the future of
                                    Web 3.0?</p>
                                <p>Then join our Affiliate Program and earn a percentage commission on every device and
                                    plan sold.
                                </p>
                                <p>You can contact us to get a unique referral code and increase your percentages at any
                                    time from the link below.</p>
                                <Link href="/contact-us">
                                    <Button variant='contained'>Contact us</Button>
                                </Link>
                            </div>
                            <img src="/affiliates/heroImage.webp" alt="" />
                        </div>
                    </Container>
                </section>
                <section className='py-16'>
                    <Container maxWidth={'md'}>
                        <div className='flex flex-col text-center gap-10'>
                            <h1 className='text-3xl'>Direct referrals</h1>
                            <div className='grid grid-cols-2 gap-y-10'>
                                <div className='flex flex-col relative'>
                                    <div style={{
                                        top: '32.5%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                    }} className='absolute font-bold text-2xl'>
                                        <div>500</div>
                                        <div>KNKT</div>
                                    </div>
                                    <img className='w-32 mx-auto' src="/affiliates/50.webp" alt="" />
                                    <div className='text-center mx-auto w-3/4 mt-5'>Per Invite</div>
                                </div>
                                <div className='flex flex-col relative'>
                                    <div style={{
                                        top: '32.5%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                    }} className='absolute font-bold text-xl'>
                                        <div className='text-4xl'>5%</div>
                                    </div>
                                    <img className='w-32 mx-auto' src="/affiliates/15.webp" alt="" />
                                    <div className='text-center mx-auto w-3/4 mt-5'>from buying a plan or a device</div>
                                </div>
                                {/* <div className='flex flex-col relative'>
                                    <div style={{
                                        top: '32.5%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                    }} className='absolute font-bold text-xl'>
                                        <div className='text-4xl'>5%</div>
                                    </div>
                                    <img className='w-32 mx-auto' src="/affiliates/70.webp" alt="" />
                                    <div className='text-center mx-auto w-3/4 mt-5'>Of Each Device Purchased</div>
                                </div> */}
                            </div>
                        </div>
                    </Container>
                </section>
                <section className='py-16'>
                    <Container maxWidth={'md'}>
                        <div className='flex flex-col text-center gap-10'>
                            <h1 className=' text-3xl'>IP referrals</h1>
                            <div className='grid grid-cols-2 gap-y-10'>
                                <div className='flex flex-col relative'>
                                    <div style={{
                                        top: '32.5%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                    }} className='absolute font-bold text-2xl'>
                                        <div>500</div>
                                        <div>KNKT</div>
                                    </div>
                                    <img className='w-32 mx-auto' src="/affiliates/50.webp" alt="" />
                                    <div className='text-center mx-auto w-3/4 mt-5'>Per Invite</div>
                                </div>
                                <div className='flex flex-col relative'>
                                    <div style={{
                                        top: '32.5%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                    }} className='absolute font-bold text-xl'>
                                        <div className='text-4xl'>1%</div>
                                    </div>
                                    <img className='w-32 mx-auto' src="/affiliates/15.webp" alt="" />
                                    <div className='text-center mx-auto w-3/4 mt-5'>from buying a plan or a device</div>
                                </div>
                                {/* <div className='flex flex-col relative'>
                                    <div style={{
                                        top: '32.5%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                    }} className='absolute font-bold text-xl'>
                                        <div className='text-4xl'>5%</div>
                                    </div>
                                    <img className='w-32 mx-auto' src="/affiliates/70.webp" alt="" />
                                    <div className='text-center mx-auto w-3/4 mt-5'>Of Each Device Purchased</div>
                                </div> */}
                            </div>
                        </div>
                    </Container>
                </section>
                <section className='py-16'>
                    <Container>
                        <div className='flex lg:flex-row flex-col gap-10'>
                            <div>
                                {/* <div>Lorem ipsum</div> */}
                                <h1 className='md:text-5xl text-3xl md:text-left text-center font-bold'>HOW IT WORKS</h1>
                                <div className='flex flex-col mt-10 gap-5'>
                                    <div className='flex gap-8'>
                                        <img src="/affiliates/circle.webp" className='md:mb-10 mb-6 md:w-24 w-20' alt="" />
                                        <div className='flex flex-col gap-2'>
                                            <h1 className='md:text-2xl text-lg font-bold'>Step 1</h1>
                                            <p className='md:text-lg text-sm'>Log in to your Konnektvpn account</p>
                                        </div>
                                    </div>
                                    <div className='flex gap-8'>

                                        <img src="/affiliates/circle.webp" className='md:mb-10 mb-6 md:w-24 w-20' alt="" />
                                        <div className='flex flex-col gap-2'>
                                            <h1 className='md:text-2xl text-lg font-bold'>Step 2</h1>
                                            <p className='md:text-lg text-sm'>Copy your referral code</p>
                                        </div>
                                    </div>
                                    <div className='flex gap-8'>
                                        <img src="/affiliates/circle.webp" className='md:mb-10 mb-6 md:w-24 w-20' alt="" />
                                        <div className='flex flex-col gap-2'>
                                            <h1 className='md:text-2xl text-lg font-bold'>Step 3</h1>
                                            <p className='md:text-lg text-sm'>Watch your balance grow and withdraw it in USDT</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <img className="lg:w-1/2" src="/affiliates/right.webp" alt="" />
                        </div>
                    </Container>
                </section>
            </main>
        </>
    )
}

Affiliates.getLayout = function getLayout(page: JSX.Element) {
    return <Layout>{page}</Layout>
};

export default Affiliates