import { getMainNews, indexNews } from '@/api/strapi/news'
import BlogComponent from '@/components/common/BlogComponent'
import MainNewsInterface from '@/interfaces/MainNewsInterface'
import { StrapiNewsInterface } from '@/interfaces/StrapiNewsInterface'
import Layout from '@/layouts'
import { Container, Skeleton, Tooltip } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'

const Index = () => {
    const router = useRouter();
    const newsQuery = useQuery<StrapiNewsInterface>({
        queryKey: ["news"],
        queryFn: () => indexNews<StrapiNewsInterface>({
            populate: 'cover',

            sort: 'createdAt:desc'
        }).then(({ data }) => data)
    });

    const mainNewsQuery = useQuery<MainNewsInterface>({
        queryKey: ["main-new"],
        queryFn: () => getMainNews<MainNewsInterface>({
            populate: {
                news: {
                    populate: "cover"
                }
            }
        }).then(({ data }) => data)
    });

    return (
        <>
            <Head>
                <title>{"KonnektVPN - News  & Press"}</title>
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
            <main className=''>
                <section className='py-24'>
                    <Container>
                        <div className='flex flex-col md:flex-row justify-between gap-5'>
                            <div className='my-auto flex flex-col gap-5 md:w-1/2'>
                                <h1 className='lg:text-5xl text-3xl font-bold text-primary'>News  & Press</h1>
                                <p className='lg:text-base text-sm'>Discover KonnektVPN's "Levels" system, designed to help you earn more passive</p>
                            </div>
                            {mainNewsQuery.isSuccess ? <div className='md:w-3/5 cursor-pointer relative'>
                                <Tooltip title={mainNewsQuery.data?.data.attributes.news.data.attributes.title}>
                                    <div onClick={() => {
                                        router.push(`/news/news?id=${mainNewsQuery.data.data.attributes.news.data.id}`)
                                    }} style={{
                                        backgroundImage: `url(${mainNewsQuery.data?.data.attributes.news.data.attributes.cover.data.attributes.url})`,
                                        // filter: "contrast(0%)"
                                    }} className='bg-cover h-96 flex rounded-2xl'>
                                        {/* <div className='text-xl w-3/4 text-center m-auto'>{mainNewsQuery.data.data.attributes.news.data.attributes.title}</div> */}
                                    </div>
                                </Tooltip>
                                {/* <img onClick={() => {
                                    router.push(`/news/news?id=${mainNewsQuery.data.data.attributes.news.data.id}`)
                                }} src={mainNewsQuery.data?.data.attributes.news.data.attributes.cover.data.attributes.url} alt="" /> */}
                            </div>
                                : <img className='md:w-3/5' src="/news/newsCover.webp" alt="" />}
                        </div>
                    </Container>
                </section>

                <section className='py-12'>
                    <Container>
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-3 ">
                            {newsQuery.isSuccess && newsQuery.data.data.map((news, index) => (
                                <BlogComponent news={news} key={index} />
                            ))}
                            {newsQuery.isLoading &&
                                [1, 1, 1].map((_, index) => (
                                    <Skeleton key={index} animation="wave" variant='rectangular' className='!h-64' />
                                ))
                            }
                        </div>
                    </Container>
                </section>
            </main>
        </>
    )
}

Index.getLayout = function getLayout(page: JSX.Element) {
    return <Layout>{page}</Layout>
};


export default Index