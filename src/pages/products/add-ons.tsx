import React from 'react'
import Layout from '@/layouts'
import Container from '@mui/material/Container';
import { useQuery } from '@tanstack/react-query';
import DeviceInterface from '@/interfaces/DeviceInterface';
import { indexDevices } from '@/api/devices';
import { CircularProgress } from '@mui/material';
import numeral from 'numeral';
import useCart from '@/hooks/useCart';
import { useRouter } from 'next/router';
import useAuth from '@/hooks/useAuth';
import useMuiModal from '@/hooks/useMuiModal';
import LoginModalComponent from '@/components/modal-components/LoginModalComponent';
import Store from '@/layouts/Store';
import isDev from '@/utils/isDev';

const getSpeed = (id: number) => {
    switch (id) {
        case 6:
            return "9000 - 12000";
        case 7:
            return "18000 - 24000";
        case 8:
            return "30000 - 40000";
        default:
            break;
    }
}

const Speeds = () => {
    const devicesQuery = useQuery<DeviceInterface[]>({
        queryKey: ['devices'],
        queryFn: () => indexDevices<DeviceInterface[]>().then(({ data }) => data),
    });

    const { addItem, hasItem } = useCart();
    const router = useRouter();
    const { isAuthenticated } = useAuth();
    const { ModalComponent, closeModal, setModalComponent } = useMuiModal({
        width: 400,
        maxHeight: 550,
        p: 0,
        borderRadius: 5
    });
    return (
        <main>
            {ModalComponent}
            <section className='py-32'>
                <Container>
                    <section className='relative flex flex-col'>
                        <div className='flex text-center flex-col gap-5 relative z-20'>
                            <h1 className='lg:text-5xl text-3xl font-bold'>Select your ADD-ON</h1>
                            <p className='md:text-base text-sm'>Choose the mining speed</p>
                        </div>
                        <img className='mx-auto md:w-3/5 lg:-mt-64 -mt-10 relative' src="/products/usbLayer.webp" alt="" />
                        <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-10 z-10 lg:-mt-80 -mt-48'>
                            {devicesQuery.isSuccess && devicesQuery.data.map((device) => {
                                if (isDev || (device.id === 6 || device.id === 7 || device.id === 8)) {
                                    const inCart = hasItem(device.id);
                                    return <div key={device.id} className={`from-[#181818] via-[#8a888842] to-[#181818] bg-gradient-to-r rounded-3xl flex flex-col gap-6 md:p-10 p-5 bg-cover bg-no-repeat min-h-96`}>
                                        <div className='flex justify-between'>
                                            <div className='flex gap-1'>
                                                <div>
                                                    <h1 className='font-bold text-3xl'>{device.name}</h1>
                                                    {/* <div className='text-xs text-primary'>Speed</div> */}
                                                </div>
                                            </div>
                                            <div className='flex'>
                                                <div className='text-primary text-3xl font-bold my-auto'>{numeral(device.price).format()}$</div>
                                            </div>
                                        </div>
                                        <div className='h-[2px] bg-white opacity-20' />
                                        <div className='flex flex-col gap-5 my-3'>
                                            {/* {device.specifications.map((spec) => (
                                        <div className='flex gap-3'>
                                            <img src={true ? "/check.svg" : "/uncheck.svg"} alt="" />
                                            <span className='text-sm my-auto'>{spec.name}</span>
                                        </div>
                                    ))} */}
                                            <div className='flex gap-3'>
                                                <img src={true ? "/check.svg" : "/uncheck.svg"} alt="" />
                                                <span className='text-sm my-auto'>{`Speed ${getSpeed(device.id)} Knkt/Day`}</span>
                                            </div>
                                        </div>
                                        <div className='mt-auto flex flex-col gap-2'>
                                            <div className='h-[2px] bg-white opacity-20 my-5' />
                                            {/* {subscriptionQuery.isLoading && <CircularProgress className='mx-auto' />} */}
                                            <button onClick={() => {
                                                if (isAuthenticated) {
                                                    if (!inCart) {
                                                        addItem({
                                                            id: device.id,
                                                            image: device.image,
                                                            name: device.name,
                                                            price: +device.price
                                                        }, 1);
                                                    }
                                                    router.push('/products/checkout')
                                                } else {
                                                    setModalComponent(<LoginModalComponent pushDashboard={false} onExit={closeModal} setModalComponent={setModalComponent} />)
                                                }
                                            }} className={`text-black px-6 py-2 rounded-2xl transition-all cursor-pointer hover:opacity-90 bg-primary`}>
                                                {inCart ? "Already In Cart" : "Add to cart"}
                                            </button>
                                        </div>
                                    </div>
                                }
                            })}
                            {devicesQuery.isLoading &&
                                <div className='flex'>
                                    <CircularProgress size={75} className='m-auto' />
                                </div>}
                        </div>
                    </section>
                </Container>
            </section>
        </main>
    )
}

Speeds.getLayout = function getLayout(page: JSX.Element) {
    return <Store>{page}</Store>
};

export default Speeds


