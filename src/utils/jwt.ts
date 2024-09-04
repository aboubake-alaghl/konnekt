//
import axios from './axios';
import { me } from '@/api/User';
import { tokenName } from '@/config';
import UserProfileInterface from '@/interfaces/UserProfileInterface';

export const getUserByToken = async () => {
  const res = await me<UserProfileInterface>();
  return res?.data;
};

export const setSession = (accessToken?: string) => {
  if (accessToken) {
    localStorage.setItem(tokenName, accessToken);
    axios.defaults.headers.common.Authorization = `Bearer-Web ${accessToken}`;
  } else {
    localStorage.removeItem(tokenName);
    delete axios.defaults.headers.common.Authorization;
  }
};