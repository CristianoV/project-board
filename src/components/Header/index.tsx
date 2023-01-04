import Image from 'next/image';
import Link from 'next/link';
import style from './styles.module.scss';

export function Header() {
  return (
    <header className={style.headerContainer}>
      <div className={style.headerContent}>
        <Link href='/'>
          <Image src='/images/logo.svg' alt='Logo' width={100} height={60} />
        </Link>
        <nav>
          <Link href='/'>
            Home
          </Link>
          <Link href='/board'>
            Meu board
          </Link>
        </nav>
        <button>Entrar com github</button>
      </div>
    </header>
  );
}
