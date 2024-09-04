import Layout from '@/layouts';
import Container from '@mui/material/Container';
import React, { useState } from 'react'

const Filearchive = () => {

    const [selectedCountry, setSelectedCountry] = useState("uk");
    const countries = [{
        title: "uk",
        icon: "uk.svg"
    },
    {
        title: "ua",
        icon: "ua.svg"
    },
    {
        title: "spain",
        icon: "spain.svg"
    },
    {
        title: "china",
        icon: "china.svg"
    }
    ];

    return (
        <>
            <main>
                <section className='py-24'>
                    <Container className='relative' maxWidth={'xl'}>
                        <img className='absolute w-80 top-20 -left-20' src="/filePage/books.webp" alt="" />
                        <div className='flex flex-col gap-10'>
                            <h1 className='lg:text-5xl text-3xl font-bold text-center z-10'>Document Archive</h1>
                            {/* <div className='flex gap-5 mx-auto z-10'>
                                {countries.map(({ icon, title }, index) => (
                                    <img onClick={() => setSelectedCountry(title)} className={`cursor-pointer w-10 ${selectedCountry === title ? "border-2 border-primary p-1 rounded-lg" : ""}`} src={icon} alt="" key={index} />
                                ))}
                            </div> */}
                            <div className='grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 z-10'>
                                {[{
                                    title: "The Next-gen: AI VPN",
                                    src: "https://docs.konnektvpn.com/ecosystem"
                                }, {
                                    title: "App Documentation",
                                    src: "https://docs.konnektvpn.com/ecosystem/app-documentation"
                                }, {
                                    title: "ECOSYSTEM",
                                    src: "https://docs.konnektvpn.com/ecosystem/ecosystem"
                                }, {
                                    title: "Whitepaper",
                                    src: "https://konnektvpn.com/docs/whitepaper.pdf"
                                }].map(({ src, title }, index) => (
                                    <a target='_blank' href={src} key={index} className='bg-fileCard-image bg-cover flex bg-no-repeat p-6 gap-2'>
                                        <img src="/file.webp" alt="" />
                                        <div className='flex flex-col'>
                                            <div className='my-auto'>{title}</div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </Container>
                </section>
            </main>
        </>
    )
}

Filearchive.getLayout = function getLayout(page: JSX.Element) {
    return <Layout>{page}</Layout>
};

export default Filearchive