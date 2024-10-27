import { Image } from 'antd'

interface CardProps {
  title: string
  description: string
  imageSrc: string
}

const Card = (props: CardProps) => {
  const { title, description, imageSrc } = props
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-lg">
      <Image
        src={imageSrc}
        preview={false}
        className="h-48 w-full object-cover"
      />
      <div className="p-6">
        <h2 className="mb-2 text-2xl font-semibold">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  )
}

export default Card
