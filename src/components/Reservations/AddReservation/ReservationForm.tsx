import { MouseEvent, useEffect, useState } from 'react'
import RangePicker from '../../RangePicker'
import FormControlBtns from './FormControlBtns'
import NameInput from './NameInput'
import { format, parse, isAfter, isBefore, isValid } from 'date-fns'
import { DateRange } from 'react-day-picker'

const ReservationForm = ({
  reservations,
  hasReservationHandler,
  email,
}: ReservationsForm) => {
  const [selectedRange, setSelectedRange] = useState<DateRange>()
  const [formInputData, setFormInputData] = useState({
    name: '',
    email: email,
    fromDate: '',
    toDate: '',
  })
  const [emptyFormWarning, setEmptyFormWarning] = useState(false)

  // RANGE PICKER SPECIFIC
  const handleFromDateChange = (e: MouseEvent) => {
    handleInputChange(e)
    const date = parse(
      (e.target as HTMLInputElement).value,
      'd MMMM, Y',
      new Date()
    )
    if (!isValid(date)) {
      return setSelectedRange({ from: undefined, to: undefined })
    }
    if (selectedRange?.to && isAfter(date, selectedRange.to)) {
      setSelectedRange({ from: selectedRange.to, to: date })
    } else {
      setSelectedRange({ from: date, to: selectedRange?.to })
    }
  }

  const handleToDateChange = (e: MouseEvent) => {
    handleInputChange(e)
    const date = parse(
      (e.target as HTMLInputElement).value,
      'd MMMM, Y',
      new Date()
    )

    if (!isValid(date)) {
      return setSelectedRange({ from: selectedRange?.from, to: undefined })
    }
    if (selectedRange?.from && isBefore(date, selectedRange.from)) {
      setSelectedRange({ from: date, to: selectedRange.from })
    } else {
      setSelectedRange({ from: selectedRange?.from, to: date })
    }
  }

  const handleRangeSelect = (range: DateRange | undefined) => {
    setSelectedRange(range)
    if (range?.from) {
      const fromDateValue = format(range.from, 'dd-MM-y')
      const NewValue = {
        ...formInputData,
        fromDate: fromDateValue,
      }
      setFormInputData(NewValue)
    } else {
      setFormInputData({ ...formInputData, fromDate: '' })
    }

    if (range?.to) {
      const toDateValue = format(range.to, 'dd-MM-y')
      const NewValue = {
        ...formInputData,
        toDate: toDateValue,
      }
      setFormInputData(NewValue)
    } else {
      setFormInputData({ ...formInputData, toDate: '' })
    }

    if (range?.from && range?.to) {
      const fromDateValue = format(range.from, 'dd-MM-y')
      const toDateValue = format(range.to, 'dd-MM-y')
      const NewValue = {
        ...formInputData,
        fromDate: fromDateValue,
        toDate: toDateValue,
      }
      setFormInputData(NewValue)
    } else {
      setFormInputData({ ...formInputData, fromDate: '', toDate: '' })
    }
  }

  const handleInputChange = (e: MouseEvent) => {
    let inputFieldValue = (e.target as HTMLInputElement).value
    const inputFieldName = (e.target as HTMLInputElement).name

    if (inputFieldName === 'name') {
      const filteredValue = (e.target as HTMLInputElement).value.replace(
        /[^\p{Letter}\s]/gu,
        ''
      )
      inputFieldValue = filteredValue
    }
    const NewInputValue = {
      ...formInputData,
      [inputFieldName]: inputFieldValue,
    }
    setFormInputData(NewInputValue)
  }
  // remove the emptyFormWarning after 2secs if it appears!
  useEffect(() => {
    const clearWarning = setTimeout(() => {
      setEmptyFormWarning(false)
    }, 2000)
    return () => clearTimeout(clearWarning)
  }, [emptyFormWarning])

  const handleFormSubmit = (e: MouseEvent) => {
    // check if the form is empty
    const isFormEmpty = !Object.values(formInputData).every(
      (value) => value.length > 1
    )
    // submit the form if not empty
    if (!isFormEmpty) {
      const newReservationValue: ReservationList = [
        ...reservations,
        formInputData,
      ]
      hasReservationHandler(newReservationValue)
    } else {
      e.preventDefault()
      setEmptyFormWarning(true)
    }
  }

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
          fromDate={formInputData.fromDate}
          toDate={formInputData.toDate}
          selectedRange={selectedRange}
          handleFromDateChange={handleFromDateChange}
          handleToDateChange={handleToDateChange}
          handleRangeSelect={handleRangeSelect}
          reservations={reservations}
        />
        <FormControlBtns handleFormSubmit={handleFormSubmit} />
      </form>
    </div>
  )
}

export default ReservationForm
