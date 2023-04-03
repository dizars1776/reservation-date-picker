// fetch random user's mail from https://randomuser.me/api/
import { useState } from 'react'

const useRandomUser = () => {
  const [mail, setMail] = useState<string | null>(null)
  const [loading, setLoading] = useState<Boolean>(false)
  const [error, setError] = useState<unknown | Error>(null)

  const fetchRandomUserMail = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('https://randomuser.me/api/')
      const json = await response.json()
      setMail(json.results[0].email)
    } catch (error) {
      setError(error)
      setMail(null)
    } finally {
      setLoading(false)
    }
  }

  return { mail, error, loading, onFetchUserMail: fetchRandomUserMail }
}

export default useRandomUser
