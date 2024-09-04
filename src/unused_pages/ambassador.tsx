import Layout from '@/layouts';
import { Button } from '@mui/material';
import Container from '@mui/material/Container';
import React from 'react'

const Ambassador = () => {
    return (
        <>
            {/* <main className='bg-gradient-to-b from-[#4cc8a76b] to-transparent'>
                <section className='pb-16 pt-24'>
                    <Container>
                        <div className='flex flex-col gap-10'>
                            <h1 className='md:text-6xl text-4xl'>Be part of our Mission</h1>
                            <div className='grid md:grid-cols-2 gap-7'>
                                {["Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit ametLorem ipsum dolor sit amet  ", "Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet"].map((text) => (
                                    <Button variant='outlined'>{text}</Button>
                                ))}
                            </div>
                        </div>
                    </Container>
                </section>
                <section className='py-16'>
                    <Container>
                        <div className='flex flex-col gap-10'>
                            <h1 className='md:text-6xl text-4xl'>Open positions</h1>
                            <hr />
                            <div className='grid grid-cols-1 gap-10'>
                                {[1, 1, 1].map((_) => (
                                    <div className='flex flex-col gap-5'>
                                        <div className='flex justify-between'>
                                            <h1 className='md:text-4xl text-3xl'>TITLE</h1>
                                            <Button className='' variant='contained'>Apply</Button>
                                        </div>
                                        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum soluta eos sunt dolores, a nobis? Ullam hic consectetur exercitationem sit pariatur placeat maxime numquam libero, sed, rerum, quia doloribus molestiae.</div>
                                        <div className='flex gap-5'>
                                            <Button variant='outlined'>Lorem ipsum dolo</Button>
                                            <Button variant='outlined'>Lorem ipsum dolo</Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Container>
                </section>
            </main> */}
        </>
    )
}

Ambassador.getLayout = function getLayout(page: JSX.Element) {
    return <Layout>{page}</Layout>
};

export default Ambassador