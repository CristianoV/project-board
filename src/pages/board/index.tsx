import Head from 'next/head';
import styles from './styles.module.scss';
import {
  FiPlus,
  FiCalendar,
  FiEdit2,
  FiTrash,
  FiClock,
  FiX,
} from 'react-icons/fi';
import { SupportButton } from '../../components/SupportButton';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useState } from 'react';

import firebase, {
  add,
  get,
  Remove,
  Edit,
} from '../../services/firebaseConnection';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Link from 'next/link';

type TaskList = {
  id: string;
  created: string | Date;
  createdFormated: string;
  tarefa: string;
  userId: string;
  nome: string;
};

interface BoardProps {
  user: {
    nome: string;
    id: string;
  };
  data: string;
}

export default function Board({ user, data }: BoardProps) {
  const [input, setInput] = useState('');
  const [taskList, setTaskList] = useState<TaskList[]>(JSON.parse(data));
  const [taskEdit, setTaskEdit] = useState<TaskList | null>(null);

  async function handleAddTask(e: React.FormEvent) {
    e.preventDefault();

    if (input === '') return alert('Digite uma tarefa!');

    if (taskEdit) {
      const path = 'tasks';

      await Edit(path, taskEdit.id, { tarefa: input })
        .then(() => {
          const taskIndex = taskList.findIndex(
            (item) => item.id === taskEdit.id
          );
          const data = [...taskList];
          data[taskIndex].tarefa = input;

          setTaskList(data);
        })
        .catch((error) => {
          console.error('Error updating document: ', error);
        });

      setTaskEdit(null);
      setInput('');
      return;
    }

    const data = {
      created: new Date(),
      tarefa: input,
      userId: user.id,
      nome: user.nome,
    };

    const path = 'tasks';

    await add(path, data)
      .then((doc) => {
        console.log('Tarefa adicionada com sucesso!');
        const data = {
          id: doc.id,
          created: new Date(),
          createdFormated: format(new Date(), 'dd MMMM yyyy', { locale: ptBR }),
          tarefa: input,
          userId: user.id,
          nome: user.nome,
        };

        setTaskList([data, ...taskList]);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });

    setInput('');
  }

  async function handleDelete(id: string) {
    const path = 'tasks';

    await Remove(path, id)
      .then(() => {
        console.log('Tarefa removida com sucesso!');
        setTaskList(taskList.filter((item) => item.id !== id));
      })
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
  }

  async function handleUpdate(item: TaskList) {
    setTaskEdit(item);
    setInput(item.tarefa);
  }

  async function handleCancelEdit() {
    setTaskEdit(null);
    setInput('');
  }

  return (
    <>
      <Head>
        <title>Minhas tarefas - Board</title>
      </Head>
      <main className={styles.container}>
        {taskEdit && (
          <span className={styles.warnText}>
            <button onClick={handleCancelEdit}>
              <FiX size={30} color='#ff3636' />
            </button>
            Você está editando uma tarefa!
          </span>
        )}
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

        <h1>
          {`Você tem ${taskList.length} ${
            taskList.length === 1 ? 'tarefa' : 'tarefas'
          }!`}
        </h1>

        <section>
          {taskList.map((item, index) => (
            <article className={styles.taskList} key={index}>
              <Link href={`/board/${item.id}`}>
                <p>{item.tarefa}</p>
              </Link>
              <div className={styles.actions}>
                <div>
                  <div>
                    <FiCalendar size={20} color='#ffb800' />
                    <time>{item.createdFormated}</time>
                  </div>
                  <button onClick={() => handleUpdate(item)}>
                    <FiEdit2 size={20} color='#fff' />
                    <span>Editar</span>
                  </button>
                </div>
                <button onClick={() => handleDelete(item.id)}>
                  <FiTrash size={20} color='#ff3636' />
                </button>
              </div>
            </article>
          ))}
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

  const tasks = await get('tasks', session?.id);

  const data = JSON.stringify(
    tasks.map((doc) => {
      return {
        id: doc.id,
        createdFormated: format(doc.created.toDate(), 'dd MMMM yyyy', {
          locale: ptBR,
        }),
        created: doc.created,
        ...doc,
      };
    })
  );

  const user = {
    nome: session?.user?.name,
    id: session?.id,
  };

  return {
    props: { user, data },
  };
};
