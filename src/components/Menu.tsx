import { useState } from 'react'
import { HomeOutlined, PieChartOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import useSound from 'use-sound'
import clickSound from '../assets/sounds/pop-up.mp3'

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
    label: <Link to="/piano-example">Play Piano</Link>,
    icon: <PieChartOutlined />
  },
  {
    key: 'practice-songs',
    label: <Link to="/piano-example">Practice a Song</Link>,
    icon: <PieChartOutlined />
  }
]

const MyMenu = () => {
  const [current, setCurrent] = useState('home')
  const [play] = useSound(clickSound)

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key)
    play()
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
