import { resetPassword } from '@/api/User';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import React from 'react'
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import LoginModalComponent from './LoginModalComponent';
import LoadingButton from '@mui/lab/LoadingButton';

const ForgotPasswordComponent: React.FC<{
    setModalComponent: any
    onExit: () => void
}> = ({ setModalComponent,onExit }) => {
    const { enqueueSnackbar } = useSnackbar();
    const ResetPasswordSchema = object().shape({
        email: string().email('Email must be a valid email address').required('Email is required'),
    });
    const { handleSubmit, register, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm({
        resolver: yupResolver(ResetPasswordSchema),
    });
    return (
        <form onSubmit={handleSubmit(async (data) => {
            try {
                await resetPassword({ email: data.email.toLowerCase() });
                enqueueSnackbar("Password reset e-mail has been sent.", { variant: "success" });
            } catch (error: any) {
                const message = (Array.isArray(error?.errors) && error?.errors[0]) ? error?.errors[0] : "Error occurred";
                enqueueSnackbar(message, { variant: "error" });
            }
        })} className='py-4 px-12 text-center gap-4 bg-gradient-to-b from-[#ffffff28] to-transparent rounded-2xl flex flex-col'>
            <img className='w-1/2 mx-auto' src="/logoWithText.svg" alt="" />
            <div className='flex flex-col gap-2'>
                <h1 className='text-3xl font-bold'>Forgot Password?</h1>
                <div className='opacity-50 text-sm'>
                    If you've forgotten your password, Enter your registered email to receive a reset link, and follow the instructions to set a new password, ensuring continued secure access to KonnektVPN's services.
                </div>
            </div>
            <div className='flex flex-col gap-3'>
                <div className='opacity-70 text-start'>Verification Email</div>
                <TextField error={!!errors?.email} helperText={errors?.email?.message} placeholder='Enter your email' InputProps={{
                    startAdornment: <img className='mr-2' src='/auth/login/sms.svg' />
                }} fullWidth {...register('email')} />
            </div>

            <LoadingButton variant='contained' loading={isSubmitting} disabled={isSubmitSuccessful} type='submit' className="text-black bg-primary px-6 py-2 rounded-full transition-all cursor-pointer hover:opacity-90">Request password reset</LoadingButton>
            <div className='flex mx-auto gap-2'>
                <div onClick={() => {
                    setModalComponent(<LoginModalComponent onExit={onExit} setModalComponent={setModalComponent} />)
                }} className='opacity-70 cursor-pointer'>Back to Sign in</div>
            </div>
        </form>
    )
}

export default ForgotPasswordComponent