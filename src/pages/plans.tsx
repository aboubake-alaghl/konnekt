import { indexSubscriptions } from '@/api/subscription';
import PlanComponent from '@/components/plans/PlanComponent';
import SubscriptionInterface from '@/interfaces/SubscriptionInterface';
import Layout from '@/layouts';
import Container from '@mui/material/Container';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'

const Plans = () => {
    const [isYearly, setIsYearly] = useState(false);
    const subscriptionQuery = useQuery<SubscriptionInterface[]>({
        queryKey: ['subscriptions'],
        queryFn: () => indexSubscriptions<SubscriptionInterface[]>().then(({ data }) => data),
    })
    return (
        <>
            <main className='overflow-hidden'>
                <section className='py-24'>
                    <Container className='relative'>
                        <img src="/plansPage/greenSpot.webp" className='w-3/5 absolute -left-96 -top-96' alt="" />
                        <img src="/plansPage/coin2.webp" className='w-24 absolute  ' alt="" />
                        <img src="/plansPage/coin1.webp" className='w-36 absolute -left-10 bottom-0 ' alt="" />
                        <img src="/plansPage/coin3.webp" className='w-48 absolute right-0 top-5 ' alt="" />
                        <img src="/plansPage/greenSpot.webp" className=' absolute right-0 top-5 ' alt="" />
                        <div className='flex flex-col gap-10'>
                            <div className='flex flex-col gap-2 text-center'>
                                <h1 className='z-10 lg:text-5xl text-3xl font-bold'>Subscription Plans</h1>
                                <div className='z-10 md:text-base text-sm'>KonnektVPN offers four subscription plans: Basic, Bronze, Silver, and Gold.</div>
                            </div>
                            {/*  */}
                            {/* <div className='flex mx-auto text-center z-10'>
                                <div className={`my-auto ${isYearly ? "opacity-40" : ""}`}>Yearly</div>
                                <Switch value={isYearly} onChange={(_, checked) => setIsYearly(checked)} />
                                <div className={`my-auto ${isYearly ? "" : "opacity-40"}`}>Monthly</div>
                            </div> */}
                            <div className='grid lg:grid-cols-4 md:grid-cols-2 gap-3 z-10'>
                                {/* {[
                                    {
                                        features: [
                                            { title: "Free for all verified users", },
                                            { title: "Secure and private browsing VPN" },
                                            { title: "Ability to mine up to 1,200 KNKT per day" }
                                        ], icon: "/free.svg", price: 0, packageName: "Basic", knkt: "1200"
                                    },
                                    {
                                        features: [
                                            { title: "Includes all of the basic features" },
                                            { title: "Ability to mine up to 2,880 KNKT per day" }
                                        ], icon: "/bronze.svg", price: 60, packageName: "Bronze", knkt: "2880"
                                    },
                                    {
                                        features: [
                                            { title: "Includes all of the basic features", },
                                            { title: "Abilty to mine up to 4800 KNKT per day" },
                                            { title: "Protection against cyber threats" }
                                        ], icon: "/silver.svg", price: 150, packageName: "Silver", knkt: "4800"
                                    },
                                    {
                                        features: [
                                            { title: "Includes all of the basic features", },
                                            { title: "Ability to mine up to 7200 KNKT per day" },
                                            { title: "Reduced distraction Increased privacy" },
                                            { title: "Reduced risk of malware" },
                                            { title: "Lower data usage" }
                                        ], icon: "/gold.svg", price: 200, packageName: "Gold", knkt: "2700"
                                    },
                                ].map(({ icon, knkt, packageName, price, features }, index) => (
                                    <PlanComponent features={features} knkt={knkt} packageName={packageName} price={price} key={index} icon={icon} />
                                ))} */}
                                {subscriptionQuery.isSuccess && subscriptionQuery.data.sort((a, b) => a.device_limit - b.device_limit).map((subsciption, index) => (
                                    <PlanComponent key={index} index={index} subsciption={subsciption} />
                                ))}
                            </div>
                        </div>
                    </Container>
                </section>
            </main>
        </>
    )
}

Plans.getLayout = function getLayout(page: JSX.Element) {
    return <Layout>{page}</Layout>
};

export default Plans