import Link from 'next/link';
import React, { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup';
import { boolean, object, string } from 'yup';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar, useSnackbar } from 'notistack';
import Head from 'next/head';
import Guest from '@/layouts/Guest';
import useAuth from '@/hooks/useAuth';
import LoadingButton from '@mui/lab/LoadingButton';
import { Container, IconButton, TextField } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Login = () => {
    const { register: signUp } = useAuth();
    const RegistrationSchema = object().shape({
        email: string().email('Email must be a valid email address').required('Email is required'),
        password1: string().label('Password').required('Password is required').min(12).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, "At least 12 characters. uppercase, lowercase, numbers and special characters"),
        password2: string().label('Confirm Password').required('Confirm Password is required').min(12).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, "At least 12 characters. uppercase, lowercase, numbers and special characters"),
        first_name: string().required('First Name is required'),
        last_name: string().required('Last Name is required'),
        referrer_code: string().default(undefined),
        is_agree: boolean().default(false)
    });

    const { watch, handleSubmit, register, setError, clearErrors, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(RegistrationSchema),
    });
    const is_agree = watch('is_agree');

    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <Head>
                <title>{"KonnektVPN - Register"}</title>
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
                <section>
                    <Container>
                        <form onSubmit={handleSubmit(async data => {
                            if (data.password1 !== data.password2) {
                                setError('password1', {
                                    message: "Passwords Must Match"
                                });
                                return;
                            }
                            clearErrors('password1');
                            try {
                                await signUp({
                                    ...data,
                                    email: data.email.toLowerCase(),
                                    referrer_code: data.referrer_code ? data.referrer_code : undefined
                                });
                                enqueueSnackbar("Sign up Successful", { variant: "success" });
                            } catch (error: any) {
                                const message = (Array.isArray(error?.errors) && error?.errors[0]) ? error?.errors[0] : "Error occurred";
                                enqueueSnackbar(message, { variant: "error" });
                            }
                        })} className='my-6 py-10 px-12 text-center gap-10 bg-gradient-to-b from-[#ffffff28] to-transparent rounded-2xl flex flex-col'>
                            <img className='w-1/2 mx-auto' src="/logoWithText.svg" alt="" />
                            <div className='flex flex-col gap-2'>
                                <h1 className='text-3xl font-bold'>Create new Account</h1>
                                {/* <div className='opacity-50'>
                                    Sign in to continue your secure KonnektVPN experience.
                                </div> */}
                            </div>
                            <div className='flex flex-col gap-3'>
                                <div className='opacity-70 text-start'>First Name</div>
                                <TextField error={!!errors?.first_name} helperText={errors?.first_name?.message} placeholder='John Doe' InputProps={{
                                    startAdornment: <img className='mr-2' src='/auth/signup/user.svg' />
                                }} fullWidth {...register('first_name')} />
                            </div>
                            <div className='flex flex-col gap-3'>
                                <div className='opacity-70 text-start'>Last Name</div>
                                <TextField error={!!errors?.last_name} helperText={errors?.last_name?.message} placeholder='John Doe' InputProps={{
                                    startAdornment: <img className='mr-2' src='/auth/signup/user.svg' />
                                }} fullWidth {...register('last_name')} />
                            </div>
                            <div className='flex flex-col gap-3'>
                                <div className='opacity-70 text-start'>Email Address</div>
                                <TextField error={!!errors?.email} helperText={errors?.email?.message} placeholder='Enter your email' InputProps={{
                                    startAdornment: <img className='mr-2' src='/auth/login/sms.svg' />
                                }} fullWidth {...register('email')} />
                            </div>
                            <div className='flex flex-col gap-3'>
                                <div className='opacity-70 text-start'>Password</div>
                                <TextField error={!!errors?.password1} helperText={errors?.password1?.message} type={showPassword ? "text" : "password"} placeholder='Enter password' InputProps={{
                                    startAdornment: <img className='mr-2' src='/auth/login/lock.svg' />,
                                    endAdornment: <IconButton onClick={() => setShowPassword(old => !old)}>
                                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                }} fullWidth {...register('password1')} />
                            </div>
                            <div className='flex flex-col gap-3'>
                                <div className='opacity-70 text-start'>Confirm Password</div>
                                <TextField error={!!errors?.password2} helperText={errors?.password2?.message} type={showPassword ? "text" : "password"} placeholder='Enter password' InputProps={{
                                    startAdornment: <img className='mr-2' src='/auth/login/lock.svg' />,
                                    endAdornment: <IconButton onClick={() => setShowPassword(old => !old)}>
                                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                }} fullWidth {...register('password2')} />
                            </div>
                            <div className='flex flex-col gap-3'>
                                <div className='opacity-70 text-start'>Referral Code</div>
                                <TextField error={!!errors?.referrer_code} helperText={errors?.referrer_code?.message} placeholder='Minimum 8 characters' InputProps={{
                                    startAdornment: <img className='mr-2' src='/auth/signup/refcode.svg' />
                                }} fullWidth {...register('referrer_code')} />
                            </div>
                            <button disabled={isSubmitting} type='submit' className="text-black bg-primary px-6 py-2 rounded-full transition-all cursor-pointer hover:opacity-90">Login</button>
                            <div className='flex mx-auto gap-2'>
                                <div className='opacity-70'>Already have an account?</div>
                                <div className='text-primary'><a href="">Login</a></div>
                            </div>
                            <div className='opacity-70'>By lobby the button above, you agree to our Terms of Service and Privacy Policy.</div>
                        </form>
                    </Container>
                </section>
            </main>
        </>
    )
}

Login.getLayout = function getLayout(page: JSX.Element) {
    return <Guest>{page}</Guest>
};


export default Login