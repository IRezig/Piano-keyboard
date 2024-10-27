import { Image } from 'antd'
import { Link } from 'react-router-dom'

interface CardProps {
  title: string
  description: string
  imageSrc: string
  pageLink: string
}

const Card = (props: CardProps) => {
  const { title, description, imageSrc, pageLink } = props
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-lg">
      <Link to={pageLink}>
        <Image
          src={imageSrc}
          preview={false}
          className="h-48 w-full object-cover"
        />
        <div className="p-6">
          <h2 className="mb-2 text-2xl font-semibold">{title}</h2>
          <p className="text-gray-600">{description}</p>
        </div>
      </Link>
    </div>
  )
}

export default Card
