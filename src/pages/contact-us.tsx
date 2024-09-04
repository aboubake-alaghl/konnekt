import { postContactUs } from '@/api/contactus';
import socialMediaIcons from '@/data/socialMediaIcons';
import Layout from '@/layouts';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { enqueueSnackbar } from 'notistack';
import React from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';

const Contactus = () => {

    const { executeRecaptcha } = useGoogleReCaptcha();

    const contactUsSchema = object().shape({
        name: string().required('Name is required'),
        email: string().email('Email must be a valid email address').required('Email is required'),
        subject: string().required('Subject is required'),
        message: string().required('Message is required'),
        department: string().oneOf(['general', 'support', 'sales', 'ambassador', 'partners', 'marketing', 'legal']).required('Department is required'),
    });

    const { handleSubmit, register, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm({
        resolver: yupResolver(contactUsSchema)
    });

    return (
        <>
            <main>
                <section className='py-24'>
                    <Container>
                        <div className='flex flex-col lg:flex-row gap-20'>
                            <div className='lg:w-1/2 my-auto gap-8 flex flex-col'>
                                <h1 className='md:text-5xl text-4xl'>Get in <span className='text-primary'>touch</span></h1>
                                <div className='w-3/4'>We're here to help with any questions or feedback you have about KonnektVPN..</div>
                                <div className='flex flex-col gap-3'>
                                    <div className='flex gap-4'>
                                        <img src="/email.webp" alt="" />
                                        <div className='text-primary'>Email</div>
                                    </div>
                                    {/* <div>At vero eos et accusamus et </div> */}
                                    <div><a href="mailto:Info@konnektvpn.com">Info@konnektvpn.com</a>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-3'>
                                    <div className='flex gap-4'>
                                        <img src="/phone.webp" alt="" />
                                        <div className='text-primary'>Phone</div>
                                    </div>
                                    {/* <div>At vero eos et accusamus et </div> */}
                                    <div>Office: <a href="tel:+1 (534) 344-5846">+1 (534) 344-5846</a></div>
                                </div>
                                <div className='h-[2px] rounded-full bg-primary w-full' />
                                <div className='grid grid-cols-5 gap-y-5'>
                                    {socialMediaIcons.map(({ icon, link }, index) => (
                                        <a target='_blank' href={link} key={index}>
                                            <img className='w-8' src={icon} alt="" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                            <form onSubmit={handleSubmit(async (data) => {
                                if (!executeRecaptcha) {
                                    console.log('Recaptcha not available!');
                                    enqueueSnackbar('Recaptcha Error!', { variant: "warning" });
                                    return;
                                }

                                try {
                                    const recaptchaToken = await executeRecaptcha("contactUsSubmit");
                                    await postContactUs({
                                        ...data,
                                        recaptchaToken
                                    });
                                    // IF SUCCESS
                                    enqueueSnackbar(`Message sent successfully to the ${data.department} team`, { variant: "success" });
                                } catch (error: any) {
                                    const message = (Array.isArray(error?.errors) && error?.errors[0]) ? error?.errors[0] : "Error occurred";
                                    enqueueSnackbar(message, { variant: "error" });
                                }
                            })} className='bg-contactUsFormSection-image sm:bg-cover bg-contain bg-no-repeat lg:w-1/2 p-10 flex flex-col gap-5'>
                                <div className='text-[#C1C1C1] flex flex-col gap-1'>
                                    {/* <h1 className='text-center text-3xl'>Lorem ipsum dolor </h1> */}
                                    {/* <div className='text-center '>Lorem ipsumLorem ipsum dolor  dolor </div> */}
                                </div>
                                <div>
                                    <div>Full Name</div>
                                    <TextField error={!!errors?.name} helperText={errors?.name?.message} placeholder='Full Name' fullWidth {...register('name')} />
                                </div>
                                <div>
                                    <div>Email Address</div>
                                    <TextField error={!!errors?.email} helperText={errors?.email?.message} placeholder='Email Address' fullWidth {...register('email')} />
                                </div>
                                <div>
                                    <div>Subject</div>
                                    <TextField error={!!errors?.subject} helperText={errors?.subject?.message} placeholder='Subject' fullWidth {...register('subject')} />
                                </div>
                                <div>
                                    <div>Department</div>
                                    <Select
                                        error={!!errors?.department}
                                        fullWidth

                                        label={!!errors?.department ? !!errors?.department.message : "Department"}
                                        {...register('department')}
                                    >
                                        <MenuItem value={'general'}>General</MenuItem>
                                        <MenuItem value={'support'}>Support</MenuItem>
                                        <MenuItem value={'sales'}>Sales</MenuItem>
                                        <MenuItem value={'ambassador'}>Ambassador</MenuItem>
                                        <MenuItem value={'partners'}>Partners</MenuItem>
                                        <MenuItem value={'marketing'}>Marketing</MenuItem>
                                        <MenuItem value={'legal'}>Legal</MenuItem>
                                    </Select>
                                </div>
                                <div>
                                    <div>Message</div>
                                    <TextField error={!!errors?.message} helperText={errors?.message?.message} multiline rows={4} placeholder='Message' fullWidth {...register('message')} />
                                </div>
                                <div>
                                    <LoadingButton disabled={isSubmitSuccessful} loading={isSubmitting} type='submit' fullWidth className='!rounded-full' variant='contained'>Submit</LoadingButton>
                                </div>
                            </form>
                        </div>
                    </Container>
                </section>
            </main>
        </>
    )
}

Contactus.getLayout = function getLayout(page: JSX.Element) {
    return <Layout>{page}</Layout>
};

export default Contactus