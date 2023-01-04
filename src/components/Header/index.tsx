import Image from 'next/image';
import Link from 'next/link';
import style from './styles.module.scss';
import { SignInButton } from '../SignInButton';

export function Header() {
  return (
    <header className={style.headerContainer}>
      <div className={style.headerContent}>
        <Link href='/'>
          <Image src='/images/logo.svg' alt='Logo' width={72} height={76} />
        </Link>
        <nav>
          <Link href='/'>Home</Link>
          <Link href='/board'>Meu board</Link>
        </nav>
        <SignInButton />
      </div>
    </header>
  );
}
