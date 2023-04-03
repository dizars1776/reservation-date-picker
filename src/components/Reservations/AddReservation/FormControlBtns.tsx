import { MouseEventHandler } from 'react'
import { Link } from 'react-router-dom'

const FormControlBtns = ({
  handleFormSubmit,
}: {
  handleFormSubmit: MouseEventHandler
}) => {
  return (
    <div className='container mx-auto px-4 flex flex-col items-center my-4'>
      <div className='shadow-md shadow-black w-fit'>
        <Link to='/'>
          <button
            name='add'
            type='button'
            className='border-2 border-black px-4 sm:px-6 lg:px-8 lg:py-1 sm:text-lg lg:text-xl transition-colors hover:bg-[deepskyblue]'
            onClick={handleFormSubmit}
          >
            Add
          </button>
        </Link>
        <Link to='/'>
          <button
            name='cancel'
            type='button'
            className='border-2 border-black px-4 sm:px-6 lg:px-8 lg:py-1 sm:text-lg lg:text-xl border-l-0 transition-colors hover:bg-[deepskyblue]'
          >
            Cancel
          </button>
        </Link>
      </div>
    </div>
  )
}

export default FormControlBtns
