import type { LayoutProps } from 'types/layout.type'
import Navigation from './navigation'

const Registered: LayoutProps = ({ children }) => {
  return (
    <div>
      <Navigation />
      registered:
      {children}
    </div>
  )
}

export default Registered
