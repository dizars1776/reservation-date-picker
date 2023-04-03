import Reservations from './components/Reservations'
import { Routes, Route, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import AddReservation from './components/Reservations/AddReservation'

const App = () => {
  const [reservations, setReservations] = useState<ReservationList>([])

  // get reservations from the local storage if they exist
  useEffect(() => {
    const reservationsFromLocalStorage =
      localStorage.getItem('reservations') ?? null
    const parsedReservations =
      reservationsFromLocalStorage && JSON.parse(reservationsFromLocalStorage)
    if (parsedReservations) {
      setReservations(parsedReservations)
    }
  }, [])

  // update reservations
  useEffect(() => {
    localStorage.setItem('reservations', JSON.stringify(reservations))
  }, [reservations])

  return (
    <div>
      <Routes>
        <Route
          path='/'
          element={
            <Reservations
              reservations={reservations}
              hasReservationHandler={setReservations}
            />
          }
        />
        <Route
          path='/add-reservation'
          element={
            <AddReservation
              reservations={reservations}
              hasReservationHandler={setReservations}
            />
          }
        />
        <Route
          path='*'
          element={
            <div>
              <p>Not found!</p>
              <Link to='/'>Reservations</Link>
            </div>
          }
        />
      </Routes>
    </div>
  )
}

export default App
