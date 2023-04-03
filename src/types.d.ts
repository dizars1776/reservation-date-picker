type Reservation = {
  name: string
  email: string
  fromDate: string
  toDate: string
}

type ReservationList = Reservation[]

// Range Picker Component Definitions
interface Input {
  handleFromDateChange: ChangeEventHandler<HTMLInputElement>
  handleToDateChange: ChangeEventHandler<HTMLInputElement>
  handleRangeSelect: SelectRangeEventHandler
  fromDate: string
  toDate: string
  selectedRange: DateRange | undefined
  bookedDays: BookedDayList
}

type BookedDay = {
  from: Date
  to: Date
}

type BookedDayList = BookedDay[]

//Reservetions Component Definitions
type NameInput = {
  handleInputChange: ChangeEventHandler<HTMLInputElement>
  usersName: string
}

interface ReservationsWithHandler {
  reservations: ReservationList
  hasReservationHandler: (arg0: ReservationList) => void
}

interface ReservationWithIndex extends ReservationsWithHandler {
  reservation: Reservation
  reservationIndex: number
}

type HeaderProps = {
  header: string
  link: string
  hasBtn?: boolean
}

interface ReservationsForm extends ReservationsWithHandler {
  email: string
}
