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
  bookedDays,
}: Input) => {
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
          modifiers={{ booked: bookedDays }}
          // modifiersStyles={{ booked: bookedStyle }}
          modifiersClassNames={{
            selected: 'my-selected',
            disabled: 'my-disabled',
            booked: 'my-booked',
          }}
          disabled={bookedDays} //  booked + disabled
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
          <span className='sm:mx-2'>-</span>
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
