import type { NextPage } from 'next'
import Button from "../components/Button/Button"
const Home: NextPage = () => {
  return (
    <div>
      <Button 
      text="prueba"
      handleClick={()=>{console.log("Click")}}></Button>
    </div>
  )
}

export default Home
