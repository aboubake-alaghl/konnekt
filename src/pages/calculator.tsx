import React, { useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { indexSubscriptions } from '@/api/subscription'
import { indexDevices } from '@/api/devices'
import { enqueueSnackbar } from 'notistack'
import numeral from 'numeral'
import Head from 'next/head'
import DeviceInterface from '@/interfaces/DeviceInterface'
import SubscriptionInterface from '@/interfaces/SubscriptionInterface'
import Autocomplete from '@mui/material/Autocomplete'
import Select from '@mui/material/Select'
import Container from '@mui/material/Container'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Layout from '@/layouts'

const Calculator = () => {
    const KNKT_TO_DOLLAR = 14400;
    const formatK = (total: number) => total > 1000 ? `${(total / 1000).toFixed(1)}K` : `${total}`;
    const buttonPricePer = [
        {
            label: 'Day',
            inDay: 1
        },
        {
            label: 'Month',
            inDay: 30
        },
        {
            label: 'Year',
            inDay: 365
        },
    ]

    const [selectedPeroid, setSelectedPeroid] = useState(buttonPricePer[0]);
    const [selectedSubscription, setSelectedSubscription] = useState<SubscriptionInterface>();
    const [selectedDevices, setSelectedDevices] = useState<{
        [id: number]: {
            deivce: DeviceInterface,
            count: number
        }
    }>();

    const subscriptionQuery = useQuery<SubscriptionInterface[]>({
        queryKey: ['subscriptions'],
        queryFn: () => indexSubscriptions<SubscriptionInterface[]>().then(({ data }) => data),
    })

    const devicesQuery = useQuery<DeviceInterface[]>({
        queryKey: ['devices'],
        queryFn: () => indexDevices<DeviceInterface[]>().then(({ data }) => data),
    })

    const deviceCount = useMemo(() => {
        if (selectedDevices) {
            return Object.values(selectedDevices).reduce((p, c) => (p + c.count), 0);
        }
        return 0;
    }, [selectedDevices]);

    const totalCapacityMin = useMemo(() => {
        if (selectedSubscription && selectedPeroid) {
            if (selectedSubscription?.device_limit >= deviceCount) {
                return (selectedSubscription.capacity + (selectedDevices ? Object.values(selectedDevices).reduce((p, c) => (p + (c.count * c.deivce.capacity_min)), 0) : 0)) * selectedPeroid.inDay
            } else {
                enqueueSnackbar(`Device Limit for this subscription is ${selectedSubscription?.device_limit}`, { variant: "warning" });
            }
        }
        return 0;
    }, [selectedPeroid, selectedSubscription, selectedDevices]);

    const totalCapacityMax = useMemo(() => {
        if (selectedSubscription && selectedPeroid) {
            if (selectedSubscription?.device_limit >= deviceCount) {
                return (selectedSubscription.capacity + (selectedDevices ? Object.values(selectedDevices).reduce((p, c) => (p + (c.count * c.deivce.capacity_upto)), 0) : 0)) * selectedPeroid.inDay
            } else {
                enqueueSnackbar(`Device Limit for this subscription is ${selectedSubscription?.device_limit}`, { variant: "warning" });
            }
        }
        return 0;
    }, [selectedPeroid, selectedSubscription, selectedDevices]);

    useEffect(() => {
        setSelectedDevices(undefined);
    }, [selectedSubscription]);

    return (
        <>
            <Head>
                <title>{"KonnektVPN - Calculator"}</title>
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
            <main>
                <section className='pt-24'>
                    <Container maxWidth={'md'}>
                        <h1 className='text-primary text-center md:text-5xl text-3xl font-bold'>Our Calculator</h1>
                        <h1 className='text-center text-[#717171] md:text-xl text-base mt-4'>You can use the calculator on our website or app to evaluate your
                            investment with us. Choose your preferred subscription and number of
                            devices to see the potential ROI</h1>
                    </Container>
                </section>
                <section className='py-16'>
                    <Container>
                        <section className="py-8 bg-gradient-to-b from-[#4cc8a76b] to-transparent rounded-2xl border-t-2 border-r-2 border-l-2 border-primary">
                            <div className="flex flex-col md:w-[90%] w-[95%] mx-auto">
                                <div className="flex mx-auto flex-row-reverse justify-between gap-2 lg:flex-col mb-7">
                                    <div className="flex justify-center items-start mb-5">
                                        <div className="flex flex-col xxs:flex-row gap-1 p-[2px] lg:gap-2 lg:p-2 border border-[#DCDCDC] rounded-2xl xxs:rounded-full">
                                            {buttonPricePer.map((peroid, index) => (
                                                <button
                                                    key={index}
                                                    className={`${peroid.label === selectedPeroid.label ? 'bg-primary !text-black rounded-2xl xxs:rounded-full' : 'bg-transparent'} text-[#DCDCDC] px-8 py-3 `}
                                                    onClick={() => {
                                                        setSelectedPeroid(peroid)
                                                    }}
                                                >
                                                    {peroid.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className='flex md:flex-row flex-col w-full justify-between lg:gap-10 gap-5'>
                                    <div className="flex flex-col gap-7 w-full">
                                        <div className='md:text-3xl text-2xl'>Revenue Record</div>
                                        <div className="">
                                            <div className="text-2xl">
                                                {numeral(totalCapacityMin).format('0.0a')} - {numeral(totalCapacityMax).format('0.0a')} <small>KNKT</small>
                                            </div>
                                            <div className="text-slate-300 text-sm">
                                                Aprox ~{(totalCapacityMin / KNKT_TO_DOLLAR).toFixed(2)}$ - {(totalCapacityMax / KNKT_TO_DOLLAR).toFixed(2)}$
                                            </div>
                                        </div>
                                        <div className="flex flex-col sm:flex-row gap-5">
                                            <button
                                                className="flex-none p-3 lg:p-4 rounded-xl bg-gradient-to-b from-primary from-100% to-blue-600 to-10% hidden md:block"
                                            >
                                                <div className="">
                                                    <img
                                                        src="/calculator/rounded-dollar.svg"
                                                        className="w-[28px] h-auto lg:w-[34px]"
                                                    />
                                                </div>
                                            </button>
                                            <Select
                                                className='bg-transparent'
                                                onChange={(e: any) => {
                                                    if (subscriptionQuery.isSuccess && subscriptionQuery.data) {
                                                        setSelectedSubscription(subscriptionQuery.data[e.target.value])
                                                    }
                                                }}
                                                fullWidth
                                            >
                                                {subscriptionQuery.isSuccess && subscriptionQuery.data.map((subsciption, i) => (
                                                    <MenuItem key={i}
                                                        id={i + ""}
                                                        value={i}>{subsciption.name} | price/Lifetime: {subsciption.price_yearly}$</MenuItem>
                                                ))}
                                            </Select>
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <div className='text-primary mb-2'>
                                                Note:
                                            </div>
                                            {subscriptionQuery.isSuccess && subscriptionQuery.data.sort((a, b) => a.device_limit - b.device_limit).map((subsciption, i) => (
                                                <div
                                                    id="subscription-option"
                                                    className='text-sm flex gap-1'
                                                >
                                                    {subsciption.name} subscription is limited to {" "}
                                                    <div className="text-primary">
                                                        {subsciption.device_limit} device{subsciption.device_limit > 0 ? 's' : ''}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className='w-full relative'>
                                        <div className='flex flex-col gap-2'>
                                            <div className='md:text-3xl text-2xl'>Device model</div>
                                            {devicesQuery.isSuccess && devicesQuery.data.map((deviceModal, i) => (
                                                <div
                                                    id={deviceModal.slug}
                                                    key={i}
                                                    className="flex md:gap-4"
                                                >
                                                    <div className='flex w-full h-min my-auto gap-3 p-2 rounded-2xl bg-[#071f1a46]'>
                                                        <div className='bg-[#1C2220] h-min  rounded-xl'>
                                                            <img
                                                                // src="/calculator/stacking-rack.svg"
                                                                src={deviceModal.image}
                                                                className="w-20"
                                                            />
                                                        </div>
                                                        <div>
                                                            <div className="head-model-1">
                                                                Model : <span className="text-primary">{deviceModal.name}</span>
                                                            </div>
                                                            <span className="body-bandwith rgba-040">
                                                                Bandwidth : {deviceModal.workload_capacity}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="scale-75 md:scale-90">
                                                        <span className="">
                                                            Count
                                                        </span>
                                                        <Autocomplete renderInput={(params) => <TextField {...params} />} getOptionLabel={(o) => o + ""} onChange={(_, value: any) => {
                                                            if (selectedSubscription) {
                                                                if (selectedSubscription?.device_limit > deviceCount) {
                                                                    setSelectedDevices(old => ({ ...old, [deviceModal.id]: { count: +value, deivce: deviceModal } }))
                                                                } else {
                                                                    setSelectedDevices(undefined)
                                                                    enqueueSnackbar(`Device Limit for this subscription is ${selectedSubscription?.device_limit}`, { variant: "warning" });
                                                                }
                                                            } else {
                                                                enqueueSnackbar('Please select a subscription first', { variant: "warning" });
                                                            }
                                                            // Clears the fouces after an element after a count is selected.
                                                            if (document && document.activeElement) {
                                                                (document as any).activeElement?.blur();
                                                            }
                                                        }} defaultValue={0} value={selectedDevices ? selectedDevices[deviceModal.id]?.count : 0} options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} className='bg-gradient-to-b  from-[#4cc8a77a] to-transparent w-20' />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </Container>
                </section>
            </main>
        </>
    )
}

Calculator.getLayout = function getLayout(page: JSX.Element) {
    return <Layout>{page}</Layout>
};

export default Calculator