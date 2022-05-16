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
    <div className="flex flex-row pl-8">
      <button
        onClick={onClick}
        className="p-2 text-gray-400 hover:text-gray-500 border-b"
      >
        <span className="sr-only">{BTN_SEARCH}</span>       
        <span className='text-lime pr-2 font-normal text-sm inline-block pr-32'>Search</span>
        <SearchIcon className="w-6 h-6 inline-block" aria-hidden="true" />
      </button>
    </div>
  )
}

export default memo(Searchbar)
