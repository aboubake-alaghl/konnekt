import { SingleNewsStrapiInterface } from '@/interfaces/StrapiNewsInterface'
import Button from '@mui/material/Button'
import Link from 'next/link'
import React from 'react'

const BlogComponent: React.FC<{
    news: SingleNewsStrapiInterface
}> = ({ news }) => {
    return (
        <Link href={`/news/news?id=${news.id}`}>
            <div className="flex flex-col gap-1 cursor-pointer group transition-all">
                <div className="bg-[#242430] rounded-2xl p-2">
                    <div className="bg-cover h-64 rounded-2xl group-hover:grayscale transition-all flex" style={{
                        backgroundImage: `url(${news.attributes.cover.data.attributes.url})`
                    }}>
                        <div className="text-center m-auto lg:text-2xl text-xl text-white group-hover:opacity-100 opacity-0 transition-all">
                            {"Read More"}
                        </div>
                    </div>
                </div>
                <p className='font-bold text-left'>{news.attributes.title}</p>
                <p className="text-left text-xs">
                    {news.attributes.excerpt}
                </p>
                {/* <div className="mr-auto text-left">
                    <Button className="" variant="text">Learn More</Button>
                </div> */}
            </div>
        </Link>
    )
}

export default BlogComponent