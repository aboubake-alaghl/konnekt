import Layout from '@/layouts';
import { Container } from '@mui/material';
import React from 'react';

const Team = () => {
    return (
        <>
            <main className=''>
                <section className='bg-black py-24 relative overflow-clip'>
                    <img className="absolute z-0 -right-10 top-40" src="/bigEllipse.webp" alt="" />
                    <img className="absolute z-0 -bottom-10 -left-10" src="/bigEllipse.webp" alt="" />
                    <img className="absolute z-0 left-28 top-20" src="/smallEllipse.webp" alt="" />
                    <img className="absolute z-0 left-[42.5%] top-60 opacity-60" src="/midEllipse.webp" alt="" />
                    <Container className='z-50 relative'>
                        <div className='flex flex-col gap-10 z-50 relative'>
                            <h1 className='text-center text-5xl z-50 relative'>MEET OUT TEAM</h1>
                            <p className='text-center'>Say hi to the force behind KonnektVPN! We're a group of tech enthusiasts, security
                                buffs, and AI innovators. We’re passionate about making your internet experience
                                faster, safer, and smarter. Get to know the folks behind the magic and see why we love
                                what we do.</p>
                            <div className='grid lg:grid-cols-2 gap-16 z-50 relative'>
                                <TeamComponent />
                                <TeamComponent />
                                <TeamComponent />
                                <TeamComponent />
                            </div>
                        </div>
                    </Container>
                </section>
            </main>
        </>
    )
}

const TeamComponent = () => (
    <div className='bg-teamMemberFrame-image flex md:flex-row flex-col md:bg-cover bg-contain bg-no-repeat px-10 pt-6 gap-5'>
        <img className='md:w-1/2' src="/person1.webp" alt="" />
        <div className='flex flex-col gap-2 my-auto md:text-left text-center'>
            <h2 className='text-xl'>Ahmed abou</h2>
            <h2>Back-End developer</h2>
            {/* <p className='text-xs'>Mauris varius consectetur sapien a facilisis. Curabitur nisi erat, eleifend in malesuada vel, commodo a lorem. Aliquam dignissim turpis a semper lobortis. </p> */}
            <div className="flex gap-3 md:mx-0 mx-auto">
                <img className="cursor-pointer w-6" src="/whiteLinkedIn.svg" alt="" />
                <img className="cursor-pointer w-6" src="/whiteX.svg" alt="" />
                <img className="cursor-pointer w-6" src="/whiteMail.svg" alt="" />
            </div>
        </div>
    </div>
)

Team.getLayout = function getLayout(page: JSX.Element) {
    return <Layout>{page}</Layout>
};


export default Team