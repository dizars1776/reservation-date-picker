import { Link } from 'react-router-dom'

const Header = ({ header, link, hasBtn }: HeaderProps) => {
  return (
    <div className='container mx-auto px-4 flex flex-col items-center'>
      <div className='flex flex-row justify-center items-center gap-4 lg:gap-8 pt-8'>
        <h1 className='text-3xl sm:text-5xl lg:text-6xl'>{header}</h1>
        {hasBtn && (
          <div>
            <Link to={link}>
              <button
                type='button'
                className='bg-gray-300 rounded-full w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 flex justify-center items-center border-2 lg:border-4 border-black transition-opacity hover:opacity-60'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 448 512'
                  className='w-5 h-5 sm:w-7 sm:h-7 lg:w-10 lg:h-10 fill-black'
                >
                  <path d='M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z' />
                </svg>
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Header
