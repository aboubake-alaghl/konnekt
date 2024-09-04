import Dashboard from '@/layouts/Dashboard';
import { Button, CircularProgress, Container, Skeleton, useMediaQuery } from '@mui/material';
import React, { useEffect } from 'react'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import VerifiedIcon from '@mui/icons-material/Verified';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { useMutation, useQuery } from '@tanstack/react-query';
import useAuth from '@/hooks/useAuth';
import MyTokensInterface from '@/interfaces/MyTokensInterface';
import MyDevicesInterface from '@/interfaces/MyDevicesInterface';
import SubscriptionProfileInterface from '@/interfaces/SubscriptionProfileInterface';
import MyReferredUsersInterface from '@/interfaces/MyReferredUsersInterface';
import { currentSubscription, getMiningSpeed, getMyReferralUsers, getMyTokens } from '@/api/Profile';
import { getMyDevices } from '@/api/devices';
import { resendEmail } from '@/api/User';
import { enqueueSnackbar } from 'notistack';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import LoadingButton from '@mui/lab/LoadingButton';
import MiningSpeedInterface from '@/interfaces/MiningSpeedInterface';
import axios from 'axios';
import CoinGeckoKNKTPrice from '@/interfaces/CoinGeckoKNKTPrice';
import Link from 'next/link';
import SubscriptionInterface from '@/interfaces/SubscriptionInterface';
import { indexSubscriptions } from '@/api/subscription';
import useMuiModal from '@/hooks/useMuiModal';
import SwapCalulatorComponent from '@/components/modal-components/SwapCalulatorComponent';
const Index = () => {
  const { user } = useAuth();
  const matches600 = useMediaQuery('(min-width:600px)');
  const { ModalComponent, setModalComponent, closeModal } = useMuiModal({
    width: 500
  });

  const myTokensQuery = useQuery<MyTokensInterface>({
    queryKey: ['tokens'],
    queryFn: () => getMyTokens<MyTokensInterface>().then(({ data }) => data),
    retry: false
  });

  const getMiningSpeedQuery = useQuery<MiningSpeedInterface>({
    queryKey: ['mining_speed'],
    queryFn: () => getMiningSpeed<MiningSpeedInterface>().then(({ data }) => data),
    retry: false
  });

  const getKNKTPriceQuery = useQuery<CoinGeckoKNKTPrice>({
    queryKey: ['knkt_price'],
    queryFn: () => axios<CoinGeckoKNKTPrice>('https://api.coingecko.com/api/v3/simple/price?ids=konnektvpn&vs_currencies=usd').then(({ data }) => data),
    retry: false
  });

  const myDevicesQuery = useQuery<MyDevicesInterface[]>({
    queryKey: ['my_devices'],
    queryFn: () => getMyDevices<MyDevicesInterface[]>().then(({ data }) => data),
    retry: false
  });

  const mySubscriptionQuery = useQuery<SubscriptionProfileInterface>({
    queryKey: ['my_subscription'],
    queryFn: () => currentSubscription<SubscriptionProfileInterface>().then(({ data }) => data),
    retry: false
  });

  const MyReferredUsersQuery = useQuery<MyReferredUsersInterface>({
    queryKey: ['my_referred_users'],
    queryFn: () => getMyReferralUsers<MyReferredUsersInterface>().then(({ data }) => data),
    retry: false
  });

  const subscriptionQuery = useQuery<SubscriptionInterface[]>({
    queryKey: ['subscriptions'],
    queryFn: () => indexSubscriptions<SubscriptionInterface[]>().then(({ data }) => data),
  })

  const nextSubscription = subscriptionQuery.isSuccess && mySubscriptionQuery.isSuccess && subscriptionQuery.data.sort((a, b) => a.device_limit - b.device_limit).find(sub => sub.device_limit > mySubscriptionQuery.data.subscription_plan.device_limit);

  const resendEmailMutation = useMutation<{ detail: string }, undefined, { email: string }>({
    mutationFn: ({ email }) => resendEmail<{ detail: string }>({ email }).then(({ data }) => data),
    onSuccess() {
      enqueueSnackbar("Email Resent", { variant: "info" })
    },
    onError(e: any) {
      if (e?.errors) {
        e.errors.forEach((message: any) => {
          enqueueSnackbar(message, { variant: "error" })
        })
      }
      console.error(e);
    },
  })

  const onlineDevices = myDevicesQuery.isSuccess && myDevicesQuery.data.filter(device => device.is_online).length;
  const offlineDevices = myDevicesQuery.isSuccess && myDevicesQuery.data.filter(device => !device.is_online).length;

  const handleCopy = () => {
    navigator.clipboard.writeText(user?.referral_code || "")
      .then(() => {
        enqueueSnackbar('Referral code copied to clipboard', {
          variant: "info"
        });
      })
      .catch((error) => {
        enqueueSnackbar('Error copying referral code ' + error, {
          variant: "error"
        });
        console.error("Error copying referral code:", error);
      });
  };

  return (
    <main className='mb-8'>
      {ModalComponent}
      <Container>
        <section className='grid lg:grid-cols-12 gap-3'>
          <div className='flex flex-col gap-4 bg-gradient-to-b from-[#1A2723] to-[#141414] border-t-[0.5px] border-primary rounded-xl p-5 sm:col-span-3 col-span-6 '>
            <img className='w-20 mx-auto rounded-full' src={user?.profile?.photo ? user?.profile?.photo : "/dashboard/avatar.webp"} alt="" />
            <div className='mx-auto'>
              {!user?.is_verified && <LoadingButton className='!rounded-full' loading={resendEmailMutation.isPending} disabled={resendEmailMutation.isSuccess} onClick={() => {
                if (user && user?.email) {
                  if (resendEmailMutation.isSuccess || resendEmailMutation.isPending) {
                    enqueueSnackbar("Email sent already", { variant: "warning" });
                    return;
                  }
                  resendEmailMutation.mutate({ email: user.email })
                }
              }} variant='outlined'>Verfiy</LoadingButton>}
            </div>
            <div>{user?.email}</div>
            <div className='text-primary flex gap-2'>
              {user?.is_verified ? <>
                <VerifiedIcon />
                <div>Verified</div>
              </> : <>
                <NewReleasesIcon color='error' />
                <div className='text-red-600'>Not Verified</div>
              </>}
            </div>
          </div>

          {/* Subscriptions */}
          <div className='flex flex-col xxs:flex-row gap-6 bg-gradient-to-b from-[rgb(26,39,35)] to-[#141414] border-t-[0.5px] border-primary rounded-xl p-5 sm:col-span-3 col-span-6'>
            {/* HERE */}
            {mySubscriptionQuery.isSuccess && <img className='w-28 mx-auto xxs:mx-0' src={`/${mySubscriptionQuery.data?.subscription_plan.name.toLowerCase()}Sub.svg`} alt="" />}
            {mySubscriptionQuery.isLoading && <Skeleton variant='rectangular' className='my-auto' sx={{ height: 140, width: 200 }} />}
            <div className='my-auto text-center gap-2 flex flex-col'>
              <p className='text-primary font-bold'>Subscription</p>
              {mySubscriptionQuery.isSuccess && <h3 className='font-bold'>{mySubscriptionQuery.data.subscription_plan.name}</h3>}
              {mySubscriptionQuery.isLoading && <Skeleton variant='text' />}

              {/* <Link href={'/subscribe'}> */}
              {mySubscriptionQuery.isSuccess && nextSubscription &&
                // <Link href={`/subscribe?id=${nextSubscription.id}`}>
                <Link href={'/plans'}>
                  <Button className='!rounded-full' variant='outlined'>Upgrade</Button>
                </Link>
              }
              {/* </Link> */}
            </div>
          </div>

          {/* Devices */}
          <div className='flex flex-col gap-3 bg-gradient-to-b from-[#1A2723] to-[#141414] border-t-[0.5px] border-primary rounded-xl p-5 col-span-6 row-span-2'>
            <h1 className='text-center'>My Devices</h1>
            <div className='flex flex-col sm:flex-row sm:gap-0 gap-3 justify-between'>
              <div className='rounded-full px-4 py-2 justify-between gap-5 bg-gradient-to-b flex from-[#3A544C] to-[#333C39]'>
                <div className='my-auto'>{+offlineDevices}</div>
                <div className='text-sm text-center my-auto'>Devices On</div>
                <PowerSettingsNewIcon className='text-primary my-auto' />
              </div>
              <div className='sm:block hidden h-[2px] rounded-full w-9 my-auto bg-[#2C433C]'></div>
              <div className='font-bold text-2xl rounded-lg border-[1px] border-[#2C433C] px-6 text-center py-2'>
                {+onlineDevices + +offlineDevices}
              </div>
              <div className='sm:block hidden h-[2px] rounded-full w-9 my-auto bg-[#2C433C]'></div>
              <div className='rounded-full px-4 py-2 justify-between gap-5 bg-gradient-to-b flex from-[#3A544C] to-[#333C39]'>
                <div className='my-auto'>{+onlineDevices}</div>
                <div className='text-sm text-center my-auto'>Devices Off</div>
                <PowerSettingsNewIcon className='text-red-600 my-auto' />
              </div>
            </div>
            <h1 className='text-center'>Devices List</h1>
            <img className='w-full' src="/dashboard/frame.webp" alt="" />
            <div className='grid grid-cols-2 gap-2 max-h-80 overflow-auto'>
              {myDevicesQuery.isSuccess && myDevicesQuery.data.map((device, index) => (
                <div key={index} className='rounded-2xl bg-gradient-to-b from-[#3A554D] to-[#303735] pt-4 pl-4 text-xs'>
                  <div className='grid grid-cols-12'>
                    <div className='col-span-3'>
                      <div>Name</div>
                      <div>ID</div>
                      <div>Workload Capacity</div>
                    </div>
                    <div className='col-span-3'>
                      <div>{device.device.name}</div>
                      <div>{device.id}</div>
                      <div>{device.device.workload_capacity} KNKT/m</div>
                    </div>
                    <div className='col-span-6'>
                      <img src="/dashboard/device1.webp" alt="" />
                    </div>
                  </div>
                  <div className='w-full mt-2'>
                    <img src="/dashboard/frame.webp" className='m-auto' alt="" />
                  </div>
                </div>
              ))}

              {myDevicesQuery.isLoading && [1, 1, 1].map((_, index) => (
                <div key={index} className='rounded-2xl bg-gradient-to-b from-[#3A554D] to-[#303735] pt-4 pl-4 text-xs'>
                  <div className='grid grid-cols-12'>
                    <div className='col-span-3'>
                      <div>Name</div>
                      <div>ID</div>
                      <div>Workload Capacity</div>
                    </div>
                    <div className='col-span-3'>
                      <Skeleton variant='text' className='w-3/4' />
                      <Skeleton variant='text' className='w-3/4' />
                      <Skeleton variant='text' className='w-3/4' />
                    </div>
                    <div className='col-span-6'>
                      <Skeleton variant='rectangular' className='w-[90%]' sx={{ height: 70 }} />
                      {/* <img src="/dashboard/device1.webp" alt="" /> */}
                    </div>
                  </div>
                  <div className='w-full mt-2'>
                    <img src="/dashboard/frame.webp" className='m-auto' alt="" />
                  </div>
                </div>
              ))}
            </div>
          </div>


          <div className='flex flex-col xxs:flex-row xxs:text-left text-center  gap-6 bg-gradient-to-b from-[#1A2723] to-[#141414] border-t-[0.5px] border-primary rounded-xl p-5 sm:col-span-3 col-span-6'>
            <img className='w-16 h-16 m-auto xxs:mx-0' src="/dashboard/wallet.svg" alt="" />
            <div className='my-auto flex gap-1 flex-col'>
              {myTokensQuery.isSuccess && <h3 className='font-bold text-xl'>{+(myTokensQuery.data.knkt) - +(myTokensQuery.data.knkt_swapped)}</h3>}
              {myTokensQuery.isLoading && <Skeleton variant='text' />}
              {!matches600 ? <Link href={'/dashboard/swap'}><Button className='!rounded-full' variant='outlined'>Swap</Button></Link> : <Button onClick={() => {
                setModalComponent(<SwapCalulatorComponent onExit={closeModal} />);
              }} className='!rounded-full' variant='outlined'>Swap</Button>}
              {/* <Link href={'/dashboard/swap'}><Button className='!rounded-full' variant='outlined'>Swap</Button></Link> */}
            </div>
          </div>

          <div className='text-center flex flex-col gap-3 bg-gradient-to-b from-[#1A2723] to-[#141414] border-t-[0.5px] border-primary rounded-xl p-5 sm:col-span-3 col-span-6'>
            <div>Levels</div>
            {/* <Button variant='contained'>Level 2</Button> */}
            <div>
              <Link href={'/levels'}>
                <Button className='!rounded-full' variant='outlined'>Unlock</Button>
              </Link>
            </div>
          </div>

          <div className='flex flex-col gap-3 bg-gradient-to-b from-[#1A2723] to-[#141414] border-t-[0.5px] border-primary rounded-xl p-5 col-span-6 row-span-2'>
            <div className='flex justify-between'>
              <h1 className='text-primary'>Referral Code</h1>
              <img src="/dashboard/withdraw.webp" alt="" />
            </div>
            <div className='text-center'>
              <div className='text-2xl'>Balance</div>
              <div className='text-3xl my-4'>
                $ {user?.commission_from_referral}
              </div>
            </div>
            <div className='w-3/4 mx-auto bg-gradient-to-b rounded-xl from-[#242E2C] to-[#222826]'>
              <img className='w-full' src="/dashboard/frame.webp" alt="" />
              <div className='flex justify-between p-3 '>
                <div className='text-primary font-bold'>
                  {user?.referral_code}
                </div>
                <div onClick={handleCopy} className='text-textSecond cursor-pointer hover:text-primary'>
                  Copy
                </div>
              </div>
              <img className='w-full' src="/dashboard/frame.webp" alt="" />
            </div>
            <div>My Referrals</div>
            <div className='h-[2px] rounded-full w-full bg-primary' />
            <div className='flex flex-col gap-3 max-h-60 overflow-auto'>
              {MyReferredUsersQuery.isSuccess && MyReferredUsersQuery.data.results.map((row, index) => (
                <div className='bg-[#212421] rounded-2xl flex justify-between p-3' key={index}>
                  <div className='flex gap-2'>
                    <PersonOutlineOutlinedIcon />
                    <div>{row.email}</div>
                  </div>

                  <div className='flex gap-2'>
                    <div className='text-primary'>{Number(row.referral_commission).toFixed(2)}$</div>
                    <MoreHorizOutlinedIcon className='my-auto' />
                  </div>
                </div>
              ))}
              {MyReferredUsersQuery.isSuccess && MyReferredUsersQuery.data.count <= 0 && <div className='text-center'>No Referrals yet!</div>}

            </div>
          </div>

          <div className='flex flex-col gap-3 bg-gradient-to-b from-[#1A2723] to-[#141414] border-t-[0.5px] border-primary rounded-xl p-5 sm:col-span-3 col-span-6'>
            <h1 className='mx-auto text-primary  text-xl'>Mining Speed</h1>
            <div className='relative mx-auto'>
              <div className='absolute left-0 right-0 top-0 bottom-0 self-center justify-center flex flex-col items-center mx-auto'>
                {getMiningSpeedQuery.isSuccess && <div className='text-2xl font-bold'>{getMiningSpeedQuery.data?.knkt_per_minute}</div>}
                {getMiningSpeedQuery.isLoading && <Skeleton width={80} variant='text' />}
                <div className='text-xs text-textSecond'>KNKT<span className='text-xs'>/m</span></div>
              </div>
              <CircularProgress className='' size={150} value={50} variant="determinate" />
            </div>
          </div>

          <div className='gap-10 flex flex-col bg-gradient-to-b from-[#1A2723] to-[#141414] border-t-[0.5px] border-primary rounded-xl p-5 sm:col-span-3 col-span-6'>
            <h1 className='mx-auto text-primary  text-xl'>KPN Price</h1>
            <div className='font-bold text-4xl border-[0.5px] border-[#ffffff15] rounded-xl text-center p-5 '>
              {getKNKTPriceQuery.isLoading && <Skeleton variant='text' />}
              {getKNKTPriceQuery.isSuccess && <span>{Number(getKNKTPriceQuery.data.konnektvpn.usd).toFixed(4)}$</span>}
              {getKNKTPriceQuery.isError && <span className='text-red-500 text-center text-base'>Error Loading KPN Price</span>}
            </div>
            <div className='mx-auto'>
              <Button className='!rounded-full' variant='outlined'>Buy Now</Button>
            </div>
          </div>
        </section>
      </Container>
    </main>
  )
}

Index.getLayout = function getLayout(page: JSX.Element) {
  return <Dashboard>{page}</Dashboard>
};

export default Index