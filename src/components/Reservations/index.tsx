import DisplayReservations from './DisplayReservations'
import Header from './Header'

const Reservations = ({
  reservations,
  hasReservationHandler,
}: ReservationsWithHandler) => {
  return (
    <>
      <Header header='Reservations' link='/add-reservation' hasBtn />
      <DisplayReservations
        reservations={reservations}
        hasReservationHandler={hasReservationHandler}
      />
    </>
  )
}

export default Reservations
