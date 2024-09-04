import { getMyCards, setDefaultCard } from '@/api/Profile';
import { checkCodeValidation } from '@/api/coupon';
import { BuySubscriptionInterface, buySubscribe } from '@/api/order';
import { getSubscription } from '@/api/subscription';
import AddNewCard from '@/components/modal-components/AddNewCard';
import useAuth from '@/hooks/useAuth';
import useMuiModal from '@/hooks/useMuiModal';
import CheckCodeValidationResponse from '@/interfaces/CheckCodeValidationResponse';
import MyCardsInterface from '@/interfaces/MyCardsInterface';
import { SubscriptionPlan } from '@/interfaces/SubscriptionProfileInterface';
import Layout from '@/layouts';
import LoadingButton from '@mui/lab/LoadingButton';
import { Container, TextField, useMediaQuery } from '@mui/material';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';
import React, { useMemo, useState } from 'react'

const Subscribe = () => {
    const { isAuthenticated } = useAuth();
    const [code, setCode] = useState("");
    const matches = useMediaQuery('(min-width:768px)');

    const myCardsQuery = useQuery<MyCardsInterface[]>({
        queryKey: ['my_cards'],
        queryFn: () => getMyCards<MyCardsInterface[]>().then(({ data }) => data),
        enabled: isAuthenticated,
        retry: false
    })
    const { query: { id }, push } = useRouter();

    const { ModalComponent, setModalComponent, closeModal } = useMuiModal({
        width: !matches ? "95%" : "auto",
        p: 0
    });

    const subscriptionQuery = useQuery<SubscriptionPlan>({
        queryKey: ['subscription', id],
        queryFn: () => getSubscription<SubscriptionPlan>(id as string).then(({ data }) => data),
        retry: false
    });

    const buySubscribtionMutation = useMutation<{ subscription_plan: number }, undefined, BuySubscriptionInterface>({
        mutationFn: (data) => buySubscribe<{ subscription_plan: number }>(data).then(({ data }) => data),
        onSuccess() {
            enqueueSnackbar("Successfully Subscribed", { variant: "success" })
            push('/')
        },
        onError(e: any) {
            if (e?.errors) {
                e.errors.forEach((message: any) => {
                    enqueueSnackbar(message, { variant: "error" })
                })
            } else {
                enqueueSnackbar("Error Occurred", { variant: "error" })
            }
            console.error(e);
        }
    })

    const checkCodeValidationMutation = useMutation<CheckCodeValidationResponse>({
        mutationFn: () => checkCodeValidation<CheckCodeValidationResponse>(code).then(({ data }) => data),
        onSuccess() {
            enqueueSnackbar(`Code ${code} is Valid!`, { variant: "success" })
        },
        onError(e: any) {
            if (e?.errors) {
                e.errors.forEach((message: any) => {
                    enqueueSnackbar(message, { variant: "error" })
                })
            } else {
                enqueueSnackbar("Error Occurred", { variant: "error" })
            }
            console.error(e);
        }
    })

    const defaultCard = myCardsQuery.isSuccess && myCardsQuery.data.find(card => card.is_default);

    const setDefaultCardMutation = useMutation<any, any, string, any>({
        mutationFn: (id) => setDefaultCard(id)
    })

    const priceWithPromo = useMemo(() => {
        if (subscriptionQuery.isSuccess && subscriptionQuery?.data && checkCodeValidationMutation.isSuccess && checkCodeValidationMutation.data?.amount && checkCodeValidationMutation.data?.type) {
            if (checkCodeValidationMutation.data?.type === 'currency') {
                return +subscriptionQuery.data.price_yearly - checkCodeValidationMutation.data.amount;
            } else if (checkCodeValidationMutation.data?.type === 'percentage') {
                return +subscriptionQuery.data.price_yearly - ((+subscriptionQuery.data.price_yearly / 100) * checkCodeValidationMutation.data.amount);
            }
        } else {
            return subscriptionQuery?.data?.price_yearly
        }
    }, [checkCodeValidationMutation?.data, subscriptionQuery?.data])

    return (
        <Container>
            <div className='flex flex-col mb-16'>
                {ModalComponent}
                <div className='text-4xl mt-16 text-white mx-auto md:py-10 py-6 font-bold'>Your Subscriptions Details</div>
                {subscriptionQuery.isSuccess && <>
                    <div className='text-white flex flex-col gap-2 md:p-10 p-3 bg-[#1E1E1E] rounded-xl border-primary border md:w-[60%] mx-auto'>
                        <div className='flex justify-between'>
                            <div className='text-lg'>Subscriptions Details</div>
                            {checkCodeValidationMutation.isSuccess && <div className='font-bold text-sm'>
                                <div>
                                    Code <span className='text-primary'>{checkCodeValidationMutation.data.code}</span> applied</div>
                                <div>Coupon Value: <span className='text-primary'>{checkCodeValidationMutation.data.type === 'currency' ? `${checkCodeValidationMutation.data.amount}$` : `${checkCodeValidationMutation.data.amount}%`}</span></div>
                            </div>}
                        </div>
                        <div className='flex md:gap-10 gap-4'>
                            <img className='w-32' src={`/${subscriptionQuery.data.name.toLowerCase()}Sub.svg`} alt={subscriptionQuery.data.name} />
                            <div className='flex flex-col gap-2'>
                                <div>Subscriptions Type: <span className='text-primary'>{subscriptionQuery.data.name}</span></div>
                                <div>Capacity: <span className='text-primary'>{subscriptionQuery.data.capacity} KNKT</span></div>
                                <div>Devices Limit: <span className='text-primary'>{subscriptionQuery.data.device_limit}</span></div>
                                <div className=''>Price: {priceWithPromo !== subscriptionQuery.data.price_yearly && <span className=' text-primary line-through'>{Number(subscriptionQuery.data.price_yearly)}$</span>} <span className={`${priceWithPromo !== subscriptionQuery.data.price_yearly ? "text-red-500" : "text-primary"} font-bold text-lg`}>{priceWithPromo}$</span></div>
                            </div>
                        </div>


                        {isAuthenticated ? <>
                            <div className='md:text-2xl text-lg mt-3'>Select Card</div>
                            {myCardsQuery.isSuccess && defaultCard &&
                                <RadioGroup onChange={async (data) => {
                                    try {
                                        await setDefaultCardMutation.mutateAsync(data.target.value);
                                        await myCardsQuery.refetch()
                                        enqueueSnackbar(`Card ending in ${defaultCard.last4} is set as the default card`, { variant: "success" });
                                    } catch (error) {
                                        console.log(error);
                                        enqueueSnackbar("Error setting the default card", { variant: "error" });
                                    }
                                }} defaultValue={defaultCard.id} value={defaultCard.id}>
                                    <List className="max-h-28 overflow-auto" >
                                        {myCardsQuery.data.sort((a, b) => +a.exp_year - +b.exp_year).map((card) => (
                                            <React.Fragment key={card.id}>
                                                <ListItem className={setDefaultCardMutation.isPending ? "opacity-30" : ""}>
                                                    {
                                                        <div className='flex'>
                                                            <img className='w-10 h-6 my-auto' src={`/${card.brand.toLowerCase()}.webp`} alt="" />
                                                            <Radio value={card.id} title={`**** **** **** ${card.last4}`} />
                                                            <div className='my-auto'>{`**** **** **** ${card.last4}`}</div>
                                                        </div>
                                                    }
                                                </ListItem>
                                            </React.Fragment>
                                        ))}
                                    </List>
                                </RadioGroup>}
                            <div className='mt-3'>
                                <div className='flex gap-3'>
                                    {/* <div className='my-auto'>Promo Code</div> */}
                                    <TextField onChange={(e) => setCode(e.target.value)} label='Promo Code' size='small' placeholder='Promo Code' />
                                    <LoadingButton disabled={!code} loading={checkCodeValidationMutation.isPending} onClick={() => {
                                        checkCodeValidationMutation.mutate();
                                    }} className='!rounded-full' variant='outlined'>Validate</LoadingButton>
                                </div>
                            </div>
                            <div className='my-2'>
                                <Button variant='outlined' className='border border-solid px-5 py-1 border-green-400 !rounded-full' onClick={() => {
                                    setModalComponent(<AddNewCard onExit={() => {
                                        myCardsQuery.refetch();
                                        setTimeout(() => {
                                            closeModal();
                                        }, 4000);
                                    }} />)
                                }}>Add New Card</Button>
                            </div>
                            <LoadingButton variant='outlined' className='bg-knkt-primary-green !rounded-full'
                                loading={buySubscribtionMutation.isPending}
                                disabled={buySubscribtionMutation.isSuccess || (!!code && !checkCodeValidationMutation.isSuccess)}
                                onClick={() => {
                                    buySubscribtionMutation.mutate({ subscription_plan: id as any, promo_code: checkCodeValidationMutation.data?.code });
                                }}>Confirm Subscription</LoadingButton>
                        </> : <div>Please Sign in first</div>}
                    </div>
                </>}
            </div>
        </Container>
    )
}

Subscribe.getLayout = function getLayout(page: JSX.Element) {
    return <Layout>{page}</Layout>
};

export default Subscribe