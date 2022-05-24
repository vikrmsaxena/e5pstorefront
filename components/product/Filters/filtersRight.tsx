import FilterList from './FilterList'
import { GENERAL_FILTER_TITLE } from '@components/utils/textVariables'

interface Props {
  products: any
  handleFilters: any
  routerFilters: any
}

export default function FiltersRightOpen({
  products = { filters: [] },
  handleFilters,
  routerFilters,
}: Props) {
  return (
    <div className="bg-transparent">
      {/* Mobile filter dialog */}
      <div className="ml-auto relative w-full h-full bg-white border-r py-2 pb-2 flex flex-col overflow-y-auto">
        <div className="px-0 flex items-center justify-between">
          <h2 className="text-md font-medium text-gray-900 uppercase">
            {GENERAL_FILTER_TITLE}
          </h2>
        </div>

        {/* Filters */}
        <form className="mt-3">
          {products.filters?.map((section: any) => (
            <div
              key={section.name}
              className="border-t border-gray-200 px-0 py-4 pr-2"
            >
              <>
                <h3 className="-my-3">
                  <div className="px-0 py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400">
                    <span className="font-medium text-sm uppercase text-gray-900">
                      {section.name}
                    </span>
                  </div>
                </h3>
                <div className="pt-3">
                  <div className="space-y-3">
                    <FilterList
                      handleFilters={handleFilters}
                      sectionKey={section.key}
                      items={section.items}
                      routerFilters={routerFilters}
                    />
                  </div>
                </div>
              </>
            </div>
          ))}
        </form>
      </div>
    </div>
  )
}
