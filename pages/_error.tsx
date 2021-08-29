import type { ReactNode } from 'react'
import type { NextPageContext } from 'next'
interface ErrorComponentProps {
  statusCode?: number
}

function ErrorComponent({ statusCode }: ErrorComponentProps): ReactNode {
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : 'An error occurred on client'}
    </p>
  )
}

ErrorComponent.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default ErrorComponent
