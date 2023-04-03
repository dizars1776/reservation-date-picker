import { useEffect, useState } from 'react'
import { DayPicker } from 'react-day-picker'
import {
  CustomCaption,
  OnlyFutureRow,
  isPastDate,
  css,
} from './RangePickerCustomize'
import 'react-day-picker/dist/style.css'

const RangePicker = ({
  fromDate,
  toDate,
  selectedRange,
  handleFromDateChange,
  handleToDateChange,
  handleRangeSelect,
  reservations,
}: Input) => {
  const [disabledDays, setDisabledDays] = useState<DisabledDaysList>([])

  // disable the already reserved days
  useEffect(() => {
    const disabledDays: DisabledDaysList = []
    reservations.forEach((reservation: Reservation) => {
      const [fromDay, fromMonth, fromYear] = reservation.fromDate.split('-')
      const [toDay, toMonth, toYear] = reservation.toDate.split('-')
      const newDisabledRange = {
        from: new Date(+fromYear, +fromMonth - 1, +fromDay),
        to: new Date(+toYear, +toMonth - 1, +toDay),
      }
      disabledDays.push(newDisabledRange)
    })
    setDisabledDays(disabledDays)
  }, [])

  return (
    <>
      <style>{css}</style>
      <div className='flex flex-col justify-center items-center border-2 border-black mx-1'>
        <DayPicker
          fromDate={new Date()}
          components={{ Row: OnlyFutureRow, Caption: CustomCaption }}
          hidden={isPastDate}
          showOutsideDays
          mode='range'
          selected={selectedRange}
          onSelect={handleRangeSelect}
          modifiersClassNames={{
            selected: 'my-selected',
            disabled: 'my-disabled',
          }}
          disabled={disabledDays}
        />
      </div>
      <div className='flex flex-row justify-start items-center my-1 sm:text-lg lg:text-xl'>
        <span className='mr-2'>Nights: </span>
        <div className='flex flex-row justify-center items-center border-2 border-black sm:text-md lg:text-lg'>
          <label id='fromDate' htmlFor='fromDate' hidden>
            From Date
          </label>
          <input
            id='fromDate'
            name='fromDate'
            size={10}
            placeholder='From..'
            value={fromDate}
            onChange={handleFromDateChange}
            className='text-center sm:w-40'
            disabled
          />
          <span className='px-2'>-</span>
          <label id='toDate' htmlFor='toDate' hidden>
            To Date
          </label>
          <input
            id='toDate'
            name='toDate'
            size={10}
            placeholder='To..'
            value={toDate}
            onChange={handleToDateChange}
            className='text-center sm:w-40'
            disabled
          />
        </div>
      </div>
    </>
  )
}

export default RangePicker
