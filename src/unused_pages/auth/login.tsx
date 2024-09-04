import React, { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import Head from 'next/head';
import Guest from '@/layouts/Guest';
import useAuth from '@/hooks/useAuth';
import { Container, IconButton, TextField } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import useMuiModal from '@/hooks/useMuiModal';
import SignUpModalComponent from '@/components/modal-components/SignUpModalComponent';
import ForgotPasswordComponent from '@/components/modal-components/ForgotPasswordComponent';
const Login = () => {
    const { login } = useAuth();
    const { enqueueSnackbar } = useSnackbar();
    const LoginSchema = object().shape({
        email: string().email('Email must be a valid email address').required('Email is required'),
        password: string().required('Password is required'),
    });

    const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(LoginSchema),
    });

    const [showPassword, setShowPassword] = useState(false);
    const { ModalComponent, setModalComponent } = useMuiModal({
        width: "60%"
    });

    // return (
    //     <>
    //         {ModalComponent}
    //         <Head>
    //             <title>{"KonnektVPN - Login"}</title>
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
    //                             await login(data.email.toLowerCase(), data.password);
    //                         } catch (error: any) {
    //                             const message = (Array.isArray(error?.errors) && error?.errors[0]) ? error?.errors[0] : "Error occurred";
    //                             enqueueSnackbar(message, { variant: "error" });
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
    //                             <div className='opacity-70 text-start'>Email</div>
    //                             <TextField error={!!errors?.email} helperText={errors?.email?.message} placeholder='Enter your email' InputProps={{
    //                                 startAdornment: <img className='mr-2' src='/auth/login/sms.svg' />
    //                             }} fullWidth {...register('email')} />
    //                         </div>
    //                         <div className='flex flex-col gap-3'>
    //                             <div className='opacity-70 text-start'>Password</div>
    //                             <TextField error={!!errors?.password} helperText={errors?.password?.message} type={showPassword ? "text" : "password"} placeholder='Enter password' InputProps={{
    //                                 startAdornment: <img className='mr-2' src='/auth/login/lock.svg' />,
    //                                 endAdornment: <IconButton onClick={() => setShowPassword(old => !old)}>
    //                                     {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
    //                                 </IconButton>
    //                             }} fullWidth {...register('password')} />
    //                             <div onClick={() => {
    //                                 setModalComponent(<ForgotPasswordComponent  setModalComponent={setModalComponent} />)
    //                             }} className='text-primary text-end cursor-pointer'>Forgot Password?</div>
    //                         </div>
    //                         <button disabled={isSubmitting} type='submit' className="text-black bg-primary px-6 py-2 rounded-full transition-all cursor-pointer hover:opacity-90">Login</button>
    //                         <div className='flex mx-auto gap-2'>
    //                             <div className='opacity-70'>You dont have an account?</div>
    //                             <div onClick={() => {
    //                                 setModalComponent(
    //                                     <SignUpModalComponent setModalComponent={setModalComponent} />
    //                                 )
    //                             }} className='text-primary'>Sign up</div>
    //                         </div>
    //                     </form>
    //                 </Container>
    //             </section>
    //         </main>
    //     </>
    // )
}

Login.getLayout = function getLayout(page: JSX.Element) {
    return <Guest>{page}</Guest>
};


export default Login