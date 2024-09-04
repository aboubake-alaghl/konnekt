import { indexNews } from "@/api/strapi/news";
import RunningText from "@/components/RunningText";
import BlogComponent from "@/components/common/BlogComponent";
import { StrapiNewsInterface } from "@/interfaces/StrapiNewsInterface";
import Layout from "@/layouts";
import Skeleton from "@mui/material/Skeleton";
import Tooltip from "@mui/material/Tooltip";
import Container from "@mui/material/Container";
import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import Link from "next/link";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const whatWeOffer = [{
  icon: "proofOfValue.svg",
  title: "Proof of Value",
  description: "Our POV system will prevent the price from dropping under the ICO price. We create a scenario to stabilize the price by buying tokens when the price drops to keep the uptrend"
},
{
  icon: "aiVPN.svg",
  title: "AI VPN",
  description: "Leveraging AI, KonnektVPN optimizes network performance and security in real-time, adapting to changing conditions to ensure superior service quality and user protection."
},
{
  icon: "proofOfTime.svg",
  title: "Proof of Time",
  description: "Users are rewarded with KPN tokens not just for using the VPN, but for their role in training the AI model. This system recognizes and incentivizes the valuable contribution of users in enhancing the AI's capabilities."
},
{
  icon: "exoFriendly.svg",
  title: "Eco-friendly mining",
  description: "Through the KonnektVPN app and network devices, users can mine KPN tokens in an environmentally sustainable manner, diverging from the energy-intensive processes associated with conventional cryptocurrency mining."
}];

export default function Home() {

  const newsQuery = useQuery<StrapiNewsInterface>({
    queryKey: ["news"],
    queryFn: () => indexNews<StrapiNewsInterface>({
      populate: 'cover',
      pagination: {
        page: 1,
        pageSize: 3
      },
      sort: 'createdAt:desc'
    }).then(({ data }) => data)
  });

  return (
    <>
      <Head>
        <title>{"KonnektVPN"}</title>
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

      <main>

        <section className="bg-cover w-full bg-hero-image h-[800px]" >
          <Container>
            <div className="text-center md:pt-52 pt-32   flex flex-col sm:gap-20 gap-10">
              <div>
                <h1 className="md:text-7xl text-4xl bg-gradient-to-r from-[#44c7ff94] to-[#191e1cb8] rounded-full lg:w-max mx-auto px-10 py-1">Konnekt with the future</h1>
                <h1 className="md:text-7xl text-4xl ">of Next-gen AI VPNs </h1>
              </div>
              <p className="xxs:text-xl">Become a part of our AI revolution and experience unmatched privacy and performance with KonnektVPN. Leverage our next-gen VPN solutions to experience a VPN built for the modern world.</p>
              <div className="flex flex-col xxs:flex-row mx-auto gap-5">
                <Link passHref href={'/tokenomics'}><button className="border-2 px-6 py-2 rounded-full border-[#9effe4ab] hover:bg-[#9effe468] transition-all">TOKENOMICS</button></Link>
                <Link passHref href={'https://konnektvpn.com/docs/whitepaper.pdf'}><button className="border-2 px-6 py-2 rounded-full border-[#9effe4ab] hover:bg-[#9effe468] transition-all">WHITEPAPER</button></Link>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-black">
          <Container>
            <div className="text-center py-20 flex flex-col gap-20">
              <div className="flex flex-col gap-5">
                <h1 className="text-primary md:text-5xl text-3xl font-semibold">What We Offer</h1>
                <div className="">We offer a wide range of services and solutions that is needed is the crypto world</div>
                <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-3 mt-5">
                  {whatWeOffer.map((offer, index) => (
                    <div key={index} className="flex flex-col gap-3 bg-gradient-to-b from-[#1a1a1a9c] to-black rounded-xl py-5 px-8 border-t-2 border-primary">
                      <img className="mx-auto" src={offer.icon} alt="" />
                      <div className="text-primary font-bold md:text-2xl text-xl">{offer.title}</div>
                      <p className="text-[#8F8F8F] md:text-base text-sm">{offer.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section>
          <Container>
            <div className="flex flex-col md:flex-row py-20">

              {/* Should be images sliding here */}
              <div className="md:w-1/2">
                <Swiper
                  // slidesPerView={1}
                  speed={1500}
                  autoplay={{
                    delay: 4000,
                  }}
                  loop
                  effect="fade"
                  modules={[EffectFade, Autoplay]}
                >
                  {[
                    { src: "/homepage/phone1.webp", alt: "image-1" },
                    { src: "/homepage/phone2.webp", alt: "image-2" },
                    { src: "/homepage/phone3.webp", alt: "image-3" },
                    { src: "/homepage/phone4.webp", alt: "image-4" },
                  ].map(({ src }, idx) => (
                    <SwiperSlide key={idx} >
                      <img className="" src={src} alt="" />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              {/* <img className="md:w-1/2" src="/homepage/phone1.webp" alt="" /> */}
              {/* Should be images sliding here */}

              <div className="flex flex-col gap-5 text-[#B1B1B1] mt-[10%]">
                <h1 className="text-primary lg:text-4xl text-3xl font-medium">Download our app today!</h1>
                <p className="mt-8 text-justify lg:text-base text-sm">KonnektVPN app offers you a wide range of services to make your everyday life easier and efficient. It’s your protection against any online threats, your chance to earn passive income in the easiest way possible, and most importantly, a huge vpn upgrade for you! KonnektVPN cares about your personal needs so we customize your vpn experience to fit your individual needs. Download now and step up your game</p>
                <div className="lg:text-base text-sm">Get the app from the app stores</div>
                <div className="flex flex-col xxs:flex-row gap-3 text-white">
                  <Tooltip title="iOS version not available at the moment">
                    <a className="" href="#">
                      <button className="h-14 w-52 border-[#3582A0] filter grayscale border-2 flex rounded-xl md:py-1 py-1 md:px-5 px-4 gap-4">
                        {/* <button className="h-14 border-[#3582A0] border-2 flex rounded-xl md:py-1 py-1 md:px-5 px-4 gap-4"> */}
                        <img src="/blueApple.svg" alt="" className="-ml-2" />
                        <div className="mx-auto">
                          <div className="text-xs font-medium opacity-90 w-max">Download on The</div>
                          <div className="md:text-xl text-base font-bold text-justify w-max">App Store</div>
                        </div>
                      </button>
                    </a>
                  </Tooltip>
                  <a href="https://play.google.com/store/apps/details?id=com.konnektvpn.app" target='_blank'>
                    <button className="h-14 w-52  border-[#3582A0] border-2 flex rounded-xl md:py-1 py-1 md:px-5 px-4 gap-4">
                      <img src="/bluePlaystore.svg" alt="" className="-ml-2" />
                      <div className="mx-auto">
                        <div className="text-xs font-medium opacity-90 uppercase text-left w-max">Get it on</div>
                        <div className="md:text-xl text-base font-bold text-justify w-max">Google Play</div>
                      </div>
                    </button>
                  </a>
                </div>
                {/* <div className="lg:text-base text-sm">
                  More than <span className="text-primary">800000+</span> Downloads, About <span className="text-primary">30</span> new download every minute
                </div> */}
                <div>
                  <button className="text-white border-2 px-6 py-2 rounded-full border-[#9effe4ab] hover:bg-[#9effe468] transition-all">Learn More</button>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section>
          <Container>
            <div className="flex flex-col md:flex-row py-20">
              <div className="flex flex-col sm:gap-10 gap-5 text-[#B1B1B1] my-auto">
                <h1 className="text-primary  sm:text-4xl text-3xl  font-medium xxs:border-2 border-primary rounded-full xxs:p-4 xxs:w-max">Join the AI Revolution</h1>
                <p className="text-justify lg:text-base text-sm">In addition to our app, we present to you our devices: The Miners! Our network devices are like the AI's trusted sidekick, gathering network data in real-time to supercharge its learning process. From network metrics to user behaviors, these devices collect a goldmine of information, helping our AI make smarter decisions and adapt to your needs faster.</p>
                <div>
                  <button className="text-white border-2 px-6 py-2 rounded-full border-[#9effe4ab] hover:bg-[#9effe468] transition-all">Visit Store</button>
                </div>
              </div>
              <img className="md:w-1/2" src="/joinTheAiRevolution.webp" alt="" />
            </div>
          </Container>
        </section>

        <section>
          <Container>
            <div className="flex flex-col md:flex-row py-20">
              <img className="md:w-1/2" src="/downloadOurAppTodayLeft.webp" alt="" />
              <div className="md:text-left text-center md:w-1/2 flex flex-col gap-10 text-[#B1B1B1] my-auto">
                <h1 className="text-primary lg:text-4xl text-3xl font-medium ">Explore our Levels!</h1>
                <p className="text-justify lg:text-base text-sm">Discover KonnektVPN's "Levels" system, designed to help you earn more passive income on your investment. With smart contracts on the blockchain, your funds are securely locked, ensuring transparency and safety. Control your investments, enjoy automatic token releases, and watch your wealth grow effortlessly.</p>
                {/* <Link href={'/levels'}> */}
                <Link passHref href={'/levels'}><button className="text-white border-2 px-6 py-2 rounded-full border-[#9effe4ab] hover:bg-[#9effe468] transition-all">Learn More</button></Link>
                {/* </Link> */}
              </div>
            </div>
          </Container>
        </section>

        <section>
          <Container>
            <div className="flex flex-col md:flex-row py-20">
              <img className="md:w-1/2" src="/maximizeyourbenefitswithKonnektVPN.webp" alt="" />
              <div className="md:text-left text-center md:w-1/2 flex flex-col gap-10 text-[#B1B1B1] my-auto">
                <h1 className="text-primary lg:text-4xl text-3xl font-medium">Maximize your benefits with KonnektVPN by selecting the perfect plan tailored to your needs.</h1>
                <p className="text-justify lg:text-base text-sm">Choose the subscription plan that fits your lifestyle and start enjoying a safer, more secure internet experience today.</p>
                <Link passHref href={'/plans'}>
                  <button className="text-white border-2 px-6 py-2 rounded-full border-[#9effe4ab] hover:bg-[#9effe468] transition-all">Choose your plan</button>
                </Link>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-black relative overflow-hidden">
          <img className="absolute left-10 top-2" src="/bigEllipse.webp" alt="" />
          <img className="absolute bottom-10 -left-3" src="/midEllipse.webp" alt="" />
          <img className="absolute bottom-10 right-36" src="/midEllipse.webp" alt="" />
          <img className="absolute right-52 top-40" src="/smallEllipse.webp" alt="" />

          <Container>
            <div className="text-center py-20 flex flex-col gap-20">
              <div className="flex flex-col gap-16">
                {/* <h1 className="text-primary lg:text-5xl text-4xl font-semibold my-8">MEET OUR TEAM</h1> */}
                {/* <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-3 ">
                  {[1, 1, 1, 1].map((_, index) => (
                    <div key={index} className="flex flex-col border-t border-r border-l p-1 rounded-2xl border-[#2B2B2C] ">
                      <img className="w-full" src="person1.webp" alt="" />
                      <h2 className="text-primary text-2xl mt-2">Mohammed Ahmed</h2>
                      <div>CEO</div>
                      <div className="flex gap-2 mx-auto mt-2">
                        <img className="cursor-pointer" src="whiteLinkedIn.webp" alt="" />
                        <img className="cursor-pointer" src="whiteX.webp" alt="" />
                        <img className="cursor-pointer" src="whiteMail.webp" alt="" />
                      </div>
                    </div>
                  ))}
                </div> */}
                <div className="my-12 mx-auto flex flex-col gap-12 z-50" >
                  <img src="/cards.webp" alt="" />
                  <Link passHref href={'/cards'}>
                    <button className="text-white border-2 px-6 py-2 rounded-full border-primary hover:bg-[#9effe468] transition-all">Choose your card</button>
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section>
          <Container>
            <div className="text-center py-12 flex flex-col gap-20">
              <div className="flex flex-col gap-5">
                <h1 className="text-primary lg:text-5xl text-3xl font-semibold">Partners</h1>
                <RunningText className="mt-4" />
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-black">
          <Container>
            <div className="text-center py-8 flex flex-col">
              <div className="flex flex-col gap-8">
                <h1 className="text-primary lg:text-5xl text-3xl font-semibold">News & Events</h1>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-3 ">
                  {newsQuery.isSuccess && newsQuery.data.data.map((news, index) => (
                    <BlogComponent news={news} key={index} />
                  ))}
                  {newsQuery.isLoading &&
                    [1, 1, 1].map(() => (
                      <Skeleton animation="wave" variant='rectangular' className='!h-64' />
                    ))
                  }
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}

Home.getLayout = function getLayout(page: JSX.Element) {
  return <Layout>{page}</Layout>
};