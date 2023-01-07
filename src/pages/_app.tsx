import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import '../styles/global.scss';
import { Header } from '../components/Header';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

const initialOptions = {
  'client-id':
    'AWNeUfBkVz4dkKDIUncQgY6t4-Bmz5DCBI6h1HH1fHKSqJxPiGIhUlnHPUJVIJZj37K9iBjBJCvqc3Gy',
  currency: 'BRL',
  intent: 'capture',
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <PayPalScriptProvider options={initialOptions}>
          <Header />
          <Component {...pageProps} />
        </PayPalScriptProvider>
      </SessionProvider>
    </>
  );
}
