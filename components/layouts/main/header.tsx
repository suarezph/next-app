import Link from 'next/link'

export default function Header() {
  return (
    <nav>
      <Link href="/">
        <a> Home </a>
      </Link>
      <Link href="/about">
        <a> About </a>
      </Link>
      <Link href="/contact">
        <a> Contact </a>
      </Link>
      <Link href="/auth/login">
        <a> Login </a>
      </Link>
      <Link href="/auth/signup">
        <a> Sign Up </a>
      </Link>
    </nav>
  )
}
