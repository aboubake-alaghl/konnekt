import Dashboard from '@/layouts/Dashboard';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Head from 'next/head';
import React from 'react'

import useMuiModal from '@/hooks/useMuiModal';
import DeleteModalCompnent from '@/components/modal-components/DeleteComponent';

const DeleteAccount = () => {

    const { ModalComponent, setModalComponent, closeModal } = useMuiModal({
        width: 400,
        maxHeight: 550,
        p: 0,
        borderRadius: 5
    });

    return (
        <>
            <Head>
                <title>{"KonnektVPN - Delete Your Account"}</title>
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
            {ModalComponent}
            <Container>
                <div className='flex flex-col gap-3 bg-gradient-to-b from-[#1A2723] to-[#141414] border-t-[0.5px] border-primary rounded-xl p-5 mb-8'>
                    <div className="flex flex-col gap-4">
                        <span className="">Delete Your Account</span>
                        <div>Are you sure you want to delete this account? <div className='text-red-500 font-bold'>This action cannot be undone</div></div>
                        <div className="flex flex-col gap-4">

                            <div className="flex gap-2  items-center">
                                <Button color='error' variant='contained' onClick={() => {
                                    setModalComponent(<DeleteModalCompnent onExit={closeModal} />)
                                }} className='!rounded-full'>
                                    DELETE MY ACCOUNT
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

DeleteAccount.getLayout = function getLayout(page: JSX.Element) {
    return <Dashboard>{page}</Dashboard>
};


export default DeleteAccount