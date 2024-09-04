import React, { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { confirmResetPassword } from '@/api/User';
import Guest from '@/layouts/Guest';
import { Container, IconButton, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

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

    return (
        <>
            <Head>
                <title>{"KonnektVPN - Confirm Reset Password"}</title>
            </Head>
            <Container>
                <div className="flex justify-center">
                    <div className="w-full my-32 text-primary">
                        <form
                            className="shadow-md rounded-xl md:rounded-3xl px-3 py-8 md:px-16 md:py-10 mb-3 bg-gradient-to-b from-[#1A2723] to-[#141414] border-t-[0.5px] border-primary"
                            onSubmit={handleSubmit(async (data) => {
                                if (data.new_password1 !== data.new_password2) {
                                    enqueueSnackbar('Passwords Must Match', {
                                        variant: "error"
                                    });
                                    return;
                                }
                                try {
                                    confirmResetPassword<{
                                        detail: string
                                    }>({
                                        new_password1: data.new_password1,
                                        new_password2: data.new_password2,
                                        token,
                                        uid
                                    }).then(({ data }) => {
                                        enqueueSnackbar(data?.detail || "Password Reset Successfully", { variant: "success" })
                                        setTimeout(() => {
                                            push("/");
                                        }, 3000);
                                    }).catch((e: { errors: string[] }) => {
                                        if (e?.errors) {
                                            e.errors.forEach((message) => {
                                                enqueueSnackbar(message, { variant: "error" })
                                            })
                                            return;
                                        }
                                        enqueueSnackbar("Make Sure Card Info is currect and try again", { variant: "error" })
                                    })
                                } catch (error: any) {
                                    if (Array.isArray(error?.errors)) {
                                        error?.errors.forEach((message: any) => {
                                            enqueueSnackbar(message, { variant: "error" });
                                        });
                                    }
                                }
                            })}>
                            <p className="mb-4 md:mb-4  text-center">
                                Password Reset
                            </p>
                            <p className="my-4 md:my-4  text-center">
                                Enter your new Password below
                            </p>
                            <div className="my-4 md:my-7">
                                <label className="mb-2">
                                    New Password
                                </label>
                                <TextField
                                    {...register('new_password1')}
                                    id="new_password1"
                                    type={passwordVisable.new_password1 ? "password" : "text"}
                                    fullWidth
                                    placeholder="Type Your New Password Here"
                                    InputProps={{
                                        endAdornment: <IconButton onClick={() => {
                                            setPasswordVisable(old => ({ ...old, new_password1: !old.new_password1 }));
                                        }} >
                                            {!passwordVisable.new_password1 ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                        </IconButton>
                                    }}
                                />
                                {errors?.new_password1 ? <div className='text-red-400'>{errors?.new_password1?.message}</div> : undefined}
                            </div>
                            <div className="my-4 md:my-7">
                                <label
                                    className="mb-2"
                                >
                                    Confirm New Password
                                </label>
                                <TextField
                                    {...register('new_password2')}
                                    id="new_password2"
                                    type={passwordVisable.new_password2 ? "password" : "text"}
                                    className=""
                                    fullWidth
                                    placeholder="Type Your New Password Here"
                                    InputProps={{
                                        endAdornment: <IconButton onClick={() => {
                                            setPasswordVisable(old => ({ ...old, new_password2: !old.new_password2 }));
                                        }} className=''>
                                            {!passwordVisable.new_password2 ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                        </IconButton>
                                    }}
                                />
                                {errors?.new_password2 ? <div className='text-red-400'>{errors?.new_password2?.message}</div> : undefined}
                            </div>
                            <LoadingButton disabled={isSubmitSuccessful} loading={isSubmitting} type="submit" className='!rounded-full' variant='contained' fullWidth>
                                Save New Password
                            </LoadingButton>
                        </form>
                    </div>
                </div>
            </Container>
        </>
    )


}

Reset.getLayout = function getLayout(page: JSX.Element) {
    return <Guest>{page}</Guest>
};

export default Reset