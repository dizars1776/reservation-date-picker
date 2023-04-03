import RangePicker from '../../RangePicker'
import FormControlBtns from './FormControlBtns'
import NameInput from './NameInput'
import useReservationForm from './useReservationForm'

const ReservationForm = ({
  reservations,
  hasReservationHandler,
  email,
}: ReservationsForm) => {
  const {
    handleFromDateChange,
    handleToDateChange,
    handleRangeSelect,
    handleInputChange,
    handleFormSubmit,
    emptyFormWarning,
    formInputData,
    selectedRange,
    bookedDays,
  } = useReservationForm(reservations, hasReservationHandler, email)

  return (
    <div className='container mx-auto flex flex-col px-4 my-6'>
      <form className='flex flex-col gap-4'>
        {emptyFormWarning && (
          <div className='fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-3/4 sm:w-3/5 lg:w-3/6 bg-gray-400 z-50 rounded-2xl'>
            <p className='text-red-700 p-12 font-bold text-2xl text-center lg:text-3xl'>
              Fill all the inputs, please!
            </p>
          </div>
        )}
        <NameInput
          usersName={formInputData.name}
          handleInputChange={handleInputChange}
        />
        <p className='sm:text-lg lg:text-xl'>Check In:</p>
        <RangePicker
          bookedDays={bookedDays}
          fromDate={formInputData.fromDate}
          toDate={formInputData.toDate}
          selectedRange={selectedRange}
          handleFromDateChange={handleFromDateChange}
          handleToDateChange={handleToDateChange}
          handleRangeSelect={handleRangeSelect}
        />
        <FormControlBtns handleFormSubmit={handleFormSubmit} />
      </form>
    </div>
  )
}

export default ReservationForm
