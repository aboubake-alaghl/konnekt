import React, { useEffect } from 'react'
import { object, string } from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useElements, useStripe } from '@stripe/react-stripe-js';
import { useSnackbar } from 'notistack';
import { addCard } from '@/api/order';
import useAuth from '@/hooks/useAuth';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';

const AddNewCard: React.FC<{ onExit?: () => void }> = ({ onExit = () => { } }) => {
    const addCardSchema = object().shape({
        name_on_card: string().label('Name On Card'),
        card_postal: string().label("Card Postal")
    });
    const { user } = useAuth();
    const { enqueueSnackbar } = useSnackbar();

    const methods = useForm({
        resolver: yupResolver(addCardSchema)
    });

    const { formState: { errors, isSubmitting, isSubmitSuccessful }, handleSubmit, register } = methods;

    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        if (user) {
            if (elements?.getElement('card')) {
                return;
            }
            const card = elements?.create('card', {
                style: {
                    base: {
                        color: "#fff"
                    },
                },
                value: {
                    postalCode: user.profile?.zipcode
                }
            });
            card?.mount('#card')
        }
    }, [user])

    useEffect(() => {
        const card = elements?.getElement('card');
        if (card) {
            return () => {
                card.destroy();
            }
        }
    }, [])

    return (

        <form onSubmit={handleSubmit((data) => {
            const card = elements?.getElement('card');
            if (card) {
                if (data.card_postal) {
                    card.update({
                        value: {
                            postalCode: data.card_postal
                        }
                    })
                }
                stripe?.createToken(card)
                    .then((d) => {
                        return addCard({ tok_id: d.token!.id })
                    })
                    .then((card: any) => {
                        enqueueSnackbar(card.data.message, { variant: "success" });
                        onExit();
                    }).catch((e: { errors: string[] }) => {
                        console.log(e);

                        if (e?.errors) {
                            e.errors.forEach((message) => {
                                enqueueSnackbar(message, {
                                    variant: "error",
                                    // persist: true,
                                })
                            })
                            return;
                        }
                        enqueueSnackbar("Make Sure Card Info is currect and try again", { variant: "error" })
                    })
            }
        })}>
            <div className='text-white flex flex-col gap-3 sm:mx-5 mx-3'>
                <div className='mt-2'>Card Number</div>
                <div className='mt-2 ' id='card'></div>
                <div className='flex  gap-2 mt-2'>
                    <TextField fullWidth variant='standard' size='small' label='Name on Card' placeholder='Name on Card' {...register('name_on_card')} />
                    <TextField fullWidth variant='standard' size='small' label='Postal Code' placeholder='Postal Code' {...register('card_postal')} />
                </div>
                <LoadingButton variant='contained' className='!rounded-full my-2' type='submit' loading={isSubmitting} disabled={isSubmitSuccessful} fullWidth>Save</LoadingButton>
                {!!errors && <div className='flex flex-col gap-2'>
                    {Object.values(errors).map(value => (
                        <Alert color="error">{value.message}</Alert>
                    ))}
                </div>}
            </div>
        </form>
    )
}

export default AddNewCard