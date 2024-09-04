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
import Tooltip from "@mui/material/Tooltip";
import { useRTL } from "@/contexts/SettingsProvider";
import links from "@/data/links";

const Navbar = (): JSX.Element => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const { setRTLMode } = useRTL();

    const router = useRouter()
    const { locales, locale: activeLocale, pathname, query, asPath } = router;

    useEffect(() => {
        if (activeLocale === 'ar') {
            setRTLMode(true);
        } else {
            setRTLMode(false);
        }
    }, [activeLocale])

    const drawer = (
        <div>
            <List sx={{
                px: 2,
                py: 4
            }}>
                {links.map(({ title, link }, index) => (
                    <ListItem key={index}>
                        <Link passHref href={link}>
                            <Typography textAlign={'center'} marginX={'auto'} variant="h6">{title}</Typography>
                        </Link>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <div className="bg-[#171919]">
            <Container className="md:p-4 p-1" maxWidth={false} sx={{
                maxWidth: 1920,
                zIndex: 999
            }}>
                <Box display={"flex"} justifyContent="space-between">
                    <Box display={"flex"} >
                        <Link passHref href={'/'}>
                            <Stack sx={{
                                cursor: "pointer"
                            }} direction={"row"}>
                                <Box sx={{
                                    // display: { md: "flex", sm: "none", xs: "none" },
                                }}>
                                    <Image alt="Logo" src={'/logo.svg'} width={35} height={35} />
                                </Box>
                                <Typography marginY={'auto'} fontSize={{ md: 23, sm: 18, xs: 18 }} >
                                    KonnektVPN
                                </Typography>
                            </Stack>
                        </Link>

                    </Box>
                    <Box display={"flex"} >
                        <Stack sx={{
                            display: { md: "flex", sm: "none", xs: "none" },
                            marginY: "auto"
                        }}
                            direction="row" spacing={4} marginX={4}>
                            {links.map(({ title, link }, i) => (
                                <Link key={i} passHref href={link}>
                                    <Typography className={`uppercase hover:opacity-60 ${link === pathname ? "text-primary" : ""}`} variant="body2">{title}</Typography>
                                </Link>

                            ))}
                        </Stack>
                        <div dir="ltr" className="md:flex hidden mx-3 space-x-3">
                            {/* <div className="my-auto">
                                <Tooltip title={navbarT('Notavailableatthemoment') as string}>
                                    <Button color="secondary" size='small' variant="contained" >{navbarT('SignIn') as string}</Button>
                                </Tooltip>
                            </div> */}
                            <div className="my-auto">
                                <Link href={'/auth/login'}><Button  size='small' variant="contained" >{"Signin"}</Button></Link>
                            </div>
                        </div>

                        {/* <PopupState variant="popover" popupId="demo-popup-menu">
                            {(popupState) => (
                                <>
                                    <Typography sx={{
                                        marginX: 1
                                    }} {...bindTrigger(popupState)} marginY={"auto"} variant="body1">{navbarT(lang.find((item) => (item.locale === activeLocale))!.locale) as string}
                                    </Typography>
                                    <div className="my-auto">
                                        <img className="w-8 mt-2 mx-1" src={lang.find((item) => (item.locale === activeLocale))!.iconURL} alt="" />
                                    </div>

                                    <Menu {...bindMenu(popupState)}>
                                        {lang.map((item, i) => (
                                            <li key={item.locale}>
                                                <Link href={{ pathname, query }} as={asPath} locale={item.locale}>
                                                    <MenuItem onClick={popupState.close}>
                                                        <Stack direction="row">
                                                            <Typography marginY={'auto'} sx={{
                                                                marginRight: 3.5
                                                            }} width={65} variant="h6">{item.name}</Typography>
                                                            <img width={50} height={50} src={item.iconURL} alt="" />
                                                        </Stack>
                                                    </MenuItem>
                                                </Link>
                                            </li>
                                        ))}
                                    </Menu>
                                </>
                            )}
                        </PopupState> */}
                        <IconButton
                            sx={{
                                display: { md: "none" },
                            }}
                            onClick={() => {
                                setIsDrawerOpen(!isDrawerOpen);
                            }}
                            aria-label="Menu"
                            size="medium"
                        >
                            <MenuIcon fontSize="large" />
                        </IconButton>
                    </Box>
                </Box>

                <SwipeableDrawer
                    // sx={{
                    //     ".css-1vxvp5a-MuiPaper-root-MuiDrawer-paper": {
                    //         backgroundColor: "#B40000 !important",
                    //         backgroundImage: "none !important",
                    //     },
                    //     // THIS CLASS IS ONLY KNOWN AFTER PUSHING TO THE HOSTING SERVER
                    //     ".css-p65fxs": {
                    //         backgroundColor: "#B40000 !important",
                    //         backgroundImage: "none !important",
                    //     },
                    // }}
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
        </div>
    );
};

export default Navbar;