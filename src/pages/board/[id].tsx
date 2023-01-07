import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FiCalendar } from 'react-icons/fi';
import { getOne } from '../../services/firebaseConnection';
import styles from './task.module.scss';

type Task = {
  id: string;
  created: string | Date;
  createdFormated?: string;
  tarefa: string;
  userId: string;
  nome: string;
};

interface TaskListProps {
  data: string;
}

export default function Task({ data }: TaskListProps) {
  const task = JSON.parse(data) as Task;
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>Detalhes da sua tarefa</title>
      </Head>
      <article className={styles.container}>
        <div className={styles.actions}>
          <div>
            <FiCalendar size={30} color='#fff' />
            <span>Tarefa criada:</span>
            <time>{task.createdFormated}</time>
          </div>
        </div>
        <p>{task.tarefa}</p>
      </article>
    </>
  );
}

interface Session {
  user: {
    name: string;
    email: string;
    image: string;
  };
  vip: boolean;
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params
}) => {
  const session = await getSession({ req }) as unknown as Session;

  const { id } = params as { id: string };

  if (!session.vip) {
    return {
      redirect: {
        destination: '/board',
        permanent: false,
      },
    };
  }

  const data = await getOne('tasks', id)
    .then((doc) => {
      return JSON.stringify(doc);
    })
    .catch(() => {
      return {};
    });

  if (!data) {
    return {
      redirect: {
        destination: '/board',
        permanent: false,
      },
    };
  }

  return {
    props: {
      data,
    },
  };
};
