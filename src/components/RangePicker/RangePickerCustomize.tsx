import { format } from 'date-fns'
import { CaptionProps, useNavigation, Row, RowProps } from 'react-day-picker'
import { differenceInCalendarDays } from 'date-fns'

// custom css for the selected date range
const css = `
  @media only screen and (min-width: 640px) {
    .rdp {
      --rdp-cell-size: 55px;
    }
  }
  @media only screen and (min-width: 1024px) {
    .rdp {
      --rdp-cell-size: 70px;
    }
  }
  .my-selected {
    transition-property: background-color, color;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }
  .my-disabled {
    background-color: #ff6b6b;
    opacity: 1 !important;
    border-radius: 0% !important;
  }
  .my-selected:not([disabled]) { 
    font-weight: bold; 
    color: white;
    border: 2px solid deepskyblue;
    background-color: deepskyblue;
  }
  .my-selected:hover:not([disabled]) { 
    border-color: deepskyblue;
    color: deepskyblue;
  }
`
// custom buttons for changing month
const CustomCaption = (props: CaptionProps) => {
  const { goToMonth, nextMonth, previousMonth } = useNavigation()

  return (
    <h2 className='flex flex-row justify-between items-center text-xl sm:text-2xl lg:text-3xl'>
      <button
        type='button'
        disabled={!previousMonth}
        onClick={() => previousMonth && goToMonth(previousMonth)}
        className='bg-gray-300 rounded-full w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 flex justify-center items-center border-2 border-black transition-opacity hover:opacity-60'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 320 512'
          className='w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 fill-black'
        >
          <path d='M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z' />
        </svg>
      </button>

      {format(props.displayMonth, 'MMM yyy')}

      <button
        type='button'
        disabled={!nextMonth}
        onClick={() => nextMonth && goToMonth(nextMonth)}
        className='bg-gray-300 rounded-full w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 flex justify-center items-center border-2 border-black transition-opacity hover:opacity-60'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 320 512'
          className='w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 fill-black'
        >
          <path d='M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z' />
        </svg>
      </button>
    </h2>
  )
}

// disable past dates
const isPastDate = (date: Date) => {
  return differenceInCalendarDays(date, new Date()) < 0
}

const OnlyFutureRow = (props: RowProps) => {
  const isPastRow = props.dates.every(isPastDate)
  if (isPastRow) return <></>
  return <Row {...props} />
}

export { CustomCaption, isPastDate, OnlyFutureRow, css }
