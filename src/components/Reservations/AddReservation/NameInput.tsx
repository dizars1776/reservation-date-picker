const NameInput = ({ handleInputChange, usersName }: NameInput) => {
  return (
    <div className='px-4 flex flex-row justify-around my-4 sm:text-lg lg:text-xl'>
      <label htmlFor='name'>Name: </label>
      <input
        type='text'
        name='name'
        id='name'
        value={usersName}
        onChange={handleInputChange}
        required
        maxLength={20}
        className='border-2 border-black w-full ml-4 sm:text-md lg:text-lg'
      />
    </div>
  )
}

export default NameInput
