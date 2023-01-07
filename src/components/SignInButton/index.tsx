import style from './styles.module.scss';
import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

interface DataSession {
  expires: string;
  id: string;
  lastDate: string | Date;
  vip: boolean;
  user: {
    email: string;
    image: string;
    name: string;
  };
}

export function SignInButton() {
  const { data } = useSession() as unknown as { data: DataSession };

  return data ? (
    <button
      type='button'
      className={style.signInButton}
      onClick={() => signOut()}
    >
      <Image src={data.user.image} alt='Avatar' width={35} height={35} />
      Olá {data.user.name}
      <FiX color='#737380' className={style.closeIcon} />
    </button>
  ) : (
    <button
      type='button'
      className={style.signInButton}
      onClick={() => signIn('github')}
    >
      <FaGithub color='#FFB800' />
      Entrar com github
    </button>
  );
}
