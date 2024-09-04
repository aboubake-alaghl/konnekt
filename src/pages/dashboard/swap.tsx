import React, { useEffect, useState } from 'react';
import MyTokensInterface from '@/interfaces/MyTokensInterface';
import { useMutation, useQuery } from '@tanstack/react-query';
import { PostSwapDataObject, getMyTokens, postSwapRequest } from '@/api/Profile';
import { getExchangeRate } from '@/api/exchangeRate';
import Dashboard from '@/layouts/Dashboard';
import ExchangeRateInterface from '@/interfaces/ExchangeRateInterface';
import { Button, Skeleton } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import LoadingButton from '@mui/lab/LoadingButton';

const Converter = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [convertedValue, setConvertedValue] = useState<number | undefined>();
  // const [exchangeRate, setExchangeRate] = useState<number>(0);
  const [showImportForm, setShowImportForm] = useState<boolean>(false);
  const [showWithdrawForm, setShowWithdrawForm] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>('');
  const [publicKey, setPublicKey] = useState<string>('');
  const allowedKeys = ['Digit0', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', "Backspace", "Delete"];

  useEffect(() => {
    if (document) {
      document.addEventListener('keydown', (e) => {
        if (allowedKeys.find(x => x === e.code)) {
          if (e.key === 'Backspace' || e.key === 'Delete') {
            setInputValue(oldValue => oldValue.slice(0, -1));
          } else {
            setInputValue(oldValue => oldValue + e.key);
          }
        }
      })
    }
  }, [])

  const myTokensQuery = useQuery<MyTokensInterface>({
    queryKey: ['tokens'],
    queryFn: () => getMyTokens<MyTokensInterface>().then(({ data }) => data),
    retry: false
  });

  const exchangeRateQuery = useQuery<ExchangeRateInterface>({
    queryKey: ['exchange-rate'],
    queryFn: () => getExchangeRate<ExchangeRateInterface>().then(({ data }) => data),
    retry: false
  });

  // useEffect(() => {
  //   const fetchExchangeRate = async () => {
  //     try {
  //       const response = await fetch("https://admin.konnektvpn.app/api/exchange-rate/", {
  //         method: 'GET',
  //         headers: {
  //           'accept': 'application/json',
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         }
  //       });

  //       if (response.ok) {
  //         const data = await response.json();
  //         setExchangeRate(data.rate);
  //       } else {
  //         throw new Error(`Error fetching exchange rate: ${response.status}`);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching exchange rate:", error);
  //     }
  //   };

  //   fetchExchangeRate();
  // }, [exchangeRate]);

  const handleButtonClick = (key: string) => {
    let newValue = inputValue;
    if (key === '←') {
      newValue = inputValue.slice(0, -1);
    } else {
      newValue = inputValue + key;
    }
    setInputValue(newValue);
  };

  const handleWithdraw = () => {
    setShowImportForm(true);
  };

  const handleWithdrawSubmitMutation = useMutation<any, undefined, PostSwapDataObject>({
    mutationFn: (data) => postSwapRequest<any>(data).then(({ data }) => data),
    onSuccess(data) {
      console.log(data);
      enqueueSnackbar("Swap request created " + data, { variant: "success" })
      setShowWithdrawForm(false);
      if (window) {
        window.location.reload();
      }
      // push('/')
    },
    onError(e: any) {
      if (e?.errors) {
        e.errors.forEach((message: any) => {
          enqueueSnackbar(message, { variant: "error" })
        })
      } else {
        enqueueSnackbar("Error Occurred", { variant: "error" })
      }
      console.error(e);
    }
  })

  // const handleWithdrawSubmit = async () => {
  //   try {
  //     const response = await axios.post('https://admin.konnektvpn.app/api/profile/swap_request/', {
  //       destination_address: publicKey,
  //       amount: inputValue
  //     }, {
  //       headers: {
  //         'accept': 'application/json',
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       }
  //     });
  //     console.log('Swap request created:', response.data);
  //     setShowWithdrawForm(false);
  //     // Refresh the page after successful swap request
  //     window.location.reload();
  //   } catch (error) {
  //     console.error('Error creating swap request:', error);
  //   }
  // };

  const handleImport = () => {
    setShowImportForm(true);
  };



  const handleCloseImportForm = () => {
    setShowImportForm(false);
  };

  useEffect(() => {
    const value = parseFloat(inputValue || "0");
    if (exchangeRateQuery.isSuccess) {
      // HERE
      setConvertedValue(value / +(exchangeRateQuery.data.rate));
    }
  }, [inputValue])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#121212] to-[#1E1E1E] text-white">
      <div className="p-6 rounded-3xl shadow-lg w-full max-w-sm text-center">
        <div className="text-gray-400 mb-2">Balance</div>
        <div className="text-5xl font-bold mb-1">{myTokensQuery.isSuccess ? (+myTokensQuery.data.knkt - +myTokensQuery.data.knkt_swapped) : 'Loading...'}</div>
        <div className="text-white p-2 rounded">
          <span className="text-2xl font-bold">KNKT</span>
          <div className="text-xs text-gray-400">Minimum swap: 72000 KNKT</div>
        </div>
        <div className="mt-6 bg-[#2A2A2A] p-4 rounded-lg flex items-center justify-between">
          <input
            type="number"
            value={inputValue}
            readOnly
            className="bg-transparent text-white text-2xl w-full focus:outline-none rounded-lg"
          />
          <span className="text-gray-200 bg-gray-700 px-2 py-1 rounded-lg">KNKT</span>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-left">
            <div className="text-gray-400">{convertedValue ? convertedValue.toFixed(10) : '0.0000000000'} <span className="text-white">KPN</span></div>
            {exchangeRateQuery.isSuccess && <div className="text-gray-400 text-sm">{exchangeRateQuery.data?.rate} KNKT = 1 KPN</div>}
            {exchangeRateQuery.isLoading && <><Skeleton variant='text' /> <div>KNKT = 1 KPN</div></>}
            {/* here */}
          </div>
          <button
            className="bg-[#2A2A2A] py-1 px-3 rounded-lg text-white text-sm hover:bg-teal-600 transition duration-300"
            onClick={handleImport}
          >
            Import
          </button>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-4 text-2xl">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '00', '0', '←'].map((key) => (
            <button
              key={key}
              onClick={() => handleButtonClick(key)}
              className="p-4 rounded-lg text-white focus:outline-none bg-gray-700 hover:bg-teal-500 transition-colors duration-200"
            >
              {key}
            </button>
          ))}
        </div>
        <button
          className={`mt-6 w-full py-3 rounded-lg text-white text-lg transition duration-300 ${Number(inputValue) < 72000 || inputValue === ''
            ? 'bg-gray-500 cursor-not-allowed'
            : 'bg-teal-500 hover:bg-teal-600'
            }`}
          onClick={handleWithdraw}
          disabled={Number(inputValue) < 72000}
        >
          Withdraw
        </button>
      </div>

      {
        showImportForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-[#1E1E1E] p-6 rounded-3xl shadow-lg w-full max-w-sm relative h-[500px]">
              <button
                onClick={handleCloseImportForm}
                className="absolute top-2 left-2 text-gray-400 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h2 className="text-2xl mt-4 font-bold mb-4 text-white">Insert</h2>
              <div className="mb-4">
                <label className="block text-gray-400 text-sm mb-2" htmlFor="nickname">Nickname</label>
                <input
                  type="text"
                  id="nickname"
                  placeholder="Nickname"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="w-full bg-[#2A2A2A] text-white p-3 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-400 text-sm mb-2" htmlFor="publicKey">Public Key</label>
                <div className="relative">
                  <textarea
                    id="publicKey"
                    placeholder="Public Key"
                    value={publicKey}
                    onChange={(e) => setPublicKey(e.target.value)}
                    className="w-full bg-[#2A2A2A] text-white p-3 rounded-lg pr-12 resize-none"
                    rows={4}
                  />
                  <button className="absolute bottom-2 right-2 text-gray-400 hover:text-white" onClick={() => navigator.clipboard.readText().then(text => setPublicKey(text))}>
                    Paste
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-400 mb-4">Don't enter your private key, only your public wallet address</p>
              <LoadingButton
                variant='contained'
                loading={handleWithdrawSubmitMutation.isPending}
                disabled={handleWithdrawSubmitMutation.isSuccess}
                onClick={() => {
                  handleWithdrawSubmitMutation.mutate({
                    amount: inputValue,
                    destination_address: publicKey
                  });
                }}
                className="w-full bg-teal-500 py-2 rounded-lg text-white hover:bg-teal-600 transition duration-300"
              >
                Import
              </LoadingButton>
            </div>
          </div>
        )
      }


    </div >
  );
};

Converter.getLayout = function getLayout(page: JSX.Element) {
  return <Dashboard>{page}</Dashboard>
};

export default Converter;