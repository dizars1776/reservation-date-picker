import React from 'react'
import formatDate from '../../../helper/formatDate'

const Reservation = ({
  reservation,
  reservationIndex,
  reservations,
  hasReservationHandler,
}: ReservationWithIndex) => {
  const { checkIn, checkOut } = formatDate(
    reservation.fromDate,
    reservation.toDate
  )

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    //get the reservation's id
    const reservationId = Number(
      (
        e.currentTarget as HTMLButtonElement
      ).parentElement?.parentElement?.getAttribute('id')
    )
    // delete the reservation
    const newReservationsValue = reservations.filter(
      (reservation, index) => index !== reservationId
    )
    hasReservationHandler(newReservationsValue)
  }

  return (
    <li
      id={reservationIndex.toString()}
      className='flex flex-row justify-between items-center border-b-2 border-black pb-1'
    >
      <div className='flex flex-col sm:text-xl lg:text-2xl'>
        <p className='font-medium'>{reservation.name}</p>
        <p>{reservation.email}</p>
        <p>
          Check In: <span className='italic'>{checkIn}</span>
        </p>
        <p>
          Check Out: <span className='italic'>{checkOut}</span>
        </p>
      </div>
      <div>
        <button
          type='button'
          className='bg-gray-300 rounded-full w-9 h-9 sm:w-11 sm:h-11 lg:w-12 lg:h-12 flex justify-center items-center border-2 border-black transition-opacity hover:opacity-60'
          onClick={handleClick}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 448 512'
            className='w-5 h-5 sm:w-7 sm:h-7 lg:w-8 lg:h-8 fill-black'
          >
            <path d='M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z' />
          </svg>
        </button>
      </div>
    </li>
  )
}

export default Reservation
