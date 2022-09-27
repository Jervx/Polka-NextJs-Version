import { AiOutlineCopyrightCircle } from "react-icons/ai"

const Footer = () => {
  return (
    <footer className='w-full p-4 bg-base-100 outline outline-1 outline-base-200 flex items-center justify-center z-20'>
        <AiOutlineCopyrightCircle className="mr-2"/>
        <p> 2022 Jervx</p>
        </footer>
  )
}

export default Footer