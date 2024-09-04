import { changePassword } from '@/api/User';
import Dashboard from '@/layouts/Dashboard';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { Container, IconButton, TextField } from '@mui/material';
import Head from 'next/head';
import { enqueueSnackbar } from 'notistack';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const ChangePassword = () => {
  const PasswordChangeSchema = object().shape({
    old_password: string().label('Old Password').required('Old Password is required').min(12).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, "At least 12 characters. uppercase, lowercase, numbers and special characters"),
    new_password1: string().label('Password').required('Password is required').min(12).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, "At least 12 characters. uppercase, lowercase, numbers and special characters"),
    new_password2: string().label('Confirm Password').required('Confirm Password is required').min(12).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, "At least 12 characters. uppercase, lowercase, numbers and special characters"),
  });
  const [showPassword, setShowPassword] = useState(false);

  const { handleSubmit, register, formState: { isSubmitting, errors } } = useForm({
    resolver: yupResolver(PasswordChangeSchema),
  });
  return (
    <>
      <Head>
        <title>{"KonnektVPN - Change Password"}</title>
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
      <Container>

        <div className='flex flex-col gap-3 bg-gradient-to-b from-[#1A2723] to-[#141414] border-t-[0.5px] border-primary rounded-xl p-5 mb-8'>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit(async (data) => {
            try {
              if (data.new_password1 !== data.new_password2) {
                enqueueSnackbar("Passwords must be the same", { variant: "warning" });
                return;
              }
              await changePassword(data);
              enqueueSnackbar("Password Changed Successfully!", { variant: "success" });
            } catch (error: any) {
              const message = (Array.isArray(error?.errors) && error?.errors[0]) ? error?.errors[0] : "Error occurred";
              enqueueSnackbar(message, { variant: "error" });
            }
          })}>
            <span className="body-1-normal">Change Password</span>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2 w-full">
                <label>
                  Old Password
                </label>
                <TextField type={showPassword ? "text" : "password"} InputProps={{
                  // startAdornment: <img className='mr-2' src='/auth/login/lock.svg' />,
                  endAdornment: <IconButton onClick={() => setShowPassword(old => !old)}>
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                }} {...register('old_password')} id="old_password"
                  className="border rounded-lg md:rounded-2xl w-full py-3 px-6 md:py-5 md:px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  error={!!errors?.old_password} helperText={errors?.old_password?.message} placeholder="Type Your Old Password Here" />
                {/* {errors?.old_password ? <div className='text-red-400'>{errors?.old_password?.message}</div> : undefined} */}
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex flex-col gap-2 w-full">
                  <label>
                    New Password
                  </label>
                  <TextField type={showPassword ? "text" : "password"} InputProps={{
                    // startAdornment: <img className='mr-2' src='/auth/login/lock.svg' />,
                    endAdornment: <IconButton onClick={() => setShowPassword(old => !old)}>
                      {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  }} {...register('new_password1')} id="new_password1"
                    className="border rounded-lg md:rounded-2xl w-full py-3 px-6 md:py-5 md:px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    error={!!errors?.new_password1} helperText={errors?.new_password1?.message} placeholder="Type Your New Password Here" />
                  {/* {errors?.new_password1 ? <div className='text-red-400'>{errors?.new_password1?.message}</div> : undefined} */}
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <label>
                    Confirm New Password
                  </label>
                  <TextField type={showPassword ? "text" : "password"} InputProps={{
                    // startAdornment: <img className='mr-2' src='/auth/login/lock.svg' />,
                    endAdornment: <IconButton onClick={() => setShowPassword(old => !old)}>
                      {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  }} {...register('new_password2')} id="new_password2"
                    className="border rounded-lg md:rounded-2xl w-full py-3 px-6 md:py-5 md:px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    error={!!errors?.new_password2} helperText={errors?.new_password2?.message} placeholder="Confirm Your New Password Here" />
                  {/* {errors?.new_password2 ? <div className='text-red-400'>{errors?.new_password2?.message}</div> : undefined} */}
                </div>
              </div>
              <div className="flex gap-2 justify-end items-center">
                <LoadingButton variant='contained' loading={isSubmitting} type="submit" className='!rounded-full'>
                  Change
                </LoadingButton>
              </div>
            </div>
          </form>
        </div>

      </Container>
    </>
  )
}

ChangePassword.getLayout = function getLayout(page: JSX.Element) {
  return <Dashboard>{page}</Dashboard>
};


export default ChangePassword