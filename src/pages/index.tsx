import { GetStaticProps } from 'next';
import Head from 'next/head';
import style from '../styles/styles.module.scss';
import { getUsers } from '../services/firebaseConnection';
import { useState } from 'react';
import Image from 'next/image';

type User = {
  id: string;
  donate: boolean;
  image: string;
  lastDonate: Date;
};

interface HomeProps {
  data: string;
}

export default function Home({ data }: HomeProps) {
  const [donaters, setDonaters] = useState<User[]>(JSON.parse(data));
  return (
    <>
      <Head>
        <title>Board - Organizando suas tarefas.</title>
      </Head>
      <main className={style.contentContainer}>
        <Image
          src='images/board-user.svg'
          alt='Board'
          width={553}
          height={384}
        />
        <section className={style.callToAction}>
          <h1>
            Uma ferramenta para o seu dia a dia Escreva, planeje e organize-se..
          </h1>
          <p>
            <span>100% Gratuita</span> e online.
          </p>
        </section>

        <div className={style.donaters}>
          {donaters.map((user) => (
            <Image
              src={user.image}
              alt='imagem doador'
              key={user.id}
              width={65}
              height={65}
            />
          ))}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const users = await getUsers();

  const data = JSON.stringify(users);

  return {
    props: {
      data,
    },
    revalidate: 60 * 60, // 1 hour
  };
};
