import socialMediaIcons from '@/data/socialMediaIcons';
import { Container, Link } from '@mui/material'
import { useRouter } from 'next/router';
import React from 'react'

const Footer = () => {
    return (
        <footer className="py-5 bg-gradient-to-r from-[#76f48f11] to-[#0156f411]">
            <Container maxWidth={'md'}>
                <div className='flex flex-col text-center gap-4'>
                    <img className='mx-auto' src="/logoWithText.webp" alt="" />
                    {/* <div className='text-sm text-primary'>Lorem ipsum dolor sit amet</div> */}
                    {/* <div className='grid md:grid-cols-5 grid-cols-2 gap-5 mx-auto'>
                        {links.map(({ link, title }, index) => (
                            <div className={`my-auto lg:text-base text-xs uppercase hover:opacity-60 cursor-pointer ${link === pathname ? "text-primary" : ""}`} key={index}>
                                {title}
                            </div>
                        ))}
                    </div> */}
                    <div className="grid md:grid-cols-3 grid-cols-2 my-5 text-left mx-auto gap-20">
                        <div className="flex flex-col gap-5">
                            {/* <p className="text-lg">
                                Documentation
                            </p> */}
                            <div>
                                <div>General</div>
                                <div>
                                    <Link href={'/docs/general/affiliate_terms'} className=" !text-[#9C9C9C] cursor-pointer">
                                        Affiliate Terms
                                    </Link>
                                </div>
                                <div><Link href={'/docs/general/ico_terms'} className=" !text-[#9C9C9C] cursor-pointer">
                                    Ico Terms
                                </Link></div>
                                <div><Link href={'/docs/general/terms_of_sale'} className=" !text-[#9C9C9C] cursor-pointer">
                                    Terms of Sale
                                </Link></div>
                                <div><Link href={'/docs/general/terms_of_service'} className=" !text-[#9C9C9C] cursor-pointer">
                                    Terms of Service
                                </Link></div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div>
                                <div>Mobile</div>
                                <Link href={'/docs/moblie/privacy_policy'}>
                                    <p className=" text-[#9C9C9C] cursor-pointer">
                                        Privacy Policy
                                    </p>
                                </Link>
                                <Link href={'/docs/moblie/terms_of_use'}>
                                    <p className=" text-[#9C9C9C] cursor-pointer">
                                        Terms of use
                                    </p>
                                </Link>
                            </div>

                            {/* <Link href={'/calculator'}>
                                <p className="body-18 text-knkt-text-primary-3">
                                    Calculator
                                </p>
                            </Link>
                            <Link href={'/store'}>
                                <p className="body-18 text-knkt-text-primary-3">
                                    Our Store
                                </p>
                            </Link>    <Link href={'/referral-program'}>
                                <p className="body-18 text-knkt-text-primary-3">
                                    Referral Program
                                </p>
                            </Link>    <Link href={'/contact-us'}>
                                <p className="body-18 text-knkt-text-primary-3">
                                    Contact Us
                                </p>
                            </Link> */}
                        </div>
                        <div>
                            <div>Website</div>
                            <Link href={'/docs/website/privacy_policy'}>
                                <p className=" text-[#9C9C9C] cursor-pointer">
                                    Privacy Policy
                                </p>
                            </Link>
                            <Link href={'/docs/website/terms_and_conditions'}>
                                <p className=" text-[#9C9C9C] cursor-pointer">
                                    Terms and conditions
                                </p>
                            </Link>
                        </div>

                    </div>

                    <div className='flex gap-5 mx-auto'>
                        {socialMediaIcons.map(({ icon, link }, index) => (
                            <a target='_blank' href={link} key={index}>
                                <img className='w-7' src={icon} alt="" />
                            </a>
                        ))}
                    </div>
                    {/* <div className='text-[#939393] mx-auto'>
                        eiusmod temporLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    </div> */}
                </div>
            </Container>
        </footer>
    )
}

export default Footer