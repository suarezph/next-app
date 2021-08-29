import Link from 'next/link'

export default function Navigation() {
  return (
    <nav>
      <Link href="/account">
        <a> Profile </a>
      </Link>
      <Link href="/logout">
        <a> Logout </a>
      </Link>
    </nav>
  )
}
