import Layout from '@/layouts';
import { Container } from '@mui/material';
import Head from 'next/head';
import React from 'react'

const tokenmicsData = [{
    title: "Miners",
    percentage: "%80",
    paragraphs: [`An 80% of the max token supply treasury is in place to supply their gains. This amount will be continuously minted and burned as long as our ecosystem works in place.`,
        `There is only a 3% yearly cap on minting for miners.`]
}, {
    title: "Liquidity pools",
    percentage: "%10",
    paragraphs: [`10% of tokens (Around 300,000,000 KPNs) will fill our liquidity pools. CEXs and DEXs require enough liquidity to run the token. Professional 3rd party market makers will ensure the market is healthy in all situations.`]
}, {
    title: "Synthia",
    percentage: "%5",
    paragraphs: [`The official partner and the router provider are getting 5% of the supply, 20% of the 150,000,000 KPNs will be sent in a vesting contract after six months of launch, and the rest of the amount (80%) in cliff vesting 20% every year for a whole five years.`]
}, {
    title: "Advisors",
    percentage: "%2",
    paragraphs: [`Every successful project needs to run with experienced monitors. Our advisors are getting a treasury in vesting contracts of 2% of the maximum supply (60,000,000 KPNs), distributing 20% of the total amount every six months.`]
}, {
    title: "ICO (1, 2 and 3) and Presale",
    percentage: "%3",
    paragraphs: [`Our ICO takes 3% of the allocation and is split into 3 rounds. Each round lasts five full days, from 10-03-2024 00:15 AM UTC until 27-03-2024 11:59 PM UTC. Each round will have a hard cap of 30,000,000 KPNs, equal to 1% of our max supply. Investors will enter a vesting period of 5 months and get 20% of the total KPNs they purchase in ICO every month starting from 01-04-2024.`,
        `A special pre-sale event will take place in our decentralized portal where investors get a last-minute chance to get some KPNs at 0.02$.`, `If we don't reach the hard cap, unsold KPNs will be burnt and re-minted for Mining distribution.`
    ]
}, {
    title: "Allocation left from ICO",
    percentage: "-",
    paragraphs: [`An amount equal to 10,000,000 KPNs (= 200,000$), which is left from ICO 1/2/3 allocation, will be distributed to participants in the top-tier launchpad (Kommunitas). The whole amount will be airdropped directly to users after the event finishes. This will help us grow our community and give us an excellent chance to be listed in top-tier CEXs.`]
}];

const tokenFirstData = [
    {
        title: "Name",
        value: "KonnektVPN",
    },
    {
        title: "Ticker",
        value: "KPN",
    },
    {
        title: "Chains",
        value: "POLYGON",
    },
    {
        title: "Max supply",
        value: "3,000,000,000",
    },
    {
        title: "KPN",
        value: "0x8328e6fceC9477C28298c9f02d740Dd87a1683e5",
    },
    {
        title: "Lock Tokens",
        value: "0x0283c72542fB2d17bfcC1c41da15Fe2f2f463D08",
    },
    {
        title: "Claim Tokens",
        value: "0x735E288adf77b4245eE26023c6ca13159659b612",
    },
    {
        title: "Token System",
        value: "AI VPN - Proof of value - Proof of stake - Proof of time",
    },
    {
        title: "Partners",
        value: "Synthia Group LLC",
    },
    {
        title: "ICO price",
        value: "0.015$ - 0.017$",
    },
    {
        title: "Lasting price",
        value: "0.02$",
    }
]

const tableData = [
    {
        "PERIOD": "Month 1",
        "AMOUNT OF KPN": ["2.838,022", "151.708", "2.000,000"],
        "TO": ["ICO", "IDO", "Kommunitas"],
        "DATE OF RELEASE": ["01/04/2024", "15/04/2024", "15/04/2024"],
        "%": ["20%"]
    },
    {
        "PERIOD": "Month 2",
        "AMOUNT OF KPN": ["2.838,022", "151.708", "2.000,000"],
        "TO": ["ICO", "IDO", "Kommunitas"],
        "DATE OF RELEASE": ["01/05/2024", "15/05/2024", "15/05/2024"],
        "%": ["20%"]
    },
    {
        "PERIOD": "Month 3",
        "AMOUNT OF KPN": ["2.838,022", "151.708", "2.000,000"],
        "TO": ["ICO", "IDO", "Kommunitas"],
        "DATE OF RELEASE": ["01/06/2024", "15/06/2024", "15/06/2024"],
        "%": ["20%"]
    },
    {
        "PERIOD": "Month 4",
        "AMOUNT OF KPN": ["2.838,022", "151.708", "2.000,000"],
        "TO": ["ICO", "IDO", "Kommunitas"],
        "DATE OF RELEASE": ["01/07/2024", "15/07/2024", "15/07/2024"],
        "%": ["20%"]
    },
    {
        "PERIOD": "Month 5",
        "AMOUNT OF KPN": ["2.838,022", "151.708", "2.000,000"],
        "TO": ["ICO", "IDO", "Kommunitas"],
        "DATE OF RELEASE": ["01/08/2024", "15/08/2024", "15/08/2024"],
        "%": ["10%"]
    },
    {
        "PERIOD": "Month 6",
        "AMOUNT OF KPN": ["15,000,000", "12,000,000"],
        "TO": ["Synthia", "Advisors"],
        "DATE OF RELEASE": ["01/09/2024"],
        "%": ["10%", "20%"]
    },
    {
        "PERIOD": "Month 12",
        "AMOUNT OF KPN": ["15,000,000", "12,000,000"],
        "TO": ["Synthia", "Advisors"],
        "DATE OF RELEASE": ["01/03/2025"],
        "%": ["10%", "20%"]
    },
    {
        "PERIOD": "Month 18",
        "AMOUNT OF KPN": ["15,000,000", "12,000,000"],
        "TO": ["Synthia", "Advisors"],
        "DATE OF RELEASE": ["01/09/2025"],
        "%": ["10%", "20%"]
    },
    {
        "PERIOD": "Month 24",
        "AMOUNT OF KPN": ["15,000,000", "12,000,000"],
        "TO": ["Synthia", "Advisors"],
        "DATE OF RELEASE": ["01/03/2026"],
        "%": ["10%", "20%"]
    },
    {
        "PERIOD": "Month 30",
        "AMOUNT OF KPN": ["15,000,000", "12,000,000"],
        "TO": ["Synthia", "Advisors"],
        "DATE OF RELEASE": ["01/09/2026"],
        "%": ["10%", "20%"]
    },
    {
        "PERIOD": "Month 36",
        "AMOUNT OF KPN": ["15,000,000"],
        "TO": ["Synthia"],
        "DATE OF RELEASE": ["01/03/2027"],
        "%": ["10%"]
    },
    {
        "PERIOD": "Month 42",
        "AMOUNT OF KPN": ["15,000,000"],
        "TO": ["Synthia"],
        "DATE OF RELEASE": ["01/09/2027"],
        "%": ["10%"]
    },
    {
        "PERIOD": "Month 48",
        "AMOUNT OF KPN": ["15,000,000"],
        "TO": ["Synthia"],
        "DATE OF RELEASE": ["01/03/2028"],
        "%": ["10%"]
    },
    {
        "PERIOD": "Month 54",
        "AMOUNT OF KPN": ["15,000,000"],
        "TO": ["Synthia"],
        "DATE OF RELEASE": ["01/09/2028"],
        "%": ["10%"]
    },
    {
        "PERIOD": "Month 60",
        "AMOUNT OF KPN": ["15,000,000"],
        "TO": ["Synthia"],
        "DATE OF RELEASE": ["01/03/2029"],
        "%": ["10%"]
    }
]

const Tokenmics = () => {
    return (
        <>
            <Head>
                <title>{"KonnektVPN - Tokenmics"}</title>
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
            <div className=' text-white py-24'>
                <Container className='mb-10'>
                    <h1 className='text-center text-4xl text-primary'>KonnektVPN Token Economics</h1>
                    <section className='mt-6'>
                        <div className=' text-center  max-w-4xl mx-auto'>Good Tokenomics = good token and economicsc. A deep study into our market has been made to split KPN uniquely where we can assure token endurance for the long term.</div>
                        <div className='max-w-3xl mx-auto border-primary border rounded-3xl px-12 py-8 flex flex-col gap-2 mt-5'>
                            {tokenFirstData.map((SingleTokenFirstData, index) => (
                                <div key={index} className='flex gap-1'>
                                    <div className='text-primary'>{SingleTokenFirstData.title}</div>
                                    <div className='text-primary'>:</div>
                                    <div className='break-all'>{SingleTokenFirstData.value}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                </Container>

                <section className='bg-gradient-to-b from-[#4cc8a718] pt-10'>
                    <Container>
                        <section className='mx-auto flex flex-col  '>
                            <h1 className='text-center text-4xl text-primary'>Token Allocation</h1>
                            <img src="/tokenomics/tokenmics.svg" alt="tokenmics" className='lg:w-[60%] w-[95%] mx-auto mt-10' />
                            <div className=' grid lg:grid-cols-3 md:grid-cols-2 mx-auto  gap-5'>
                                {tokenmicsData.map(({ paragraphs, percentage, title }, index) => (
                                    <div key={index} className='p-8 bg-gradient-to-b from-[#ffffff0a] to-[#00000077] rounded-lg'>
                                        <div className='justify-between flex'>
                                            <div className='text-lg my-auto  text-primary'>{title}</div>
                                            <div className='text-3xl my-auto font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent'>{percentage}</div>
                                        </div>
                                        {paragraphs.map((paragraph, index) => (
                                            <p key={index} className='mt-5 leading-5 opacity-75 text-justify'>{paragraph}</p>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </section>
                    </Container>
                </section>


                <section className='mx-auto mt-24 overflow-auto '>
                    <h1 className='text-center text-4xl text-primary'>Vesting Schedule</h1>
                    <table className="table-auto mx-auto text-center mt-5  ">
                        <thead className='text-primary md:text-lg bg-gradient-to-r from-[#4cc8a70c]'>
                            <tr>
                                <th className='md:py-5 py-3 md:text-lg text-sm'>PERIOD</th>
                                <th className='md:py-5 py-3 md:text-lg text-sm'>AMOUNT OF KPN</th>
                                <th className='md:py-5 py-3 md:text-lg text-sm'>TO</th>
                                <th className='md:py-5 py-3 md:text-lg text-sm'>DATE OF RELEASE</th>
                                <th className='md:py-5 py-3 md:text-lg text-sm'>%</th>
                            </tr>
                        </thead>
                        <tbody className='text-lg'>
                            {tableData.map((tableData, index) => (
                                <tr key={index} className='border-t border-slate-600'>
                                    <td className='md:px-8 px-4 md:py-4 py-2 md:text-md text-sm'>{tableData.PERIOD}</td>
                                    <td className='md:px-8 px-4 md:py-4 py-2 md:text-md text-sm'>{tableData['AMOUNT OF KPN'].map((v) => <div>{v}</div>)}</td>
                                    <td className='md:px-8 px-4 md:py-4 py-2 md:text-md text-sm'>{tableData.TO.map((v) => <div>{v}</div>)}</td>
                                    <td className='md:px-8 px-4 md:py-4 py-2 md:text-md text-sm'>{tableData['DATE OF RELEASE'].map((v) => <div>{v}</div>)}</td>
                                    <td className='md:px-8 px-4 md:py-4 py-2 md:text-md text-sm'>{tableData['%'].map((v) => <div>{v}</div>)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>
        </>
    )
}

Tokenmics.getLayout = function getLayout(page: JSX.Element) {
    return <Layout>{page}</Layout>
};


export default Tokenmics;



