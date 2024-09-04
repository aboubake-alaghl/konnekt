import Link from 'next/link';
import React, { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import Head from 'next/head';
import Guest from '@/layouts/Guest';
import useAuth from '@/hooks/useAuth';
import LoadingButton from '@mui/lab/LoadingButton';
import { Container, IconButton, TextField } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { resetPassword } from '@/api/User';
const Forgot = () => {
    const { enqueueSnackbar } = useSnackbar();
    const ResetPasswordSchema = object().shape({
        email: string().email('Email must be a valid email address').required('Email is required'),
    });

    const { handleSubmit, register, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm({
        resolver: yupResolver(ResetPasswordSchema),
    });
    // return (
    //     <>
    //         <Head>
    //             <title>{"KonnektVPN - Forget Password"}</title>
    //             <meta property="og:description"
    //                 content="KonnektVPN encrypts your internet connection and hides your IP address and location, making you much safer and more private online." />
    //             <meta property="twitter:card" content="summary_large_image" />
    //             <meta
    //                 name="description"
    //                 content="KonnektVPN encrypts your internet connection and hides your IP address and location, making you much safer and more private online."
    //             ></meta>
    //             <meta property="og:title" content="KonnektVPN" />
    //             <meta property="og:type" content="website" />
    //             <meta property="og:image" content="https://konnektvpn.com/logo.png" />
    //             <meta property="og:url" content="https://konnektvpn.com/" />
    //             <meta property="og:description"
    //                 content="KonnektVPN encrypts your internet connection and hides your IP address and location, making you much safer and more private online." />
    //         </Head>
    //         <main>
    //             <section>
    //                 <Container>
    //                     <form onSubmit={handleSubmit(async (data) => {
    //                         try {
    //                             await resetPassword({ email: data.email.toLowerCase() });
    //                             enqueueSnackbar("Password reset e-mail has been sent.", { variant: "success" });
    //                         } catch (error: any) {
    //                             const message = (Array.isArray(error?.errors) && error?.errors[0]) ? error?.errors[0] : "Error occurred";
    //                             enqueueSnackbar(message, { variant: "error" });
    //                         }
    //                     })} className='my-6 py-10 px-12 text-center gap-10 bg-gradient-to-b from-[#ffffff28] to-transparent rounded-2xl flex flex-col'>
    //                         <img className='w-1/2 mx-auto' src="/logoWithText.svg" alt="" />
    //                         <div className='flex flex-col gap-2'>
    //                             <h1 className='text-3xl font-bold'>Forgot Password?</h1>
    //                             <div className='opacity-50'>
    //                                 If you've forgotten your password, Enter your registered email to receive a reset link, and follow the instructions to set a new password, ensuring continued secure access to KonnektVPN's services.
    //                             </div>
    //                         </div>
    //                         <div className='flex flex-col gap-3'>
    //                             <div className='opacity-70 text-start'>Verification Email</div>
    //                             <TextField error={!!errors?.email} helperText={errors?.email?.message} placeholder='Enter your email' InputProps={{
    //                                 startAdornment: <img className='mr-2' src='/auth/login/sms.svg' />
    //                             }} fullWidth {...register('email')} />
    //                         </div>

    //                         <button disabled={isSubmitting} type='submit' className="text-black bg-primary px-6 py-2 rounded-full transition-all cursor-pointer hover:opacity-90">Request password reset</button>
    //                         <div className='flex mx-auto gap-2'>
    //                             <div className='opacity-70 cursor-pointer'>Back to Sign in</div>
    //                         </div>
    //                     </form>
    //                 </Container>
    //             </section>
    //         </main>
    //     </>
    // )
}

Forgot.getLayout = function getLayout(page: JSX.Element) {
    return <Guest>{page}</Guest>
};


export default Forgot