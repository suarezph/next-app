import type { LayoutProps } from 'types/layout.type'
import Header from './header'

const MainLayout: LayoutProps = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}

export default MainLayout
