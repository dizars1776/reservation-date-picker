type Reservation = {
  name: string
  email: string
  fromDate: string
  toDate: string
}

type ReservationList = ReservationObj[]

// Range Picker Component Definitions
interface Input {
  handleFromDateChange: ChangeEventHandler<HTMLInputElement>
  handleToDateChange: ChangeEventHandler<HTMLInputElement>
  handleRangeSelect: SelectRangeEventHandler
  fromDate: string
  toDate: string
  selectedRange: DateRange | undefined
  reservations: ReservetionsArray
}

type DisabledDay = {
  from: Date
  to: Date
}

type DisabledDaysList = DisabledDay[]

//Reservetions Component Definitions
type NameInput = {
  handleInputChange: ChangeEventHandler<HTMLInputElement>
  usersName: string
}

interface ReservationsWithHandler {
  reservations: ReservationList
  hasReservationHandler: any
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
