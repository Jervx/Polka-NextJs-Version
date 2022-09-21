import { AiOutlineLoading } from "react-icons/ai"
const loading = ({loading}) => {
  return (
    <>
    {loading && <AiOutlineLoading />}
    </>
  )
}

export default loading