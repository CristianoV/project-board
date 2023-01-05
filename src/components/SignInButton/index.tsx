import style from './styles.module.scss';
import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

import { signIn, signOut, useSession } from 'next-auth/react';

export function SignInButton() {
  const { data, status } = useSession();

  return data ? (
    <button
      type='button'
      className={style.signInButton}
      onClick={() => signOut()}
    >
      <img
        src={data.user.image}
        alt='Avatar'
        width={32}
        height={32}
      />
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
