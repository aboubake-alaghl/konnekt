import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import { SxProps } from '@mui/material';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    maxHeight: '97.5%',
    // width: "90%",
    overflow: "auto",
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    // border: '2px solid #EBE9F1',
    boxShadow: 24,
    p: 4
};

const useMuiModal = (sxProps: SxProps = {}) => {
    const [open, setIsModalOpen] = useState(false);
    const [Component, setComponent] = useState<any>();
    const [closeRequested, setCloseRequested] = useState(1);

    const setModalComponent = (component: JSX.Element) => {
        setComponent(() => {
            setIsModalOpen(true);
            return component;
        })
    }

    return {
        ModalComponent: <Modal
            sx={{
                border: 'none',
                borderWidth: "0px",
                overflow: "auto",
            }}
            open={open}
            onClose={() => {
                if (closeRequested === 2) {
                    setCloseRequested(1);
                    setIsModalOpen(false);
                } else {
                    setCloseRequested(old => old + 1);
                }
            }}

            disablePortal
            disableEnforceFocus
            disableAutoFocus

            closeAfterTransition
            slots={{
                backdrop: Backdrop
            }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                } as any
            }}
        >
            <Fade in={open}>
                <Box sx={{ ...style, ...sxProps }}>
                    {/* <IconButton onClick={() => {
                        setIsModalOpen(false);
                    }} size='small' sx={{
                        position: "absolute",
                        top: 1,
                        left: 1,
                    }} >
                        <CloseIcon fontSize='small' />
                    </IconButton> */}
                    {Component}
                </Box>
            </Fade>
        </Modal>,
        setModalComponent,
        closeModal: () => {
            setIsModalOpen(false);
        }
    }
}

export default useMuiModal;