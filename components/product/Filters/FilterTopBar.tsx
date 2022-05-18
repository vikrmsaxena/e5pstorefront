import ProductSort from '@components/product/ProductSort'
import { BTN_CLEAR_ALL,  GENERAL_FILTER_TITLE, PRODUCT_FILTER } from '@components/utils/textVariables'

/**
 *
 * {
 *  key: "brandNoAnlz",
 *  value: "Accessorize"
 *  "isSelected": true
 * }
 * */
interface Props {
  products: any
  handleSortBy: any
  routerFilters: any
  clearAll: any
  routerSortOption: any
}

export default function FiltersRightOpen({
  products = { filters: [] },
  handleSortBy,
  routerFilters,
  clearAll,
  routerSortOption,
}: Props) {
  const appliedFilters = products.filters.reduce(
    (acc: any, obj: any) => {
      acc.forEach((item: any) => {
        if (item.Key === obj.key) {
          item['name'] = obj.name
          return item
        }
        return acc
      })
      return acc
    },
    [...routerFilters]
  )

  return (
    <div className="bg-transparent">
      {/* Mobile filter dialog */}
      <div className="max-w-3xl px-4 text-center sm:px-6 lg:max-w-7xl lg:px-8">
        <section
          aria-labelledby="filter-heading"
          className="border-b border-gray-200 py-1"
        >
          <h2 id="filter-heading" className="sr-only">
            {PRODUCT_FILTER}
          </h2>

          <div className="flex items-center justify-between">
            <h2 id="filter-heading" className="sr-only">
              {GENERAL_FILTER_TITLE}
            </h2>
            <div className="relative col-start-1 row-start-1 py-4">
              <div className="max-w-7xl mx-auto flex space-x-6 divide-x divide-gray-200 text-sm px-0 sm:px-0 lg:px-0">
                
                <div className="pl-0">
                  <button
                    onClick={clearAll}
                    type="button"
                    className="text-gray-500"
                  >
                    {BTN_CLEAR_ALL}
                  </button>
                </div>
                <div className="pl-6 flex justify-center flex-col items-baseline">
                  {appliedFilters.map((appliedFilter: any, idx: number) => {
                    return (
                      <div
                        key={`applied-filter-${idx}`}
                        className="flex justify-center items-center text-gray-600"
                      >
                        {appliedFilter.name ? (
                          <>
                            <span>{appliedFilter.name}: </span>
                            <span className="ml-1">{appliedFilter.Value}</span>
                          </>
                        ) : null}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
            <ProductSort
              routerSortOption={routerSortOption}
              products={products}
              action={handleSortBy}
            />
          </div>
        </section>
      </div>   
    </div>
  )
}
