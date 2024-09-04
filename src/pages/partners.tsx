import Layout from '@/layouts';
import { Container, useMediaQuery } from '@mui/material';
import React from 'react'

const Partners = () => {
    const matches = useMediaQuery('(min-width:768px)');
    return (
        <>
            <section className='bg-gradient-to-tl from-[#4cc8a76b] to-transparent relative h-96 overflow-clip flex'>
                <img className='absolute md:w-auto w-1/4' src="/partners/ellipse.webp" alt="" />
                <img className='absolute md:w-auto w-1/4 right-0 bottom-0' src="/partners/ellipse.webp" alt="" />
                <Container className='m-auto'>
                    <section className='m-auto'><h1 className='m-auto text-center text-primary md:text-6xl text-5xl'>Partners</h1></section>
                </Container>
            </section>

            <section className='pb-16'>
                <Container>
                    <h1 className='text-center mt-10 md:text-4xl text-3xl'>All Partners</h1>
                    <div className='grid md:grid-cols-3 gap-16 mt-12'>
                        {[{
                            alt: "cls",
                            src: "/partners/cls.webp",
                            link: "https://www.cls.global/",
                        },
                        {
                            alt: "cyperscope",
                            src: "/partners/cyperscope.webp",
                            link: "https://www.cyberscope.io/",
                        },
                        {
                            alt: "synthia",
                            src: "/partners/synthia.webp",
                            link: "https://synthia.group/",
                        },
                        {
                            alt: "certik",
                            src: "/partners/certik.webp",
                            link: "https://www.certik.com/",
                        },
                        {
                            alt: "mexc",
                            src: "/partners/mexc.webp",
                            link: "https://www.mexc.com/",
                        },
                        {
                            alt: "",
                            src: "",
                            link: "",
                        },
                        {
                            alt: "",
                            src: "",
                            link: "",
                        },
                        {
                            alt: "",
                            src: "",
                            link: "",
                        },
                        {
                            alt: "",
                            src: "",
                            link: "",
                        }].map(({ link, src, alt }, inx) => (
                            (alt && src && link) ? <div key={inx} className='from-[#4cc8a73d] p-10 to-transparent bg-gradient-to-b  border-t rounded-2xl border-primary flex flex-col gap-5'>
                                <img className='w-52 mx-auto' src={src} alt={alt} />
                                <a target='_blank' href={link} className='flex gap-2 cursor-pointer'>Visit website<img src="/partners/arrow.svg" alt="" /></a>
                            </div> : (matches && <div className='from-gray-500 opacity-50  p-10 to-transparent bg-gradient-to-b  border-t rounded-2xl border-gray-950 flex flex-col gap-5 min-h-60'>
                                {/* <div className='m-auto text-center'>not active waiting for the next partner to be there.</div> */}
                            </div>)
                        ))}
                    </div>
                </Container>
            </section>
        </>
    )
}

Partners.getLayout = function getLayout(page: JSX.Element) {
    return <Layout>{page}</Layout>
};


export default Partners
