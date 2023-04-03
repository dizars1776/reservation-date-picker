// Converts the From date to check in date and the To date to check out date
import { format } from 'date-fns'

const useDateFormat = (fromDate: string, toDate: string) => {
  const [fromDay, fromMonth, fromYear] = fromDate.split('-')
  const [toDay, toMonth, toYear] = toDate.split('-')
  let checkInDate: Date | string = new Date(+fromYear, +fromMonth - 1, +fromDay)
  let checkOutDate: Date | string = new Date(+toYear, +toMonth - 1, +toDay + 1)
  // format the date
  checkInDate = format(checkInDate, 'dd MMM, yyy')
  checkOutDate = format(checkOutDate, 'dd MMM, yyy')

  return {
    checkIn: checkInDate,
    checkOut: checkOutDate,
  }
}

export default useDateFormat
