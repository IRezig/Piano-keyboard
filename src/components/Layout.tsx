import MyMenu from './Menu'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="grid content-center gap-4 bg-pink-200 p-4">
      <MyMenu />
      <main className="mx-auto my-20 max-w-4xl p-4">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
