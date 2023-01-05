import Head from 'next/head';
import styles from './styles.module.scss';
import { FiPlus, FiCalendar, FiEdit2, FiTrash, FiClock } from 'react-icons/fi';
import { SupportButton } from '../../components/SupportButton';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useState } from 'react';

import { add } from '../../services/firebaseConnection';

interface BoardProps {
  user: {
    nome: string;
    id: string;
  };
}

export default function Board({ user }: BoardProps) {
  const [input, setInput] = useState('');

  async function handleAddTask(e: React.FormEvent) {
    e.preventDefault();

    if (input === '') return alert('Digite uma tarefa!');

    const data = {
      created: new Date(),
      tarefa: input,
      userId: user.id,
      nome: user.nome,
    };

    const path = 'tasks';

    await add(path, data)
      .then((doc) => console.log('Tarefa adicionada com sucesso!'))
      .catch((error) => {
        console.error('Error adding document: ', error);
      });

    setInput('');
  }

  return (
    <>
      <Head>
        <title>Minhas tarefas - Board</title>
      </Head>
      <main className={styles.container}>
        <form onSubmit={handleAddTask}>
          <input
            type='text'
            placeholder='Digite sua tarefa'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type='submit'>
            <FiPlus size={25} color='#17181f' />
          </button>
        </form>

        <h1>Você tem 2 tarefas!</h1>

        <section>
          <article className={styles.taskList}>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
            </p>
            <div className={styles.actions}>
              <div>
                <div>
                  <FiCalendar size={20} color='#ffb800' />
                  <time>17 Julho 2021</time>
                </div>
                <button>
                  <FiEdit2 size={20} color='#fff' />
                  <span>Editar</span>
                </button>
              </div>
              <button>
                <FiTrash size={20} color='#ff3636' />
              </button>
            </div>
          </article>
        </section>
      </main>

      <div className={styles.vipContainer}>
        <h3>Obrigado por apoiar esse projeto.</h3>
        <div>
          <FiClock size={28} color='#fff' />
          <time>Última doação foi a 3 dias.</time>
        </div>
      </div>

      <SupportButton />
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
    nome: session?.user?.name,
    id: session?.id,
  };

  return {
    props: { user },
  };
};
