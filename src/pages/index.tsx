import { GetStaticProps } from 'next';
import Head from 'next/head';
import style from '../styles/styles.module.scss';

export default function Home() {
  return (
    <>
      <Head>
        <title>Board - Organizando suas tarefas.</title>
      </Head>
      <main className={style.contentContainer}>
        <img src='images/board-user.svg' alt='Board' />
        <section className={style.callToAction}>
          <h1>
            Uma ferramenta para o seu dia a dia Escreva, planeje e organize-se..
          </h1>
          <p>
            <span>100% Gratuita</span> e online.
          </p>
        </section>

        <div className={style.donaters}>
          <img
            src='https://avatars.githubusercontent.com/u/12345678?v=4'
            alt='Ilustração'
          />
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    revalidate: 60 * 60, // 1 hour
  };
}