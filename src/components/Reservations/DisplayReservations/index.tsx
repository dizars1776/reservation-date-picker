import Reservation from './Reservation'

const DisplayReservations = ({
  reservations,
  hasReservationHandler,
}: ReservationsWithHandler) => {
  return (
    <ul className='container mx-auto px-4 flex flex-col my-8 gap-y-6'>
      {reservations ? (
        reservations.map((reservation, index) => {
          return (
            <Reservation
              key={index + reservation.fromDate}
              reservation={reservation}
              reservationIndex={index}
              reservations={reservations}
              hasReservationHandler={hasReservationHandler}
            />
          )
        })
      ) : (
        <li className='sm:text-lg lg:text-xl'>No reservations currently..</li>
      )}
    </ul>
  )
}

export default DisplayReservations
