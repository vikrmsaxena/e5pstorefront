import Pagination from '@components/product/Pagination'
import rangeMap from '@lib/range-map'
import ProductCard from '@components/product/ProductCard/SearchProductCard'
import InfiniteScroll from '@components/ui/InfiniteScroll'
import { GENERAL_LOAD_MORE, TITLE_PRODUCTS } from '@components/utils/textVariables'
import Button from '@components/ui/IndigoButton'

interface Props {
  products: any
  currentPage: number | string
  handlePageChange?: any
  handleInfiniteScroll: any
  isLastPage?: boolean
  isInfiniteScrollEnabled?: boolean
}

export default function Grid({
  products,
  currentPage,
  handlePageChange = () => { },
  handleInfiniteScroll,
  isInfiniteScrollEnabled,
  isLastPage,
}: Props) {

  // InfiniteScroll flag is now available at parent level.
  // If parent level flag is not defined, then use the global config setting.
  const IS_INFINITE_SCROLL = (isInfiniteScrollEnabled === undefined) ? process.env.NEXT_PUBLIC_ENABLE_INFINITE_SCROLL === 'true' : isInfiniteScrollEnabled

  // Load more button configuration.
  const loadMoreBtnTitle = () => {
    let loadMorebtnConfig: any = {
      title: GENERAL_LOAD_MORE,
      action: async () => {
        handlePageChange();
      },
      shortMessage: '',
    }
    return loadMorebtnConfig
  }

  const btnConfig = loadMoreBtnTitle()

  return (
    <section
      aria-labelledby="products-heading"
      className="max-w-7xl overflow-hidden mx-auto sm:pl-4"
    >
      <h2 id="products-heading" className="sr-only">
        {TITLE_PRODUCTS}
      </h2>

      {IS_INFINITE_SCROLL ? (
        <InfiniteScroll
          fetchData={handleInfiniteScroll}
          total={products.total}
          currentNumber={products.results.length}
          component={
            <div
              className={`border-gray-100 gap-x-8 gap-y-4 grid grid-cols-2 sm:mx-0 md:grid-cols-5 ${products.results.length < 6
                ? `lg:grid-cols-5`
                : 'lg:grid-cols-5'
                }`}
            >
              {!products.results.length &&
                rangeMap(12, (i) => (
                  <div
                    key={i}
                    className="shadow-md w-60 h-72 rounded-md mx-auto mt-20"
                  >
                    <div className="flex animate-pulse flex-row items-center h-full justify-center space-x-5">
                      <div className="flex flex-col space-y-3">
                        <div className="w-full bg-gray-100 h-48 rounded-md "></div>
                        <div className="w-36 bg-gray-100 h-6 mt-40 rounded-md "></div>
                      </div>
                    </div>
                  </div>
                ))}
              {products.results.map((product: any, productIdx: number) => (
                <ProductCard key={productIdx} product={product} />
              ))}
            </div>
          }
        />
      ) : (
        products && products?.results ? (
          <>
            <div
              className={`border-gray-100 gap-x-8 gap-y-4 grid grid-cols-2 sm:mx-0 md:grid-cols-5 px-4 sm:px-0 ${products.results.length < 6
                ? `lg:grid-cols-5`
                : 'lg:grid-cols-5'
                }`}
            >
              {!products.results.length &&
                rangeMap(12, (i) => (
                  <div
                    key={i}
                    className="shadow-md w-60 h-72 rounded-md mx-auto mt-20"
                  >
                    <div className="flex animate-pulse flex-row items-center h-full justify-center space-x-5">
                      <div className="flex flex-col space-y-3">
                        <div className="w-full bg-gray-100 h-48 rounded-md "></div>
                        <div className="w-36 bg-gray-100 h-6 mt-40 rounded-md "></div>
                      </div>
                    </div>
                  </div>
                ))}
              {products.results.map((product: any, productIdx: number) => (
                <ProductCard key={productIdx} product={product} />
              ))}
            </div>
            {products.pages > 1 && !isLastPage && (
              <div className="w-48 mx-auto sm:my-8 my-6 flex sm:flex-col1">
                <Button
                  title={btnConfig.title}
                  action={btnConfig.action}
                  buttonType="button"
                />
              </div>
            )}
            {/*{products.pages > 1 && (
              <Pagination
                currentPage={currentPage}
                onPageChange={handlePageChange}
                pageCount={products.pages}
              />
            )}*/}
          </>
        ) : (
          <></>
        )
      )}
    </section>
  )
}