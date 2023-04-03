import { useEffect } from 'react'
import useRandomUser from '../../../hooks/useRandomUser'
import Header from '../Header'
import ReservationForm from './ReservationForm'

const AddReservation = ({
  reservations,
  hasReservationHandler,
}: ReservationsWithHandler) => {
  // fetch a randmom email
  const { mail, error, loading, onFetchUserMail } = useRandomUser()
  useEffect(() => {
    onFetchUserMail()
  }, [])
  return (
    <>
      <Header header='Add Reservation' link='/' />
      {mail && (
        <ReservationForm
          reservations={reservations}
          hasReservationHandler={hasReservationHandler}
          email={mail}
        />
      )}
    </>
  )
}

export default AddReservation
