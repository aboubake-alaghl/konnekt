import { deleteAccount } from '@/api/User';
import Button from '@mui/material/Button';
import { useSnackbar } from 'notistack';
import React from 'react'
import { useForm } from 'react-hook-form';
import LoadingButton from '@mui/lab/LoadingButton';
import useAuth from '@/hooks/useAuth';

const DeleteModalCompnent: React.FC<{
    onExit: () => void
}> = ({ onExit }) => {
    const { enqueueSnackbar } = useSnackbar();
    const { logoutOffline } = useAuth();
    const { handleSubmit, formState: { isSubmitting, isSubmitSuccessful } } = useForm();
    return (
        <form onSubmit={handleSubmit(async () => {
            try {
                await deleteAccount();
                enqueueSnackbar("Account Deleted", { variant: "info" });
                setTimeout(() => {
                    logoutOffline();
                }, 3000)
            } catch (error: any) {
                const message = (Array.isArray(error?.errors) && error?.errors[0]) ? error?.errors[0] : "Error occurred";
                enqueueSnackbar(message, { variant: "error" });
            }
        })} className='py-4 px-12 text-center gap-4 bg-gradient-to-b from-[#ffffff28] to-transparent rounded-2xl flex flex-col'>
            <img className='w-1/2 mx-auto' src="/logoWithText.svg" alt="" />
            <div className='flex flex-col gap-2'>
                <h1 className='text-3xl font-bold'>Are you sure?</h1>
                <div className=' text-xl text-red-500 font-bold'>
                    This action is irreversible
                </div>
            </div>
            <div className='flex  gap-3'>
                <Button onClick={onExit} fullWidth variant='outlined'>Cancel</Button>
                <LoadingButton loading={isSubmitting} disabled={isSubmitSuccessful} type='submit' fullWidth color='error' variant='contained'>Confirm</LoadingButton>
            </div>
        </form>
    )
}

export default DeleteModalCompnent