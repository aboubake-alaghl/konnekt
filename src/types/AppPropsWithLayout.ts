import type { EmotionCache } from '@emotion/react';
import type { AppProps } from 'next/app';
import type { NextPageWithLayout } from './NextPageWithLayout';

export type MyAppProps = AppProps & {
    Component: NextPageWithLayout;
    emotionCache?: EmotionCache;
};