import { indexSingleNews } from '@/api/strapi/news';
import SingleNewsInterface from '@/interfaces/SingleNewsInterface';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import Layout from '@/layouts/index'
import React from 'react'
import { Skeleton } from '@mui/material';

const SingleNews = () => {
    const { query: { id } } = useRouter();

    const singleNewsQuery = useQuery<SingleNewsInterface>({
        queryKey: ['news', id],
        queryFn: () => indexSingleNews<SingleNewsInterface>(id as string, {
            populate: 'cover'
        }).then(({ data }) => data),
        enabled: !!id
    });

    if (singleNewsQuery.isLoading) {
        return (
            <main className='flex flex-col gap-10'>
                {/* <h1 className='text-center mt-32 text-4xl'>{singleNewsQuery.data.data.attributes.title}</h1> */}
                <Skeleton variant='rectangular' className='text-center mt-32 text-4xl w-3/5 mx-auto' />
                <Skeleton variant='rectangular' className='mx-auto w-1/2 rounded-md h-96' sx={{ height: 350 }} />
                <section className='mt-8 mb-16'>
                    <div className='container m-auto'>
                        {/* <div dangerouslySetInnerHTML={{
                        __html: singleNewsQuery.data.data.attributes.content
                    }} className=' '>
                    </div> */}
                        <Skeleton variant='text' className='w-3/4 mx-auto' />
                        <Skeleton variant='text' className='w-3/4 mx-auto' />
                        <Skeleton variant='text' className='w-3/4 mx-auto' />
                        <Skeleton variant='text' className='w-3/4 mx-auto' />
                        <div className='my-4'></div>
                        <Skeleton variant='text' className='w-3/4 mx-auto' />
                        <Skeleton variant='text' className='w-3/4 mx-auto' />
                        <div className='my-4'></div>

                        <Skeleton variant='text' className='w-3/4 mx-auto' />
                        <Skeleton variant='text' className='w-3/4 mx-auto' />
                        <div className='my-4'></div>

                        <Skeleton variant='text' className='w-3/4 mx-auto' />

                    </div>
                </section>
            </main>
        )
    }

    if (singleNewsQuery.isSuccess) {
        return (
            <main className='flex flex-col gap-10'>
                <h1 className='text-center mt-32 text-4xl'>{singleNewsQuery.data.data.attributes.title}</h1>
                <img src={singleNewsQuery.data.data.attributes.cover.data.attributes.url} className='mx-auto w-1/2 rounded-md' alt="" />
                <section className='mt-8 mb-16'>
                    <div className='container m-auto'>
                        <div dangerouslySetInnerHTML={{
                            __html: singleNewsQuery.data.data.attributes.content
                        }} className=' mx-auto md:text-base text-sm max-w-screen-md w-[95%] PostContent'>
                        </div>
                    </div>
                </section>
            </main>
        )
    }

}

SingleNews.getLayout = function getLayout(page: JSX.Element) {
    return <Layout>{page}</Layout>
};


export default SingleNews