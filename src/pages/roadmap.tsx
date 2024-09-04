import roadmap, { RoadmapItemInterface } from '@/data/roadMap';
import Layout from '@/layouts';
import { Container } from '@mui/material';
import React from 'react'

const RoadMap = () => {
    return (
        <>
            <main>
                <section className='py-24'>
                    <Container>
                        <div className='text-center flex flex-col gap-2 '>
                            <h1 className='lg:text-5xl text-4xl font-bold text-primary'>Our Road Map</h1>
                            <p>Here are the outlines of the strategic direction and goals for the future. It serves as a guide to understand our vision and objectives</p>
                        </div>
                        <div className='mt-20'>
                            {[roadmap.map((roadMapItem, index) => (
                                <RoadMapComponent roadMapItem={roadMapItem} direction={index % 2 === 0 ? "left" : "right"} />
                            ))]}
                        </div>
                    </Container>
                </section>
            </main>
        </>
    )
}

const RoadMapComponent: React.FC<{
    direction: 'left' | 'right'
    roadMapItem: RoadmapItemInterface
}> = ({ direction, roadMapItem }) => {
    return (
        <div className={`flex ${direction === 'right' ? "flex-row-reverse" : ""} relative w-full md:gap-8 gap-4`}>
            <div className='mb-12 bg-gradient-to-bl from-[#07342A] via-[#111E1B] z-20 to-[#0E150D] border-t-2 border-[#4cc8a767] rounded-xl md:p-7 p-4'>
                <h1 className='text-primary md:text-2xl text-xl font-bold'>{roadMapItem.title}</h1>
                <ul className='flex flex-col gap-2 mt-2'>
                    {roadMapItem.points.map((note, i) => (
                        <li className='flex gap-2' key={i}>
                            <div className='md:mt-2 mt-1'>
                                <div className='bg-primary md:w-2 w-[6px]  md:h-2 h-[6px] rounded-full' />
                            </div>
                            <div className='md:text-base text-xs'>{note}</div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={`relative flex text-gray-500 z-10 ${direction === 'right' ? "flex-row-reverse" : ""} gap-2 mt-5`}>
                <img src="/roadMap/light.svg" className={`absolute  opacity-60 ${direction === 'left' ? "right-16" : "left-16"} z-0`} alt="" />
                <div>
                    <div className='bg-primary w-3 my-auto h-3 rounded-full' />
                    <div className='bg-primary w-[2px] m-auto h-full rounded-full' />
                </div>
                <div className={`text-gray-500 ${direction === 'right' ? "text-right" : ""}`}>
                    {/* <div>{roadMapItem.timeline}</div> */}
                    <div className='text-xs'>{roadMapItem.timeline.split('(')[0]}</div>
                    <div className='flex gap-1 md:text-base text-xs'><div className='text-primary'>{"(" + roadMapItem.timeline.split('(')[1]}</div></div>
                    {/* <div className='flex gap-1'><div className='text-primary'>March</div><div>2024</div></div> */}
                </div>
            </div>
        </div>
    )
}

RoadMap.getLayout = function getLayout(page: React.JSX.Element) {
    return <Layout>{page}</Layout>
};


export default RoadMap
