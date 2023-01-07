import styles from './styles.module.scss';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

import { PayPalButtons } from '@paypal/react-paypal-js';

import { add } from '../../services/firebaseConnection';
import { async } from '@firebase/util';
import { useState } from 'react';
import Image from 'next/image';

interface DonatePorps {
  user: {
    nome: string;
    id: string;
    image: string;
  };
}

export default function Donate({ user }: DonatePorps) {
  const [vip, setVip] = useState(false);

  async function handleSaveDonate() {
    const data = {
      donate: true,
      lastDonate: new Date(),
      image: user.image,
    };

    await add('users', data, user.id).then(() => {
      setVip(true);
    });
  }

  return (
    <>
      <Head>
        <title>Ajude a plataforma board ficar online!</title>
      </Head>
      <main className={styles.container}>
        <Image
          src='/images/rocket.svg'
          alt='Seja Apoiador'
          className={styles.rocket}
          width={409}
          height={342}
        />

        {vip && (
          <div className={styles.vip}>
            <Image 
            src={user.image} 
            alt='Foto de perfil do usuario'
            width={50}
            height={50}
            />
            <span>Parabéns você é um novo apoiador!</span>
          </div>
        )}

        <h1>Seja um apoiador deste projeto 🏆</h1>
        <h3>
          Contribua com apenas <span>R$ 1,00</span>
        </h3>
        <strong>
          Apareça na nossa home, tenha funcionalidades exclusivas.
        </strong>

        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: '1',
                  },
                },
              ],
            });
          }}
          onApprove={async (_data, actions) => {
            const details = await actions.order.capture();
            console.log(
              'Transaction completed by ' + details.payer.name.given_name
            );
            handleSaveDonate();
          }}
        />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session?.id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const user = {
    nome: session?.user.name,
    id: session?.id,
    image: session?.user.image,
  };

  return {
    props: {
      user,
    },
  };
};
