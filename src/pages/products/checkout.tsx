import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import palette from '@/theme/palette';
import truncateString from '@/utils/truncateString';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import Link from 'next/link';
import useCart from '@/hooks/useCart';
import MyCardsInterface from '@/interfaces/MyCardsInterface';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getMyCards, setDefaultCard } from '@/api/Profile';
import useAuth from '@/hooks/useAuth';
import { object, string } from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import Switch from '@mui/material/Switch';
import { enqueueSnackbar } from 'notistack';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import FormControlLabel from '@mui/material/FormControlLabel';
import ListItem from '@mui/material/ListItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import useMuiModal from '@/hooks/useMuiModal';
import AddNewCard from '@/components/modal-components/AddNewCard';
import LoadingButton from '@mui/lab/LoadingButton';
import { buyDevice, buyDeviceCrypto } from '@/api/order';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Store from '@/layouts/Store';
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers5/react";
import { isWrongChainId } from "../_app";
import { ethers } from "ethers";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { SnackbarCloseReason } from '@mui/material/Snackbar';
import { AlertColor } from '@mui/material/Alert';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Box from '@mui/material/Box';
import { sendGTMEvent } from '@next/third-parties/google'
import {
    BACKEND_BASEURL,
    erc20Abi,
    gaslessAbi,
    gaslessTransferAddress,
    KPN,
    USDT,
    USDC_PERMITTED,
    USDCe_PERMITTED,
    // USDT_PERMITTED_t,
    // KPN_t,
    // gaslessTransferAddress_t
} from "../../utils/constants";
import axios from 'axios';

const tokens = [
    { value: 'kpn', label: 'KPN', icon: '/products/kpnIcon.svg' },
    { value: 'usdt', label: 'USDT', icon: '/products/usdt.svg' },
    { value: 'usdc', label: 'USDC', icon: '/products/usdc.svg' },
    { value: 'usdce', label: 'USDCe', icon: '/products/usdc.svg' },
    // { value: 'kpnt', label: 'KPNt', icon: '/products/kpnIcon.svg' },
    // { value: 'usdtt', label: 'USDTt', icon: '/products/usdt.svg' }
];


const getERC20Contract = (tokenAddress: string) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(tokenAddress, erc20Abi, signer);
    return contract;
};
const getGaslessContract = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
        gaslessTransferAddress,
        gaslessAbi,
        signer
    );
    return contract;
};

export interface FormDataProps {
    token: string | null;
}

const Checkout = () => {
    const { open } = useWeb3Modal();
    const { address, chainId, isConnected } = useWeb3ModalAccount();
    const isValidChainId: boolean = isWrongChainId(chainId as number);
    console.log("Check Chain ID:", isValidChainId);
    console.log("Check Address:", address);
    console.log("Check Chain ID:", chainId);
    console.log("Check Connected:", isConnected);

    const [userBalance, setUserBalance] = useState(0)
    const [checkingBalance, setCheckingBalance] = useState(false);
    const [step, setStep] = useState<"shipping" | "payment" | "done">('shipping');
    const { items, addItem, total, count, clear, removeItem } = useCart();
    const [paymentOption, setPaymentOption] = useState<'card' | "kpn" | "usdt">('card');


    const [formData, setFormData] = useState<FormDataProps>({ token: null });

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('error'); // 'success', 'info', 'warning', 'error'

    const showSnackbar = (message: string, severity: AlertColor = 'error') => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    function shortenNumber(num: number): string {
        if (num >= 1e12) {
            return (num / 1e12).toFixed(1).replace(/\.0$/, ' ') + 'T';
        }
        if (num >= 1e9) {
            return (num / 1e9).toFixed(1).replace(/\.0$/, ' ') + 'B';
        }
        if (num >= 1e6) {
            return (num / 1e6).toFixed(1).replace(/\.0$/, ' ') + 'M';
        }
        if (num >= 1e3) {
            return (num / 1e3).toFixed(1).replace(/\.0$/, ' ') + 'K';
        }
        return num.toString();
    }

    const tokenAddressMap: { [key: string]: string } = {
        kpn: KPN,
        usdt: USDT,
        usdc: USDC_PERMITTED,
        usdce: USDCe_PERMITTED,
        // kpnt: KPN_t,
        // usdtt: USDT_PERMITTED_t,
    };

    const tokenDecimalsMap: { [key: string]: number } = {
        kpn: 18,
        usdt: 6,
        usdc: 6,
        usdce: 6,
        // kpnt: 18,
        // usdtt: 6,
    };

    // Update token when payment option changes
    const handlePaymentOptionChange = (option: any) => {
        setPaymentOption(option);
        setFormData(prev => ({ ...prev, token: option }));
    };

    useEffect(() => {
        const _selectedToken = formData.token;
        const _selectedTokenAddress = tokenAddressMap[_selectedToken as keyof typeof tokenAddressMap] || null;
        const _selectedTokenDecimals = tokenDecimalsMap[_selectedToken as keyof typeof tokenDecimalsMap] || 18;

        if (address && _selectedTokenAddress) {
            (async () => {
                try {
                    setCheckingBalance(true);
                    console.log("Fetching balance for address:", address, "and token address:", _selectedTokenAddress);

                    // Ensure getERC20Contract is returning a valid contract instance
                    const contract = getERC20Contract(_selectedTokenAddress);
                    console.log("Contract instance:", contract);
                    if (!contract) {
                        throw new Error("Invalid contract instance");
                    }

                    // Attempt to fetch the balance
                    const userWeiBal = await contract.balanceOf(address);
                    const userBal = ethers.utils.formatUnits(userWeiBal, _selectedTokenDecimals);
                    console.log("User balance:", { data: shortenNumber(parseFloat(userBal)), userBal });

                    setUserBalance(Number(userBal));
                } catch (error) {
                    console.error("Error Getting Balance", error);
                    setUserBalance(0);
                } finally {
                    setCheckingBalance(false);
                }
            })();
        } else {
            setUserBalance(0);
        }
    }, [address, formData.token]);


    const [loading, setLoading] = useState(false);
    //   const [isWalletConnected, setIsWalletConnected] = useState(false);
    useEffect(() => {
        if (isConnected) {
            (async () => {
                console.log(await getGaslessContract().getFundsAddress());
            })();
        }
    }, [isConnected]);

    const executeNormalTransfer = async (
        tokenAddress: string,
        amount: string,
        decimals: number
    ) => {
        try {
            let amountToBeSent;

            if (formData.token === 'kpn') {
                let fetch: any = await axios.get("https://3rdparty-apis.coinmarketcap.com/v1/cryptocurrency/widget?id=30877&convert_id=1,2781,2781");
                let price = fetch.data.data['30877'].quote['2781'].price;
                console.log("Executing Normal Transfer with Price Check");
                console.log("Token Address:", tokenAddress);
                console.log("Amount:", amount);
                console.log("Decimals:", decimals);
                console.log("Address:", address);
                console.log("Price:", price);
                const priceBN = ethers.utils.parseUnits(price.toString(), 18);
                const amountBN = ethers.utils.parseUnits(amount, decimals);
                const amountToBeSentBN = amountBN.div(priceBN);
                amountToBeSent = ethers.utils.formatUnits(amountToBeSentBN, 0);
            } else {
                console.log("Executing Normal Transfer without Price Check");
                console.log("Token Address:", tokenAddress);
                console.log("Amount:", amount);
                console.log("Decimals:", decimals);
                console.log("Address:", address);
                amountToBeSent = amount.toString();
            }


            const fundsAddress = await getGaslessContract().getFundsAddress();
            console.log("Amount to be Sent:", amountToBeSent);
            const res = await getERC20Contract(tokenAddress).transfer(
                fundsAddress,
                amountToBeSent,
            );
            const receipt = await res.wait();
            const txHash = receipt.transactionHash;
            console.log("Transaction Hash:", txHash);
            showSnackbar("Tokens Transfered Successfully", 'success');
            // Call API to buy device

            const device_ids = items.flatMap(item => Array(item.count).fill(item.item.id));
            const shipping_address = getValues('shipping_address');
            buyDeviceCrypto({
                device_ids,
                shipping_address: { ...shipping_address },
                txhash_id: txHash
                // txhash_id: VALUE
                // Put it just above txhash_id
            })
                .then(() => {
                    enqueueSnackbar("Successfully bought the device", { variant: "success" });
                    setStep('done');
                    setisSubmittingBuy(false);
                    sendGTMEvent({
                        event: 'purchase', value: {
                            value: total,
                            currency: "USD"
                        }
                    });
                    clear();
                })
                .catch((e) => {
                    if (e?.errors) {
                        e.errors.forEach((message: any) => {
                            enqueueSnackbar(message, { variant: "error" });
                        });
                    }
                    console.error(e);
                    setisSubmittingBuy(false);
                });
        } catch (err) {
            console.error("Error:", err);
            return false;
        }
    };

    const _isErc20Permit = async (
        tokenAddress: string,
        amount: string,
        decimals: number
    ) => {
        try {
            console.log("Checking if ERC20 Permit is available");
            console.log("Token Address:", tokenAddress);
            console.log("Amount:", amount);
            console.log("Decimals:", decimals);
            console.log("Address:", address);
            await getERC20Contract(tokenAddress).nonces(address);
            console.log("ERC20 Permit is available");
            return true;
        } catch (err) {
            await executeNormalTransfer(tokenAddress, amount, decimals);
            return false;
        }
    };

    const signAndSendPermit = async (_selectedToken: string) => {
        const provider = new ethers.providers.Web3Provider(window.ethereum as any);
        const signer = provider.getSigner();
        const tokenName = await getERC20Contract(_selectedToken).name();

        const domain = {
            name: tokenName,
            version: "1",
            chainId: chainId,
            verifyingContract: _selectedToken,
        };

        const types = {
            Permit: [
                { name: "owner", type: "address" },
                { name: "spender", type: "address" },
                { name: "value", type: "uint256" },
                { name: "nonce", type: "uint256" },
                { name: "deadline", type: "uint256" },
            ],
        };
        const selectedToken = formData.token;
        const _selectedTokenAddress = tokenAddressMap[selectedToken as keyof typeof tokenAddressMap] || null;
        const _selectedTokenDecimals = selectedToken ? tokenDecimalsMap[selectedToken] || 18 : 18;

        let userBalance = await getERC20Contract(_selectedToken).balanceOf(address);
        console.log("Selected Token:", _selectedToken);
        console.log("User Balance:", userBalance);
        userBalance = Number(ethers.utils.formatUnits(userBalance, _selectedTokenDecimals));
        console.log("Formated User Balance:", userBalance);
        if (total > userBalance) {
            showSnackbar("Not Enough Balance", 'error');
            return;
        }
        console.log("Before Permit");
        console.log("Total:", total);
        const parsedAmount = ethers.utils.parseUnits(total.toString(), _selectedTokenDecimals).toString();
        console.log("Parsed Amount:", parsedAmount);
        const res = await _isErc20Permit(
            _selectedToken,
            parsedAmount,
            _selectedTokenDecimals
        );
        console.log("After Permit");
        console.log("Res:", res);
        if (!res) {
            return false;
        }
        const nonce = await getERC20Contract(_selectedToken).nonces(address);
        console.log("Nonce:", nonce ? nonce.toNumber() : 0);
        const deadLine = Math.floor(Date.now() / 1000 + 60 * 5);
        const message = {
            owner: address,
            spender: gaslessTransferAddress,
            value: parsedAmount.toString(),
            nonce: nonce.toNumber(),
            deadline: deadLine,
        };

        const signature = await signer._signTypedData(domain, types, message);
        const { r, s, v } = ethers.utils.splitSignature(signature);
        return { r, s, v, deadLine, _selectedTokenDecimals };
    };

    const sendRequest = async () => {
        console.log("Send Request");
        try {
            if (!formData.token) {
                showSnackbar("Please select a payment method.", 'error');
                return;
            }

            // const total: { total: number } = { total: 330 };
            if (userBalance < total) {
                showSnackbar(`Insufficient balance. You need at least $${total}.`, 'error');
                return;
            }

            console.log("1");
            const selectedToken = formData.token;
            const _selectedTokenAddress = tokenAddressMap[selectedToken] || null;
            const _selectedTokenDecimals = tokenDecimalsMap[selectedToken] || 18;

            // e.preventDefault();
            console.log("2");
            setLoading(true);
            console.log("3");
            console.log("Selected Token:", _selectedTokenAddress);
            console.log("Total:", total);
            console.log("4");
            console.log("Total + decimals:", total, _selectedTokenDecimals);

            // Correctly parse the amount using the fetched decimals
            // const parsedAmount = ethers.utils.parseUnits(total.total.toString(), _selectedTokenDecimals);
            // console.log("Parsed Amount:", parsedAmount); 

            const res = await signAndSendPermit(_selectedTokenAddress || '');
            console.log("Res:", res);
            if (res) {
                const transferData = {
                    chainId,
                    token: _selectedTokenAddress,
                    sender: address,
                    amount: total.toString(),
                    decimals: res._selectedTokenDecimals,
                    deadline: res.deadLine,
                    signature: {
                        v: res.v,
                        r: res.r,
                        s: res.s,
                    },
                };
                console.log("Transfer Data:", transferData);
                const response = await axios.post(
                    `${BACKEND_BASEURL}/api/transfer`,
                    transferData
                );
                const txHash = response.data.txHash;
                showSnackbar(response.data.message, 'success');
                // Call API to buy device
                const device_ids = items.flatMap(item => Array(item.count).fill(item.item.id));
                const shipping_address = getValues('shipping_address');
                buyDeviceCrypto({
                    device_ids,
                    shipping_address: { ...shipping_address },
                    txhash_id: txHash
                    // txhash_id: VALUE
                    // Put it just above txhash_id
                })
                    .then(() => {
                        enqueueSnackbar("Successfully bought the device", { variant: "success" });
                        setStep('done');
                        setisSubmittingBuy(false);
                        sendGTMEvent({
                            event: 'purchase',
                            value: {
                                value: total,
                                currency: "USD"
                            }
                        });
                        clear();
                    })
                    .catch((e) => {
                        if (e?.errors) {
                            e.errors.forEach((message: any) => {
                                enqueueSnackbar(message, { variant: "error" });
                            });
                        }
                        console.error(e);
                        setisSubmittingBuy(false);
                    });
            }
        } catch (error) {
            if (error instanceof Error) {
                showSnackbar("Error: " + error.message, 'error');
                console.error("Detailed Error:", error);
            } else {
                showSnackbar("An unknown error occurred.", 'error');
                console.error("Unknown Error:", error);
            }
        } finally {
            setLoading(false);
        }
    };


    // Click handler based on wallet connection status
    // const handleButtonClick = (e: any) => {
    //     ; 
    // };


    const { user } = useAuth();
    const { ModalComponent, setModalComponent, closeModal } = useMuiModal({
        minWidth: 300,
        width: "50%",
        maxHeight: 550,
        p: 1,
        borderRadius: 5
    });

    const myCardsQuery = useQuery<MyCardsInterface[]>({
        queryKey: ['my_cards'],
        queryFn: () => getMyCards<MyCardsInterface[]>().then(({ data }) => data),
        enabled: !!user,
    })

    const [defaultAddress, setDefaultAddress] = useState(false);
    const [agrees, setAgrees] = useState({
        privacy: false,
        term_and_conditions: false,
    });

    const setDefaultCardMutation = useMutation<any, any, string, any>({
        mutationFn: (id) => setDefaultCard(id),
        onSuccess: ({ data }: any) => {
            enqueueSnackbar(`Card ending in ${data?.find((card: MyCardsInterface) => card.is_default)?.last4} is set as the default card`, { variant: "success" });
        }
    })

    // console.log(myCardsQuery?.data);

    const BuyDeviceSchema = object().shape({
        // device_id: number().required(),
        shipping_address: object().shape({
            country: string().required().default(user?.profile?.country).label('Country'),
            state: string().label("State"),
            city: string().required().default(user?.profile?.city).label('City'),
            postal_code: string().required().default(user?.profile?.zipcode).label('Postal Code'),
            address_line1: string().required().default(user?.profile?.address).label('Address Line 1'),
            address_line2: string(),
            recipient_name: string().required().default(`${user?.first_name} ${user?.last_name}`).label('Recipient Name'),
            recipient_phone: string().required().default(user?.profile?.phone).label('Recipient Phone')
        }),
        // promo_code: string().required(),
    });

    const methods = useForm({
        resolver: yupResolver(BuyDeviceSchema)
    });

    const { setValue, formState: { errors, isSubmitting }, handleSubmit, register, getValues } = methods;
    const defaultCard = myCardsQuery.isSuccess && myCardsQuery.data.find(card => card.is_default);
    const [isSubmittingBuy, setisSubmittingBuy] = useState(false);

    useEffect(() => {
        if (defaultAddress) {
            setValue('shipping_address', {
                address_line1: user?.profile?.address,
                city: user?.profile?.city,
                country: user?.profile?.country,
                postal_code: user?.profile?.zipcode,
                recipient_name: `${user?.first_name} ${user?.last_name}`,
                recipient_phone: user?.profile?.phone,
                state: "",
            })
        }
    }, [defaultAddress])

    return (
        <main>
            {ModalComponent}
            <section className='py-24'>
                <Container>
                    <section className='relative flex flex-col'>
                        <div className='flex text-center flex-col gap-5'>
                            <h1 className='md:text-5xl text-3xl font-bold'>Shipping and payment</h1>
                            {/* <p className='md:text-base text-sm'>Your shipping informations</p> */}
                        </div>
                        <div className='flex flex-col text-center mt-10'>
                            {/* <h1 className='md:text-5xl text-3xl font-bold my-10'>Choose Your Level</h1> */}
                            <div className=' bg-gradient-to-b from-[#282828] to-[#08080A] md:p-5 p-2 rounded-xl border-t border-slate-400'>
                                <div className='flex flex-col md:flex-row justify-between'>
                                    <div className='flex flex-col md:flex-row md:gap-8 gap-4'>
                                        <div className='flex md:gap-8 gap-4'>
                                            <div onClick={() => {
                                                if (step !== 'done') {
                                                    setStep('shipping')
                                                }
                                            }} className={`md:w-32 w-full ${step !== "done" ? "cursor-pointer" : ""}`}>
                                                <div className='text-left text-sm md:text-base'>Shipping</div>
                                                <div className={`rounded-full mt-1 ${(step === "shipping" || step === "payment" || step === "done") ? "bg-primary" : "bg-slate-600"} w-full h-1`} />
                                            </div>
                                            <div className='md:w-32 w-full'>
                                                <div className={`text-left text-sm md:text-base ${(step === 'payment' || step === "done") ? "" : "opacity-30"}`}>Payment</div>
                                                <div className={`rounded-full mt-1 ${step === 'payment' || step === "done" ? "bg-primary" : "bg-slate-600 opacity-30"} w-full h-1`} />
                                            </div>
                                        </div>
                                        {<div className={`flex gap-2 my-2 md:my-0 ${paymentOption === 'card' ? "hidden" : ""}`}>
                                            <button
                                                className="text-white bg-[#4CC8A6] rounded-xl px-2 py-1 leading-0 items-center justify-center flex"
                                                onClick={() => open?.()}
                                            >
                                                {isConnected
                                                    ? !isValidChainId
                                                        ? "Wrong Network"
                                                        : `${address?.slice(0, 4)}...${address?.slice(address.length - 3)}`
                                                    : "Connect Wallet"}
                                            </button>
                                            <div className="flex  gap-2 items-center">
                                                <div className="text-primary">Wallet Balance:</div>
                                                <div className="text-primary  text-2xl font-bold">
                                                    {checkingBalance ? "loading..." : shortenNumber(userBalance)}
                                                </div>
                                            </div>
                                        </div>}
                                        {
                                            step === 'done' && <CheckCircleOutlineOutlinedIcon className='mx-auto text-primary' sx={{ width: 35, height: 35 }} />
                                        }
                                    </div>
                                    {step !== 'done' && <div className='text-primary flex gap-2 my-2'>
                                        <div className='text-xs my-auto'>({count} items)</div>
                                        <div className='md:text-2xl text-lg my-auto font-bold'>{total}$</div>
                                    </div>}
                                </div>
                                <div className='flex flex-col-reverse gap-5 justify-around lg:flex-row min-h-96 mt-14'>
                                    {step !== 'done' ? <>
                                        <form onSubmit={handleSubmit((data) => {
                                            if (step === 'shipping') {
                                                setStep('payment');
                                                return;
                                            }
                                            if (step === 'payment') {
                                                if (!items.length) {
                                                    enqueueSnackbar("Your Cart is Empty", { variant: "info" });
                                                    return;
                                                }
                                                if (paymentOption === 'card') {
                                                    setisSubmittingBuy(true);
                                                    const device_ids = items.flatMap(item => Array(item.count).fill(item.item.id));
                                                    buyDevice({
                                                        device_ids,
                                                        shipping_address: { ...data.shipping_address }
                                                    })
                                                        .then(() => {
                                                            enqueueSnackbar("Successfully bought the device", { variant: "success" });
                                                            setStep('done');
                                                            setisSubmittingBuy(false);
                                                            sendGTMEvent({
                                                                event: 'purchase',
                                                                value: {
                                                                    value: total,
                                                                    currency: "USD"
                                                                }
                                                            });
                                                            clear();
                                                        })
                                                        .catch((e) => {
                                                            if (e?.errors) {
                                                                e.errors.forEach((message: any) => {
                                                                    enqueueSnackbar(message, { variant: "error" });
                                                                });
                                                            }
                                                            console.error(e);
                                                            setisSubmittingBuy(false);
                                                        });
                                                } else {
                                                    if (isConnected) {
                                                        console.log("Connected Sending Request!");
                                                        sendRequest();
                                                    } else {
                                                        enqueueSnackbar('Please make sure your wallet is connected', { variant: "info" });
                                                    }
                                                }
                                            }
                                        })} className='lg:w-1/2'>
                                            <h2 className='md:text-3xl text-2xl text-left'>
                                                {step === 'shipping' ? "Please fill up your shipping address" : "Please choose your payment option"}
                                            </h2>
                                            {step === 'shipping' && (
                                                <div className='text-xs text-left mt-1'>
                                                    <FormControlLabel
                                                        label={defaultAddress ? 'Default Address' : 'Custom Address'}
                                                        control={
                                                            <Switch
                                                                checked={defaultAddress}
                                                                onChange={(event) => {
                                                                    if (!user?.profile?.address || !user?.profile?.country || !user?.profile?.city) {
                                                                        enqueueSnackbar(`Your Profile is missing critical address info, please add them to your profile, or manually add them here`, { variant: "warning" });
                                                                        return;
                                                                    }
                                                                    setDefaultAddress(event.target.checked);
                                                                }}
                                                            />
                                                        }
                                                    />
                                                </div>
                                            )}

                                            {step === "shipping" && (
                                                <div className='my-5 bg-[#F5F5F5] rounded-2xl p-[3px]'>
                                                    <div className='flex bg-[#232323] p-3 justify-between rounded-2xl'>
                                                        <div className='flex gap-3'>
                                                            <div className='my-auto w-3 h-3 bg-primary rounded-full' />
                                                            <div className='my-auto opacity-75'>{"Personal Data"}</div>
                                                        </div>
                                                        <LocalShippingOutlinedIcon />
                                                    </div>
                                                    <ThemeProvider theme={createTheme({ palette: palette.light })}>
                                                        <div className='p-4 gap-4 flex flex-col'>
                                                            <div className='flex gap-4'>
                                                                <TextField {...register('shipping_address.recipient_name')} error={!!errors?.shipping_address?.recipient_name} helperText={errors?.shipping_address?.recipient_name?.message} size='small' fullWidth label="Recipient Name" />
                                                                <TextField {...register('shipping_address.recipient_phone')} error={!!errors?.shipping_address?.recipient_phone} helperText={errors?.shipping_address?.recipient_phone?.message} size='small' fullWidth label="Recipient Phone Number" />
                                                            </div>
                                                            <TextField {...register('shipping_address.address_line1')} error={!!errors?.shipping_address?.address_line1} helperText={errors?.shipping_address?.address_line1?.message} size='small' fullWidth label="Address Line 1" />
                                                            <TextField {...register('shipping_address.address_line2')} error={!!errors?.shipping_address?.address_line2} helperText={errors?.shipping_address?.address_line2?.message} size='small' fullWidth label="Address Line 2" />
                                                            <div className='flex gap-4'>
                                                                <TextField {...register('shipping_address.country')} error={!!errors?.shipping_address?.country} helperText={errors?.shipping_address?.country?.message} size='small' fullWidth label="Country" />
                                                                <TextField {...register('shipping_address.city')} error={!!errors?.shipping_address?.city} helperText={errors?.shipping_address?.city?.message} size='small' fullWidth label="City" />
                                                            </div>
                                                            <div className='flex gap-4'>
                                                                <TextField {...register('shipping_address.state')} error={!!errors?.shipping_address?.state} helperText={errors?.shipping_address?.state?.message} size='small' label="State" className='w-3/5' />
                                                                <TextField {...register('shipping_address.postal_code')} error={!!errors?.shipping_address?.postal_code} helperText={errors?.shipping_address?.postal_code?.message} size='small' label="Post Code" className='w-2/5' />
                                                            </div>
                                                        </div>
                                                    </ThemeProvider>
                                                </div>
                                            )}

                                            {step === "payment" && (
                                                <div>
                                                    <div onClick={() => setPaymentOption('card')} className={`cursor-pointer my-5 ${paymentOption === 'card' ? "bg-[#F5F5F5]" : "hover:bg-[#F5F5F5]"} transition-all rounded-2xl p-[3px]`}>
                                                        <div className='flex bg-[#232323] p-3 justify-between rounded-2xl'>
                                                            <div className='flex gap-3'>
                                                                <div className={`my-auto w-3 h-3 ${paymentOption === 'card' ? "bg-primary" : "bg-slate-500"} rounded-full`} />
                                                                <div className='my-auto opacity-75'>Credit card</div>
                                                            </div>
                                                            <CreditCardOutlinedIcon className='text-[#697386]' />
                                                        </div>
                                                        {paymentOption === 'card' && (
                                                            <ThemeProvider theme={createTheme({ palette: palette.light })}>
                                                                <div className='p-4'>
                                                                    <div className=' text-lg font-bold flex justify-between'>
                                                                        <div className='text-black'>Card Details</div>
                                                                        {setDefaultCardMutation.isPending && <CircularProgress />}
                                                                    </div>
                                                                    {myCardsQuery.isSuccess && defaultCard && (
                                                                        <RadioGroup
                                                                            onChange={async (data) => {
                                                                                try {
                                                                                    await setDefaultCardMutation.mutateAsync(data.target.value);
                                                                                    await myCardsQuery.refetch();
                                                                                } catch (error) {
                                                                                    console.log(error);
                                                                                    enqueueSnackbar("Error setting the default card", { variant: "error" });
                                                                                }
                                                                            }}
                                                                            defaultValue={defaultCard.id}
                                                                            value={defaultCard.id}
                                                                        >
                                                                            {myCardsQuery.data.sort((a, b) => +a.exp_year - +b.exp_year).map((card) => (
                                                                                <React.Fragment key={card.id}>
                                                                                    <ListItem className={setDefaultCardMutation.isPending ? "opacity-30" : ""}>
                                                                                        <div className='flex gap-4'>
                                                                                            <FormControlLabel className='text-black' control={<Radio checked={card?.id === defaultCard?.id} value={card.id} />} label={`**** **** **** ${card.last4}`} />
                                                                                            <img className='w-8 h-5 my-auto' src={`/${card.brand.toLowerCase()}.webp`} alt="" />
                                                                                        </div>
                                                                                    </ListItem>
                                                                                </React.Fragment>
                                                                            ))}
                                                                        </RadioGroup>
                                                                    )}
                                                                    <div className='w-40 my-4'>
                                                                        <Button size='small' fullWidth variant='contained' onClick={() => {
                                                                            setModalComponent(<AddNewCard onExit={() => {
                                                                                myCardsQuery.refetch();
                                                                                setTimeout(() => {
                                                                                    closeModal();
                                                                                }, 4000);
                                                                            }} />);
                                                                        }}>
                                                                            Add New Card
                                                                        </Button>
                                                                    </div>

                                                                </div>
                                                            </ThemeProvider>
                                                        )}
                                                    </div>

                                                    <Box className="animatedBackground">
                                                        <h2 className="text-left text-xl font-bold">Select Payment Token</h2>
                                                        <FormControl fullWidth variant="outlined" style={{ marginTop: '16px' }}>
                                                            <InputLabel>Select a token</InputLabel>
                                                            <Select
                                                                value={formData.token || ''}
                                                                onChange={(e) => handlePaymentOptionChange(e.target.value)}
                                                                displayEmpty
                                                                fullWidth
                                                                label="Select a token"
                                                            >
                                                                <MenuItem value="" disabled>
                                                                    <ListItemText primary="Select a token" />
                                                                </MenuItem>
                                                                {tokens.map((token) => (
                                                                    <MenuItem key={token.value} value={token.value}>
                                                                        <ListItemIcon style={{ minWidth: '36px' }}>
                                                                            <img src={token.icon} alt={`${token.label} logo`} style={{ width: 24, height: 24 }} />
                                                                        </ListItemIcon>
                                                                        <ListItemText primary={token.label} />
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                    </Box>

                                                    <div className='flex flex-col '>
                                                        <FormControlLabel control={<Checkbox onChange={(event) => setAgrees(old => ({ ...old, privacy: event.target.checked }))} checked={agrees.privacy} />} label="I Agree to privacy policy" />
                                                        <FormControlLabel control={<Checkbox onChange={(event) => setAgrees(old => ({ ...old, term_and_conditions: event.target.checked }))} checked={agrees.term_and_conditions} />} label="I Agree to Term and Conditions" />
                                                    </div>
                                                </div>
                                            )}
                                            <LoadingButton
                                                // onClick={handleButtonClick} // Add this line
                                                disabled={(step === 'payment' && (!agrees.privacy || !agrees.term_and_conditions)) || checkingBalance || loading}
                                                loading={isSubmitting || isSubmittingBuy}
                                                type='submit' // Change type to 'button' to prevent form submission
                                                variant='contained'
                                                fullWidth
                                                className="cursor-pointer [border:none] py-2 px-5 bg-primary rounded-full self-stretch rounded-13xl-4 flex flex-row items-start justify-center hover:bg-seagreen disabled:cursor-not-allowed"
                                            >
                                                <div className="relative text-base font-medium font-small-600 text-black text-center inline-block min-w-[65px]">
                                                    {loading ? "Processing..." : (step === 'payment' ? ((isConnected && paymentOption !== 'card') ? "Pay Now With Crypto" : "Buy Now") : "Continue to payment")}
                                                </div>
                                            </LoadingButton>
                                        </form>
                                        <div className='lg:w-1/2 border-slate-600 border-t-2 border-r border-l border-b rounded-3xl md:py-6 py-4 md:px-4 px-2 relative'>
                                            <div className='flex flex-col gap-2 z-10 relative md:h-44 overflow-auto'>
                                                {items.map(({ item, count }, index) => (
                                                    <div key={index} className='flex gap-4 bg-[#222322] rounded-xl p-1'>
                                                        <Tooltip title={item.name}>
                                                            <div className='my-auto w-full md:text-lg'>{truncateString(item.name, 15)}</div>
                                                        </Tooltip>
                                                        <div className='h-px hidden md:block w-full bg-slate-600 my-auto' />
                                                        <div className='flex border-2 border-slate-600 gap-3 rounded-3xl p-2'>
                                                            <button onClick={() => {
                                                                addItem(item, count - 1);
                                                            }} className='bg-primary  my-auto p-2 rounded-l-xl flex'><div className='text-black md:w-2 md:h-5 m-auto'>-</div></button>
                                                            <div className='font-bold md:text-xl my-auto'>{count}</div>
                                                            <button onClick={() => {
                                                                addItem(item, count + 1);
                                                            }} className='bg-primary  my-auto p-2 rounded-r-xl flex'><div className='text-black md:w-2 md:h-5 m-auto'>+</div></button>
                                                        </div>
                                                        <div className='h-px hidden md:block w-20 my-auto bg-slate-600' />
                                                        <div className='flex gap-1'>
                                                            <div className='text-primary my-auto md:text-xl'>{item.price}$</div>
                                                            <div className='my-auto'>
                                                                <IconButton onClick={() => {
                                                                    removeItem(item.id)
                                                                }}>
                                                                    <HighlightOffIcon color='error' />
                                                                </IconButton>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <img src="/products/checkout.webp" className='-mt-24 ' alt="" />
                                        </div>
                                    </> : <>
                                        <div className='m-auto bg-[#212321] p-10 flex flex-col gap-6'>
                                            <CheckCircleOutlineOutlinedIcon className='mx-auto text-primary' sx={{ width: 80, height: 80 }} />
                                            <div className='text-2xl'>Please check your email</div>
                                            <Link href={'/'} passHref><Button variant='contained' className='!text-black'>Back Home</Button></Link>
                                        </div>
                                    </>}
                                </div>
                            </div>
                        </div>
                    </section>
                    <Snackbar
                        open={snackbarOpen}
                        autoHideDuration={6000}
                        onClose={handleSnackbarClose}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    >
                        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
                            {snackbarMessage}
                        </Alert>
                    </Snackbar>
                </Container>
            </section>
        </main>
    )
}

Checkout.getLayout = function getLayout(page: JSX.Element) {
    return <Store auth>{page}</Store>
};

export default Checkout


