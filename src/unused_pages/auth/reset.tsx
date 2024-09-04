import React, { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import Head from 'next/head';
import Dashboard from '@/layouts/Dashboard';
import { Container, IconButton, TextField } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useRouter } from 'next/router';
import { confirmResetPassword } from '@/api/User';

const Reset = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { query, push } = useRouter();

    const uid = query?.uid as string;
    const token = query?.token as string;

    const [passwordVisable, setPasswordVisable] = useState({
        new_password1: true,
        new_password2: true,
    });

    const PasswordConfirmSchema = object().shape({
        new_password1: string().label('Password').required('Password is required').min(12).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, "At least 12 characters. uppercase, lowercase, numbers and special characters"),
        new_password2: string().label('Confirm Password').required('Confirm Password is required').min(12).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, "At least 12 characters. uppercase, lowercase, numbers and special characters"),
    });

    const { handleSubmit, register, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm({
        resolver: yupResolver(PasswordConfirmSchema),
    });
    const [showPassword, setShowPassword] = useState(false);

    // return (
    //     <>
    //         <Head>
    //             <title>{"KonnektVPN - Confirm Reset Password"}</title>
    //         </Head>
    //         <main>
    //             <section>
    //                 <Container>
    //                     <form onSubmit={handleSubmit(async (data) => {
    //                         if (data.new_password1 !== data.new_password2) {
    //                             enqueueSnackbar('Passwords Must Match', {
    //                                 variant: "error"
    //                             });
    //                             return;
    //                         }
    //                         try {
    //                             confirmResetPassword<{
    //                                 detail: string
    //                             }>({
    //                                 new_password1: data.new_password1,
    //                                 new_password2: data.new_password2,
    //                                 token,
    //                                 uid
    //                             }).then(({ data }) => {
    //                                 enqueueSnackbar(data?.detail || "Password Reset Successfully", { variant: "success" })
    //                                 setTimeout(() => {
    //                                     push("/auth/login/");
    //                                 }, 3000);
    //                             }).catch((e: { errors: string[] }) => {
    //                                 if (e?.errors) {
    //                                     e.errors.forEach((message) => {
    //                                         enqueueSnackbar(message, { variant: "error" })
    //                                     })
    //                                     return;
    //                                 }
    //                                 enqueueSnackbar("Make Sure Card Info is currect and try again", { variant: "error" })
    //                             })
    //                         } catch (error: any) {
    //                             if (Array.isArray(error?.errors)) {
    //                                 error?.errors.forEach((message: any) => {
    //                                     enqueueSnackbar(message, { variant: "error" });
    //                                 });
    //                             }
    //                         }
    //                     })} className='my-6 py-10 px-12 text-center gap-10 bg-gradient-to-b from-[#ffffff28] to-transparent rounded-2xl flex flex-col'>
    //                         <img className='w-1/2 mx-auto' src="/logoWithText.svg" alt="" />
    //                         <div className='flex flex-col gap-2'>
    //                             <h1 className='text-3xl font-bold'>Welcome back!</h1>
    //                             <div className='opacity-50'>
    //                                 Sign in to continue your secure KonnektVPN experience.
    //                             </div>
    //                         </div>
    //                         <div className='flex flex-col gap-3'>
    //                             <div className='opacity-70 text-start'>Password</div>
    //                             <TextField error={!!errors?.new_password1} helperText={errors?.new_password1?.message} type={showPassword ? "text" : "password"} placeholder='Enter password' InputProps={{
    //                                 startAdornment: <img className='mr-2' src='/auth/login/lock.svg' />,
    //                                 endAdornment: <IconButton onClick={() => setShowPassword(old => !old)}>
    //                                     {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
    //                                 </IconButton>
    //                             }} fullWidth {...register('new_password1')} />
    //                         </div>
    //                         <div className='flex flex-col gap-3'>
    //                             <div className='opacity-70 text-start'>Confirm Password</div>
    //                             <TextField error={!!errors?.new_password2} helperText={errors?.new_password2?.message} type={showPassword ? "text" : "password"} placeholder='Confirm Password' InputProps={{
    //                                 startAdornment: <img className='mr-2' src='/auth/login/lock.svg' />,
    //                                 endAdornment: <IconButton onClick={() => setShowPassword(old => !old)}>
    //                                     {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
    //                                 </IconButton>
    //                             }} fullWidth {...register('new_password2')} />
    //                         </div>
    //                         <button disabled={isSubmitting} type='submit' className="text-black bg-primary px-6 py-2 rounded-full transition-all cursor-pointer hover:opacity-90">Save and Continue</button>
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

Reset.getLayout = function getLayout(page: JSX.Element) {
    return <Dashboard>{page}</Dashboard>
};


export default Reset