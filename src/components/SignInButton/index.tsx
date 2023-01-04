import style from './styles.module.scss';
import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import Image from 'next/image';

export function SignInButton() {
  const isUserLoggedIn = true;

  return isUserLoggedIn ? (
    <button
      type='button'
      className={style.signInButton}
      onClick={() => console.log('Sign in')}
    >
      <img
        src='https://avatars.githubusercontent.com/u/12345678?v=4'
        alt='Avatar'
        width={32}
        height={32}
      />
      Olá, <strong>Nome do usuário</strong>
      <FiX color='#737380' className={style.closeIcon} />
    </button>
  ) : (
    <button
      type='button'
      className={style.signInButton}
      onClick={() => console.log('Sign in')}
    >
      <FaGithub color='#FFB800' />
      Entrar com github
    </button>
  );
}
