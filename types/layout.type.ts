import { NextPage } from 'next'
import type { ReactElement } from 'react'
import MainLayout from '../components/layouts/main'
import RegisteredLayout from '../components/layouts/registered'

export type PageWithMainLayoutType = NextPage & { layout: typeof MainLayout }

export type PageWithRegisteredLayoutType = NextPage & {
  layout: typeof RegisteredLayout
}

export type PageWithLayoutType =
  | PageWithMainLayoutType
  | PageWithRegisteredLayoutType

export type LayoutProps = ({
  children,
}: {
  children: ReactElement
}) => ReactElement

export default PageWithLayoutType
