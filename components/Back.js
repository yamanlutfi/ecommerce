import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

export default function Back() {
  const router = useRouter()

  return (
    <FontAwesomeIcon icon={faArrowLeft} className="w-18 has-text-grey" onClick={() => router.back()}/>
  )
}