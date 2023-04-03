import { format, isAfter, isBefore, isValid, parse } from 'date-fns'
import { MouseEvent, useEffect, useState } from 'react'
import { DateRange } from 'react-day-picker'

const useReservationForm = (
  reservations: ReservationList,
  hasReservationHandler: {
    (arg0: ReservationList): void
    (arg0: ReservationList): void
  },
  email: string
) => {
  const [selectedRange, setSelectedRange] = useState<DateRange>()
  const [formInputData, setFormInputData] = useState({
    name: '',
    email: email,
    fromDate: '',
    toDate: '',
  })
  const [bookedDays, setBookedDays] = useState<BookedDayList>([])
  const [emptyFormWarning, setEmptyFormWarning] = useState(false)

  // RANGE PICKER SPECIFIC

  // get the booked days
  useEffect(() => {
    const bookedDays: BookedDayList = []
    reservations.forEach((reservation: Reservation) => {
      const [fromDay, fromMonth, fromYear] = reservation.fromDate.split('-')
      const [toDay, toMonth, toYear] = reservation.toDate.split('-')
      const newBookedRange = {
        from: new Date(+fromYear, +fromMonth - 1, +fromDay),
        to: new Date(+toYear, +toMonth - 1, +toDay),
      }
      bookedDays.push(newBookedRange)
    })
    setBookedDays(bookedDays)
  }, [])

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
      const pickedDateRange = { from: range.from, to: range.to }

      // check if the range contains booked days and if so clear the selection
      const isSelectedRangeValid = Object.values(bookedDays).every(
        (bookedDateRange) =>
          (isBefore(pickedDateRange.from, bookedDateRange.from) &&
            isBefore(pickedDateRange.to, bookedDateRange.to)) ||
          (isAfter(pickedDateRange.from, bookedDateRange.from) &&
            isAfter(pickedDateRange.to, bookedDateRange.to))
      )
      if (isSelectedRangeValid) {
        const NewValue = {
          ...formInputData,
          fromDate: fromDateValue,
          toDate: toDateValue,
        }
        setFormInputData(NewValue)
      } else {
        setFormInputData({ ...formInputData, fromDate: '', toDate: '' })
      }
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

  return {
    handleFromDateChange,
    handleToDateChange,
    handleRangeSelect,
    handleInputChange,
    handleFormSubmit,
    emptyFormWarning,
    formInputData,
    selectedRange,
    bookedDays,
  }
}

export default useReservationForm
