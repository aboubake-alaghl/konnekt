/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Link from "next/link";
import { useRouter } from "next/router";
import IconButton from '@mui/material/IconButton';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography'
import Stack from "@mui/material/Stack";
import Image from 'next/image';
import Button from "@mui/material/Button";
import { useRTL } from "@/contexts/SettingsProvider";
import { AboutUS, Application, KPNToken } from "@/data/links";
import useAuth from "@/hooks/useAuth";
import useMuiModal from "@/hooks/useMuiModal";
import LoginModalComponent from "./modal-components/LoginModalComponent";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import useCart from "@/hooks/useCart";

const NavbarStore = (): JSX.Element => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const { setRTLMode } = useRTL();
    const { user, logout, isAuthenticated } = useAuth();
    const { count } = useCart();

    const { ModalComponent, setModalComponent, closeModal } = useMuiModal({
        width: 400,
        maxHeight: 550,
        p: 0,
        borderRadius: 5
    });

    const router = useRouter()
    const { locales, locale: activeLocale, pathname, query, asPath } = router;

    useEffect(() => {
        if (activeLocale === 'ar') {
            setRTLMode(true);
        } else {
            setRTLMode(false);
        }
    }, [activeLocale])

    // const lang = [{
    //     name: navbarT("ar"),
    //     locale: "ar",
    //     iconURL: "/saudi-arabia.webp"
    // }, {
    //     name: navbarT("en"),
    //     locale: "en",
    //     iconURL: "/united-states-of-america.webp"
    // }];

    const drawer = (
        <List sx={{
            px: 2,
            py: 2
        }}>
            <div className="text-primary text-lg  font-bold">Application</div>
            {Application.map(({ title, link }, index) => (
                <ListItem key={index}>
                    <Link passHref href={link}>
                        <Typography textAlign={'center'} marginX={'auto'} >{title}</Typography>
                    </Link>
                </ListItem>
            ))}
            <ListItem >
                <Link passHref href={'/cards'}>
                    <Typography textAlign={'center'} marginX={'auto'} >{"Cards"}</Typography>
                </Link>
            </ListItem>

            <div className="text-primary text-lg  font-bold mt-10">KPNToken</div>
            {KPNToken.map(({ title, link }, index) => (
                <ListItem key={index}>
                    <Link passHref href={link}>
                        <Typography textAlign={'center'} marginX={'auto'} >{title}</Typography>
                    </Link>
                </ListItem>
            ))}


            <div className="text-primary text-lg  font-bold mt-10">About us</div>
            {AboutUS.map(({ title, link }, index) => (
                <ListItem key={index}>
                    <Link passHref href={link}>
                        <Typography textAlign={'center'} marginX={'auto'} >{title}</Typography>
                    </Link>
                </ListItem>
            ))}
            <ListItem >
                <Link passHref href={'/contact-us'}>
                    <Typography textAlign={'center'} marginX={'auto'} >{"Contact us"}</Typography>
                </Link>
            </ListItem>


            <div className="mx-4 mt-4">
                {user
                    ?
                    <div className="flex flex-col gap-3">
                        <Link href={'/dashboard'}><Button fullWidth size='small' variant="contained" >{"Dashboard"}</Button></Link>
                        <Button onClick={logout} fullWidth size='small' variant="text" >Signout</Button>
                    </div>
                    :
                    <Button onClick={() => {
                        setModalComponent(<LoginModalComponent pushDashboard={false} onExit={closeModal} setModalComponent={setModalComponent} />)
                    }} size='small' variant="contained" >{"Login"}</Button>
                }
            </div>
        </List>
    );

    return (
        <>
            <Container className="md:p-4 p-2 absolute z-[9999] mx-auto left-0 right-0" maxWidth={false} sx={{
                maxWidth: 1920,
                zIndex: 999
            }}>
                <Box display={"flex"} justifyContent="space-between">
                    <Box display={"flex"} >
                        <Link passHref href={'/'}>
                            <Stack sx={{
                                cursor: "pointer"
                            }} direction={"row"}>
                                <Box>
                                    <Image alt="Logo" src={'/logo.svg'} width={35} height={35} />
                                </Box>
                                <Typography marginY={'auto'} fontSize={{ md: 23, sm: 18, xs: 18 }} >
                                    KonnektVPN
                                </Typography>
                            </Stack>
                        </Link>
                    </Box>
                    <Box display={"flex"} gap={2}>
                        {/* <Stack sx={{
                                display: { lg: "flex", md: "none", sm: "none", xs: "none" },
                                marginY: "auto"
                            }}
                                direction="row" spacing={4} marginX={4}>
                                {shortHandLinks.map(({ title, link }, i) => (
                                    <Link key={i} passHref href={link}>
                                        <Typography className={`uppercase hover:opacity-60 ${link === pathname ? "text-primary" : ""}`} variant="body2">{title}</Typography>
                                    </Link>
                                ))}
                            </Stack> */}
                        {/* <PopupState variant="popover" popupId="demo-popup-menu">
                            {(popupState) => (
                                <>
                                    <div className="hidden md:block mx-1 my-auto cursor-pointer" {...bindHover(popupState)} >
                                        Application
                                        <ArrowDropDownIcon />
                                    </div>

                                    <HoverMenu {...bindMenu(popupState)}>
                                        {Application.map(({ link, title }, i) => (
                                            <MenuItem key={i} className="w-40" onClick={popupState.close}>
                                                <Link href={link}>
                                                    <Stack direction="row">
                                                        <Typography marginY={'auto'} sx={{
                                                            marginRight: 3.5
                                                        }} width={65} >{title}</Typography>
                                                    </Stack>
                                                </Link>
                                            </MenuItem>
                                        ))}
                                    </HoverMenu>
                                </>
                            )}
                        </PopupState> */}
                        <Stack sx={{
                            display: { lg: "flex", md: "none", sm: "none", xs: "none" },
                            marginY: "auto"
                        }}
                            direction="row" spacing={4} >
                            {[{ title: "Main", link: "/products/product" }].map(({ title, link }, i) => (
                                <Link key={i} passHref href={link}>
                                    <div className="mx-1 my-auto cursor-pointer" >
                                        {title}
                                    </div>
                                </Link>
                            ))}
                        </Stack>

                        <Stack sx={{
                            display: { lg: "flex", md: "none", sm: "none", xs: "none" },
                            marginY: "auto"
                        }}
                            direction="row" spacing={4} >
                            {[{ title: "Docs", link: "/filearchive" }].map(({ title, link }, i) => (
                                <Link key={i} passHref href={link}>
                                    <div className="mx-1 my-auto cursor-pointer" >
                                        {title}
                                    </div>
                                </Link>
                            ))}
                        </Stack>


                        <Stack sx={{
                            display: { lg: "flex", md: "none", sm: "none", xs: "none" },
                            marginY: "auto"
                        }}
                            direction="row" spacing={4} >
                            {[{ title: "Contact us", link: "/contact-us" }].map(({ title, link }, i) => (
                                <Link key={i} passHref href={link}>
                                    <div className="mx-1 my-auto cursor-pointer" >
                                        {title}
                                    </div>
                                </Link>
                            ))}
                        </Stack>

                        {/* <PopupState variant="popover" popupId="demo-popup-menu">
                            {(popupState) => (
                                <>
                                    <div className="hidden md:block mx-1 my-auto cursor-pointer" {...bindHover(popupState)} >
                                        KPNToken
                                        <ArrowDropDownIcon />
                                    </div>

                                    <HoverMenu  {...bindMenu(popupState)}>
                                        {KPNToken.map(({ link, title }, i) => (
                                            <MenuItem key={i} className="w-40" onClick={popupState.close}>
                                                <Link href={link}>
                                                    <Stack direction="row">
                                                        <Typography marginY={'auto'} >{title}</Typography>
                                                    </Stack>
                                                </Link>
                                            </MenuItem>
                                        ))}
                                    </HoverMenu>
                                </>
                            )}
                        </PopupState> */}

                        {/* <Stack sx={{
                            display: { lg: "flex", md: "none", sm: "none", xs: "none" },
                            marginY: "auto"
                        }}
                            direction="row" spacing={4} >
                            {[{ title: "Cards", link: "/cards" }].map(({ title, link }, i) => (
                                <Link key={i} passHref href={link}>
                                    <div className="mx-1 my-auto cursor-pointer" >
                                        {title}
                                    </div>
                                </Link>
                            ))}
                        </Stack> */}

                        {/* <PopupState variant="popover" popupId="demo-popup-menu">
                            {(popupState) => (
                                <>
                                    <div className="hidden md:block mx-1 my-auto cursor-pointer" {...bindHover(popupState)} >
                                        About us
                                        <ArrowDropDownIcon />
                                    </div>

                                    <HoverMenu  {...bindMenu(popupState)}>
                                        {AboutUS.map(({ link, title }, i) => (
                                            <MenuItem key={i} className="w-40" onClick={popupState.close}>
                                                <Link href={link}>
                                                    <Stack direction="row">
                                                        <Typography marginY={'auto'} >{title}</Typography>
                                                    </Stack>
                                                </Link>
                                            </MenuItem>
                                        ))}
                                    </HoverMenu>
                                </>
                            )}
                        </PopupState> */}

                        {/* <Stack sx={{
                            display: { lg: "flex", md: "none", sm: "none", xs: "none" },
                            marginY: "auto"
                        }}
                            direction="row" spacing={4} >
                            {[{ title: "Contact us", link: "/contact-us" }].map(({ title, link }, i) => (
                                <Link key={i} passHref href={link}>
                                    <div className="mx-1 my-auto cursor-pointer" >
                                        {title}
                                    </div>
                                </Link>
                            ))}
                        </Stack> */}

                        <div className="my-auto">
                            <IconButton
                                onClick={() => {
                                    if (isAuthenticated) {
                                        router.push('/products/checkout')
                                    } else {
                                        setModalComponent(<LoginModalComponent pushDashboard={false} onExit={closeModal} setModalComponent={setModalComponent} />)
                                    }
                                }}
                                aria-label="Cart"
                            >
                                <Badge badgeContent={count} color="primary">
                                    <ShoppingCartOutlinedIcon className="my-auto" />
                                </Badge>
                            </IconButton>
                        </div>

                        <div dir="ltr" className="md:flex hidden mx-3 space-x-3">
                            {/* <div className="my-auto">
                                <Tooltip title={navbarT('Notavailableatthemoment') as string}>
                                    <Button  size='small' variant="contained" >{navbarT('SignIn') as string}</Button>
                                </Tooltip>
                            </div> */}
                            <div className="my-auto">
                                {user
                                    ?
                                    <div className="gap-2 flex">
                                        <Link href={'/dashboard'}><Button size='small' variant="contained" >{"Dashboard"}</Button></Link>
                                        <Button onClick={logout} size='small' variant="text" >Signout</Button>
                                    </div>
                                    :
                                    <Button onClick={() => {
                                        setModalComponent(<LoginModalComponent pushDashboard={false} onExit={closeModal} setModalComponent={setModalComponent} />)
                                    }} size='small' variant="contained" >{"Login"}</Button>
                                }
                            </div>
                        </div>



                        {/* <div className="hidden lg:flex">
                            <Tooltip title="temporarily button to view all the available pages">
                                <IconButton

                                    onClick={() => {
                                        setIsDrawerOpen(!isDrawerOpen);
                                    }}
                                    aria-label="Menu"
                                    size="medium"
                                >
                                    <MenuIcon fontSize="large" />
                                </IconButton>
                            </Tooltip>
                        </div> */}

                        <div className="lg:hidden flex">
                            <IconButton
                                onClick={() => {
                                    setIsDrawerOpen(!isDrawerOpen);
                                }}
                                aria-label="Menu"
                                size="medium"
                            >
                                <MenuIcon fontSize="large" />
                            </IconButton>
                        </div>

                    </Box>
                </Box>

                <SwipeableDrawer
                    anchor="right"
                    id="navbarDrawer"
                    open={isDrawerOpen}
                    onOpen={() => {
                        setIsDrawerOpen(true);
                    }}
                    onClose={() => {
                        setIsDrawerOpen(false);
                    }}
                >
                    {drawer}
                </SwipeableDrawer>
            </Container >
            {ModalComponent}
        </>
    );
};

export default NavbarStore;