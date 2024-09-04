import Head from 'next/head';
import React, { useState } from 'react'
import Layout from '@/layouts'
import { Button, Container } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Link from 'next/link';
import Store from '@/layouts/Store';
const Product = () => {
  const [selectedFQ, setSelectedFQ] = useState(1);

  return (
    <>
      <Head>
        <title>{`KonnektVPN - KP 2000 USB C MINING ROUTER`}</title>
      </Head>
      {
        <main className='pt-32'>
          <Container>
            <section className='border-2 rounded-xl border-opacity-60 border-slate-500 md:p-8 p-4 flex flex-col-reverse md:flex-row'>
              <div className='flex flex-col gap-6 md:w-1/2'>
                {/* <div className='text-xs opacity-50'>KP 2000 USB C MINING ROUTER</div> */}
                <h1 className='text-4xl font-bold'>KP 2000 USB C MINING ROUTER</h1>
                <div className='text-primary text-2xl font-bold'>Starting at 300$</div>
                <div className='opacity-75'>KP 2000 is our first mining device from our series of mining routers that is lightweight, user and eco friendly it comes with plenty of features such as ad block, vpn , multi layer firewall enable smart mode to train our AI model and earn rewards in KPN or USDT</div>
                <Link href={'/products/add-ons'} className=''>
                  <Button variant='text' className='w-56 !text-white !font-bold !bg-gradient-to-b !from-[#1c3322] !border-[#385540] !border-t'>Buy now</Button>
                </Link>

                <div className='flex flex-col divide-y divide-primary divide-opacity-25 border-primary border-opacity-50 border px-6 py-4 rounded-lg'>
                  <ProductAttrebuteComponent items={"KP 2000 is a  USB-C mining device with AP functions based on KonnektOS our self developed firmware"} term={"Description "} />
                  <ProductAttrebuteComponent items={["AP", "VPN", "FIREWALL", "RELAY MODE", "MINING MODE", "AD BLOCK"]} term={"Features"} />
                  <ProductAttrebuteComponent items={"1-2 months worldwide shipping"} term={"Estimated delivery time"} />
                  <ProductAttrebuteComponent items={[
                    "Chip: MT7628AN/MT7628NN",
                    "Kernel: MIPS24KEc",
                    "Basic frequency: 580MHz",
                    "RAM: DDR2 128MB",
                    "Flash: 32MB",
                    "Temperature: Environment temperature: -40℃~85℃",
                    "Humidity: Working: 10~95% (noncondensing)",
                    "Size: Storage: 5~95% (noncondensing)",
                  ]} term={"Specs"} />
                  <ProductAttrebuteComponent items={[
                    "This Warranty covers defects in materials and workmanship in the Product under normal use and conditions. Products must be purchased as new from our website or from an authorized reseller. This Warranty only applies to the original purchaser of the Product and will be voided if transferred. Products purchased secondhand or used, or from auction sites, are not covered by this Warranty.",
                    "This Warranty is valid for a period of 3-months from the original date of purchase by the original end-user purchaser (the “Warranty Period”). A copy of the original proof of purchase must be presented to validate the date of purchase.",
                    "If a covered defect arises and a valid claim is received within the Warranty Period :",
                    "replace the Product with a new or refurbished Product.  We will not refund the purchase price of the Product.",
                    "This Warranty does not cover:",

                    "Damage resulting from misuse, abuse, unauthorized modification or repair, or failure to follow the Product's instruction manual.",
                    "Damage resulting from improper installation or connection to incompatible equipment, including third-party software.",
                    "Damage caused by accidents, natural disasters, or other external causes beyond the Manufacturer's control.",
                    "Products without proof of purchase or that have been resold or transferred.",
                    "Products obtained through promotions, contests, giveaways, or sponsorships.",
                  ]} term={"Warranty & return policy"} />

                </div>
              </div>
              <div className='md:w-1/2'>
                <img src={"/products/usbPhoto.webp"} className=' mx-auto' alt="" />
              </div>
            </section>
          </Container>

          <Container>
            <section className='flex flex-col gap-5 mt-20'>
              <h2 className='text-center text-4xl font-bold'>Plug-and-Play</h2>
              <div className='grid md:grid-cols-3 gap-5 mt-5'>
                {[{
                  title: "AP MODE",
                  src: "/products/mode1.webp"
                }, {
                  title: "Portable",
                  src: "/products/mode2.webp"
                }, {
                  title: "Hotspot  mode",
                  src: "/products/mode3.webp"
                }].map(({ src, title }, index) => (
                  <div key={index} className='flex flex-col'>
                    <img src={src} className='h-80' />
                    <div className='text-center mt-5'>{title}</div>
                  </div>
                ))}
              </div>
            </section>
          </Container>

          <Container>
            <section className='flex flex-col gap-5 mt-20'>
              <h2 className='text-center text-4xl font-bold'>Inside The Box</h2>
              <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-10 '>
                {[{
                  title: "USB Stick Router",
                  src: "/products/stickRouter.svg"
                }, {
                  title: "USB-C to USB-A",
                  src: "/products/typeC.svg"
                }, {
                  title: "QR User Guide",
                  src: "/products/QR.svg"
                }].map(({ title, src }, key) => (
                  <div key={key} className='flex flex-col gap-5 text-center'>
                    <img className='mx-auto ' src="/products/stroke2.svg" alt="" />
                    <img src={src} className='h-52' />
                    <div className=' text-xl font-bold'>{title}</div>
                    <div className=''>x1</div>
                    <img className='mx-auto ' src="/products/stroke2.svg" alt="" />
                  </div>
                ))}
              </div>
            </section>
          </Container>

          <Container>
            <section className='flex flex-col lg:flex-row gap-3 my-5'>
              <div className='p-10 from-[#181818] via-[#8a888821] to-[#181818] bg-gradient-to-b lg:w-3/4 gap-12 flex flex-col'>
                {[
                  {
                    title: "AI VPN",
                    desc: "Leveraging AI, KonnektVPN optimizes network performance and security in real-time, adapting to changing conditions to ensure superior service quality and user protection.",
                    src: "/products/aivpn.svg"
                  },
                  {
                    title: "Proof of Time",
                    desc: "Users are rewarded with KPN tokens not just for using the VPN, but for their role in training the AI model. This system recognizes and incentivizes the valuable contribution of users in enhancing the AI's capabilities.",
                    src: "/products/proofoftime.svg"
                  },
                  {
                    title: "ECOFRIENDLY",
                    desc: "Through the KonnektVPN app and network devices, users can mine KPN tokens in an environmentally sustainable manner, diverging from the energy-intensive processes associated with conventional cryptocurrency mining.",
                    src: "/products/ecofriendly.svg"
                  }
                ].map(({ desc, src, title }, index) => (
                  <div className='flex gap-5' key={index}>
                    <img className='' width={100} height={100} src={src} alt={title} />
                    <div>
                      <h3 className='font-bold text-primary'>{title}</h3>
                      <div className='text-sm opacity-75'>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className='p-4 from-[#181818] via-[#8a888821] to-[#181818] bg-gradient-to-b lg:w-1/4 flex flex-col gap-3'>
                {[
                  {
                    title: "ADGUARD",
                    desc: "BLOCKS ALL POPUPS AND ADS WHILE BROWSING",
                    src: "/products/adguard.svg"
                  },
                  {
                    title: "TOR",
                    desc: "Connect to tor network for maximum privacy",
                    src: "/products/tor.svg"
                  },
                  {
                    title: "SMART",
                    desc: "Smart mode trains our AI and rewards you with KPN tokens",
                    src: "/products/smart.svg"
                  },
                  {
                    title: "KPN",
                    desc: "Our AI powered VPN",
                    src: "/products/kpn.svg"
                  }
                ].map(({ desc, src, title }, index) => (
                  <div className='flex gap-5' key={index}>
                    <div className='bg-[#303030] p-4 min-w-20 min-h-20 w max-w-20 max-h-20 flex'>
                      <img src={src} alt={title} className='w-10 h-10 m-auto' />
                    </div>
                    <div className='flex flex-col gap-3'>
                      <div className='text-primary'>{title}</div>
                      <div className='text-xs'>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </Container>

          <Container>
            <section className='from-[#181818] via-[#8a888805] to-[#181818] bg-gradient-to-b flex flex-col md:flex-row gap-5 p-5 my-5'>
              <img className='md:w-1/2' src="/products/dashboard.webp" alt="" />
              <div className='gap-4 md:w-3/5 flex flex-col my-auto p-5 md:text-left text-center'>
                <div className='flex flex-col gap-1 text-primary font-bold '>
                  <div className='text-lg'>Introducing</div>
                  <div className='text-3xl'>KonnektOS Dashboard</div>
                </div>
                <div className='text-sm'>Our devices dashboard is all you need to manage your wireless connections,firewall, ad block , VPN, TOR</div>
              </div>
            </section>
          </Container>

          <Container>
            <section className='flex flex-col lg:flex-row w-full gap-5'>
              <img className='md:w-1/2' src="/products/highSpeedExtended.webp" alt="" />
              <div className='md:w-1/2 flex p-5 from-[#1d1d1d] via-[#8a888818] to-[#181818] bg-gradient-to-b'>
                <div className='flex flex-col gap-4 my-auto'>
                  <div className='text-primary text-3xl font-bold'>Absolutely No Annual Fees or Subscriptions</div>
                  <div className=''>Please note that our product does not require an annual payment or subscription fee. All costs associated with the product are one-time payments only</div>
                  <div className=''>There are no recurring charges or hidden fees.</div>
                </div>
              </div>
            </section>
          </Container>

          {/* <Container>
            <section className='flex flex-col gap-5 my-10'>
              <h2 className='text-center text-4xl font-bold'>Plug-and-Play</h2>
              <div className='border-t-2 flex border-r-2 border-l-2 border-b border-b-transparent border-primary h-96 rounded-2xl'>
                <img className='m-auto' src="/products/playButton.webp" alt="" />
              </div>
            </section>
          </Container> */}
          <Container>
            <section className='flex flex-col gap-5 mt-20'>
              <h2 className='text-center text-4xl font-bold'>Frequently Asked Questions</h2>
              {/* <div className='grid grid-cols-4 mt-3'>
                {[{ title: "Product", id: 1 }, { title: "Product", id: 2 }, { title: "Product", id: 3 }, { title: "Product", id: 4 }].map(({ title, id }) => (
                  <div key={id} onClick={() => {
                    setSelectedFQ(id);
                  }} className={`mx-auto text-lg font-bold cursor-pointer ${id === selectedFQ ? "text-primary" : ""}`}>{title}</div>
                ))}
              </div> */}
              <div className='flex flex-col divide-y divide-primary divide-opacity-25 border-primary border-opacity-50 border-t p-6 rounded-lg'>
                <ProductAttrebuteComponent items={"Each add-on has it own mining speed which means higher earning ."} term={"What is the difference between ADD-ONS?"} />
                <ProductAttrebuteComponent items={"We ship worldwide except to Mainland china"} term={"Which countries do you ship to ?"} />
                <ProductAttrebuteComponent items={"You can buy as many devices as you want"} term={"How many devices can I buy ?"} />
                <ProductAttrebuteComponent items={"It runs our own OS (konnektOS)"} term={"What OS does your device run?"} />
                <ProductAttrebuteComponent items={"konnektVPN does not store logs or data"} term={"Does konnektvpn uses my data ?"} />
              </div>
            </section>
          </Container>
        </main>}
    </>
  )
}

Product.getLayout = function getLayout(page: JSX.Element) {
  return <Store>{page}</Store>
};

const ProductAttrebuteComponent: React.FC<{
  term: string;
  items: any[] | string
}> = ({ term, items }) => {
  const [show, setShow] = useState(false);
  return <div onClick={() => setShow(v => !v)}>
    <div className='font-bold py-4 text-xl flex justify-between cursor-pointer'>
      <div>{term}</div>
      {show ? <KeyboardArrowUpIcon className='text-primary' /> : <KeyboardArrowRightIcon className='text-primary' />}
    </div>
    <div className={`flex flex-col gap-2 max-h-96 overflow-auto ${show ? "mb-4" : ""}`}>
      {show && (Array.isArray(items) ? items.map((item: any, index) => (
        <div key={index} className=''>{typeof item === 'string' ? item : `${item?.name} (${item?.description})`}</div>
      )) : items)}
    </div>
  </div>
}

export default Product