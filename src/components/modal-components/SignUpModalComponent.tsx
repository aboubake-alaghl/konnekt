import useAuth from '@/hooks/useAuth';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField, IconButton, Checkbox, FormGroup, FormControlLabel, Button } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { object, string, boolean } from 'yup';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LoginModalComponent from './LoginModalComponent';
import Link from 'next/link';
import LoadingButton from '@mui/lab/LoadingButton';

const SignUpModalComponent: React.FC<{
    setModalComponent: any
    onExit: () => void
}> = ({ setModalComponent, onExit }) => {
    const { register: signUp } = useAuth();
    const RegistrationSchema = object().shape({
        email: string().email('Email must be a valid email address').required('Email is required'),
        password1: string().label('Password').required('Password is required').min(12).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, "At least 12 characters. uppercase, lowercase, numbers and special characters"),
        password2: string().label('Confirm Password').required('Confirm Password is required').min(12).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, "At least 12 characters. uppercase, lowercase, numbers and special characters"),
        first_name: string().required('First Name is required'),
        last_name: string().required('Last Name is required'),
        referrer_code: string().default(undefined).notRequired().nullable(),
        is_agree: boolean().default(false)
    });

    const { watch, handleSubmit, register, setError, clearErrors, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(RegistrationSchema),
    });
    const is_agree = watch('is_agree');

    const [showPassword, setShowPassword] = useState(false);
    return (
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
                enqueueSnackbar("Please Verify your email address", { variant: "info" });
                onExit();
            } catch (error: any) {
                const message = (Array.isArray(error?.errors) && error?.errors[0]) ? error?.errors[0] : "Error occurred";
                enqueueSnackbar(message, { variant: "error" });
            }
        })} className='py-5 px-12 text-center gap-4 bg-gradient-to-b from-[#ffffff28] to-transparent rounded-2xl flex flex-col'>
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
                <TextField error={!!errors?.referrer_code} helperText={errors?.referrer_code?.message} placeholder='Enter Referral Code (Optional)' InputProps={{
                    startAdornment: <img className='mr-2' src='/auth/signup/refcode.svg' />
                }} fullWidth {...register('referrer_code')} />
            </div>
            <div className=' gap-3'>
                <FormGroup>
                    <FormControlLabel control={<Checkbox defaultChecked {...register('is_agree')} />} label={<div>Yes, I agree to the <Link className='text-primary underline' href="/docs/website/privacy_policy">privacy policy</Link></div>} />
                </FormGroup>
            </div>
            <LoadingButton variant='contained' disabled={!is_agree} loading={isSubmitting} type='submit' className={`text-black bg-primary px-6 py-2 rounded-full transition-all cursor-pointer hover:opacity-90 `}>Signup</LoadingButton>
            <div className='flex mx-auto gap-2'>
                <div className='opacity-70'>Already have an account?</div>
                <div onClick={() => {
                    setModalComponent(<LoginModalComponent onExit={onExit} setModalComponent={setModalComponent} />);
                }} className='text-primary cursor-pointer'>Login</div>
            </div>
            {/* <div className='opacity-70'>By lobby the button above, you agree to our Terms of Service and Privacy Policy.</div> */}
        </form>
    )
}

export default SignUpModalComponent