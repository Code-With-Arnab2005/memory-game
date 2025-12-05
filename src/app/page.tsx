import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='w-full flex justify-center items-center'>
      <Link href={"/room"} className='mt-10 border-2 border-2-white rounded-xl px-3 py-2 text-2xl hover:bg-gray-800 hover:cursor-pointer'>Start New Game</Link>
    </div>
  )
}

export default page
