import Card from '../components/Card/Card'

const Home = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card
            title="Practice Chords"
            description="This is a description for the first card. It provides a brief summary of the content within the card."
            imageSrc="./src/assets/handsPiano.jpg"
            pageLink="/chords"
          />
          <Card
            title="Play with Piano"
            description="This is a description for the first card. It provides a brief summary of the content within the card."
            imageSrc="./src/assets/dancingSolfege.jpg"
            pageLink="/piano-example"
          />
          <Card
            title="Practice Songs"
            description="This is a description for the first card. It provides a brief summary of the content within the card."
            imageSrc="./src/assets/flowersKeyboard.jpg"
            pageLink="/songs"
          />
        </div>
      </div>
    </div>
  )
}
export default Home
