import { currentSubscription } from "@/api/Profile"
import subs from "@/data/subs"
import useAuth from "@/hooks/useAuth"
import useMuiModal from "@/hooks/useMuiModal"
import SubscriptionInterface from "@/interfaces/SubscriptionInterface"
import SubscriptionProfileInterface from "@/interfaces/SubscriptionProfileInterface"
import { CircularProgress } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import LoginModalComponent from "../modal-components/LoginModalComponent"

const PlanComponent: React.FC<{
    subsciption: SubscriptionInterface
    index?: number;
}> = ({ subsciption, index }) => {

    const { isAuthenticated } = useAuth();
    const router = useRouter();
    const { ModalComponent, setModalComponent, closeModal } = useMuiModal({
        width: 400,
        maxHeight: 550,
        p: 0,
        borderRadius: 5
    });

    const subscriptionQuery = useQuery<SubscriptionProfileInterface>({
        queryKey: ['subscription', subsciption.id, isAuthenticated],
        queryFn: () => currentSubscription<SubscriptionProfileInterface>().then(({ data }) => data),
        retry: false
    });

    const isCurrentPlan = subscriptionQuery?.data?.subscription_plan.id === subsciption.id;
    const isAbove = subscriptionQuery.isSuccess && subscriptionQuery?.data?.subscription_plan.device_limit < subsciption.device_limit;
    const isBelow = subscriptionQuery.isSuccess && subscriptionQuery?.data?.subscription_plan.device_limit > subsciption.device_limit;

    return (
        <div className={`${isAbove ? "" : ""}from-[#181818] via-[#8a888842] to-[#181818] bg-gradient-to-r rounded-3xl flex flex-col gap-6 p-5 bg-cover bg-no-repeat min-h-[28rem]`}>
            {ModalComponent}
            <div className='flex justify-between'>
                <div className='flex gap-1'>
                    <img src={`/${subsciption.name.toLocaleLowerCase()}.svg`} alt="" />
                    <div>
                        <h1 className='font-bold text-xl'>{subsciption.name}</h1>
                        <div className='text-xs text-[#CECECE]'>{subsciption.capacity} <span >KNKT</span></div>
                    </div>
                </div>
                <div>
                    <div className='text-primary text-3xl font-bold my-auto'>{+subsciption.price === 0 ? "Free" : `${+subsciption.price}$`}</div>
                    <div className='text-xxs'>Lifetime</div>
                </div>
            </div>
            <div className='h-[2px] bg-white opacity-20' />
            <div className='flex flex-col gap-5'>
                <div className='text-center text-sm'>{subsciption.name.toLowerCase() === 'basic' ? "It includes the following features" : "Includes all of the basic features"} </div>
                {subsciption.features.map((title) => (
                    <div className='flex gap-3'>
                        <img src={true ? "/check.svg" : "/uncheck.svg"} alt="" />
                        <span className='text-sm my-auto'>{title.name}</span>
                    </div>
                ))}
            </div>
            <div className='mt-auto flex flex-col gap-2'>
                <div className='h-[2px] bg-white opacity-20' />
                {subscriptionQuery.isLoading && <CircularProgress className='mx-auto' />}
                {isAuthenticated && subscriptionQuery.isSuccess && (isCurrentPlan || isAbove) && <button onClick={() => {
                    if (!isCurrentPlan) {
                        if (!isAuthenticated) {
                            // router.push("/auth/login")
                        } else {
                            router.push(`/subscribe?id=${subsciption.id}`);
                        }
                    }
                }} className={`text-white px-6 py-2 rounded-full transition-all cursor-pointer hover:opacity-90 ${isAuthenticated && (isCurrentPlan) ? "bg-gray-500" : "bg-primary"}`}>
                    {isAuthenticated && (isCurrentPlan) ? "Current Plan" : isAbove ? "Upgrade" : "Select Plan"}
                </button>}
                {
                    !isAuthenticated && !subscriptionQuery.isLoading && <button onClick={() => {
                        setModalComponent(<LoginModalComponent onExit={closeModal} setModalComponent={setModalComponent} />)
                    }} className={`text-white px-6 py-2 rounded-full transition-all cursor-pointer hover:opacity-90 ${isAuthenticated && (isCurrentPlan) ? "bg-gray-500" : "bg-primary"}`}>
                        Select Plan
                    </button>
                }
            </div>

        </div>
    )
}

export default PlanComponent;