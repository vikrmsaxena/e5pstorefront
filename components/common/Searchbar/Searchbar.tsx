import { FC, memo, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { SearchIcon } from '@heroicons/react/outline'
import { Transition } from '@headlessui/react'
import { BTN_SEARCH } from '@components/utils/textVariables'
interface Props {
  id?: string
  onClick: any
}

const Searchbar: FC<Props> = ({ id = 'search', onClick }) => {
  return (
    <div className="flex flex-row sm:pl-8">
      <button
        onClick={onClick}
        className="p-2 text-gray-400 hover:text-gray-500 sm:border-b" aria-label="Search"
      >
        <span className="sr-only" aria-label="Search">{BTN_SEARCH}</span>       
        <span className='text-lime pr-2 font-normal text-sm sm:inline-block pr-32 hidden'>Search</span>
        <SearchIcon className="w-6 h-6 inline-block text-black" aria-hidden="true" aria-label="Search" />
      </button>
    </div>
  )
}

export default memo(Searchbar)
