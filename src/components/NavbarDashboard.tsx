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
import { useRTL } from "@/contexts/SettingsProvider";
import dashboardLinks from "@/data/dashboardLinks";
import Button from "@mui/material/Button";
import useAuth from "@/hooks/useAuth";

const NavbarDashboard = (): JSX.Element => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const { setRTLMode } = useRTL();
    const { logout } = useAuth();
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
                {dashboardLinks.map(({ title, link }, index) => (
                    <ListItem key={index}>
                        <Link passHref href={link}>
                            <Typography textAlign={'center'} marginX={'auto'} variant="h6">{title}</Typography>
                        </Link>
                    </ListItem>
                ))}
                <ListItem onClick={() => {
                    logout()
                }}>
                    <Typography variant="h6">{'Sign out'}</Typography>
                </ListItem>
            </List>
        </div>
    );

    return (
        <Container className="md:p-10 p-1 z-50 " maxWidth="xl">
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
                        {dashboardLinks.map(({ title, link }, i) => (
                            <Link key={i} passHref href={link}>
                                <Typography className={`uppercase hover:opacity-60 p-2 rounded-full ${link === pathname ? "bg-[#1B3834]" : ""}`} variant="body2">{title}</Typography>
                            </Link>
                        ))}
                        <Button onClick={() => {
                            logout();
                        }} size="small" className="my-auto">
                            Logout
                            {/* <Typography className={`uppercase hover:opacity-60 p-2 rounded-full `} variant="body2">{'Logout'}</Typography> */}
                        </Button>
                    </Stack>
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
    );
};

export default NavbarDashboard;