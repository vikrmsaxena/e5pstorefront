import InfiniteScroll from 'react-infinite-scroll-component'
import { useState, useEffect } from 'react'
import LoadingDots from '@components/ui/LoadingDots'

export default function InfiniteScrollComponent({
  component,
  total,
  fetchData,
  currentNumber,
}: any) {
  const [isLoading, setIsLoading] = useState(false)
  const handleFetch = (...args: any) => {
    setIsLoading(true)
    fetchData(...args)
  }

  useEffect(() => {
    if (isLoading) setIsLoading(false)
  }, [currentNumber])

  return (
    <InfiniteScroll
      dataLength={total} //This is important field to render the next data
      next={handleFetch}
      hasMore={currentNumber < total}
      loader={null}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>You have seen it all</b>
        </p>
      }
    >
      {component}
      {isLoading && (
        <div className="justify-center items-center flex mt-4 w-full text-black">
          <LoadingDots />
        </div>
      )}
    </InfiniteScroll>
  )
}
