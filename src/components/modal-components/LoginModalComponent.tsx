import useAuth from '@/hooks/useAuth';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField, IconButton, Button } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import ForgotPasswordComponent from './ForgotPasswordComponent';
import SignUpModalComponent from './SignUpModalComponent';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LoadingButton from '@mui/lab/LoadingButton';
import { useRouter } from 'next/router';

const LoginModalComponent: React.FC<{
    setModalComponent: any
    onExit: () => void
    pushDashboard?: boolean
}> = ({ setModalComponent, onExit, pushDashboard = true }) => {
    const { login } = useAuth();
    const { push } = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const LoginSchema = object().shape({
        email: string().email('Email must be a valid email address').required('Email is required'),
        password: string().required('Password is required'),
    });

    const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(LoginSchema),
    });

    const [showPassword, setShowPassword] = useState(false);
    return (
        <>
            <form onSubmit={handleSubmit(async (data) => {
                try {
                    await login(data.email.toLowerCase(), data.password);
                    onExit();
                    if (pushDashboard) {
                        push('/dashboard');
                    }
                } catch (error: any) {
                    const message = (Array.isArray(error?.errors) && error?.errors[0]) ? error?.errors[0] : "Error occurred";
                    enqueueSnackbar(message, { variant: "error" });
                }
            })} className='py-5 px-12 text-center gap-4 bg-gradient-to-b from-[#ffffff28] to-transparent flex flex-col'>
                <img className='w-1/2 mx-auto' src="/logoWithText.svg" alt="" />
                <div className='flex flex-col gap-1'>
                    <h1 className='text-3xl font-bold'>Welcome back!</h1>
                    <div className='opacity-50 text-sm'>
                        Sign in to continue your secure KonnektVPN experience.
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <div className='opacity-70 text-start'>Email</div>
                    <TextField error={!!errors?.email} helperText={errors?.email?.message} placeholder='Enter your email' InputProps={{
                        startAdornment: <img className='mr-2' src='/auth/login/sms.svg' />
                    }} fullWidth {...register('email')} />
                </div>
                <div className='flex flex-col gap-2'>
                    <div className='opacity-70 text-start'>Password</div>
                    <TextField error={!!errors?.password} helperText={errors?.password?.message} type={showPassword ? "text" : "password"} placeholder='Enter password' InputProps={{
                        startAdornment: <img className='mr-2' src='/auth/login/lock.svg' />,
                        endAdornment: <IconButton onClick={() => setShowPassword(old => !old)}>
                            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                    }} fullWidth {...register('password')} />
                    <div onClick={() => {
                        setModalComponent(<ForgotPasswordComponent onExit={onExit} setModalComponent={setModalComponent} />)
                    }} className='text-primary text-end cursor-pointer'>Forgot Password?</div>
                </div>
                <LoadingButton variant='contained' loading={isSubmitting} type='submit' className="text-black bg-primary px-6 py-2 rounded-full transition-all cursor-pointer hover:opacity-90">Login</LoadingButton>
                <div className='flex mx-auto gap-2'>
                    <div className='opacity-70'>You dont have an account?</div>
                    <div onClick={() => {
                        setModalComponent(
                            <SignUpModalComponent onExit={onExit} setModalComponent={setModalComponent} />
                        )
                    }} className='text-primary cursor-pointer'>Sign up</div>
                </div>
            </form>
            {/* {ModalComponent} */}
        </>
    )
}

export default LoginModalComponent