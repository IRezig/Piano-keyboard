import { useState } from 'react'
import { HomeOutlined, PieChartOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'

type MenuItem = Required<MenuProps>['items'][number]

const items: MenuItem[] = [
  {
    key: 'home',
    label: <Link to="/">Home</Link>,
    icon: <HomeOutlined />
  },
  {
    key: 'chords',
    label: <Link to="/chords">Chords</Link>,
    icon: <PieChartOutlined />
  },
  {
    key: 'piano-example',
    label: <Link to="/piano-example">Piano Example</Link>,
    icon: <PieChartOutlined />
  }
]

const MyMenu = () => {
  const [current, setCurrent] = useState('home')

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key)
  }

  return (
    <Menu
      style={{
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem'
      }}
      theme="light"
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  )
}

export default MyMenu
