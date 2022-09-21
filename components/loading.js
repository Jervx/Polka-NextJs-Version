import { AiOutlineLoading } from "react-icons/ai"
const loading = ({loading}) => {
  return (
    <>
    {loading && <AiOutlineLoading className="animate-spin"/>}
    </>
  )
}

export default loading
