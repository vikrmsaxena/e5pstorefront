import withDataLayer, { PAGE_TYPES } from '@components/withDataLayer'
import { Layout } from '@components/common'
import Link from 'next/link'
import Image from 'next/image'
import type { GetStaticPropsContext } from 'next'
import getLookbooks from '@framework/api/content/lookbook'
import { Swiper, SwiperSlide } from 'swiper/react'
import useAnalytics from '@components/services/analytics/useAnalytics'
import { EVENTS_MAP } from '@components/services/analytics/constants'
import 'swiper/css'
import 'swiper/css/navigation'
import { IMG_PLACEHOLDER, RESULTS, SHOP_BY_LIFESTYLRE, SHOP_THE_LOOK } from '@components/utils/textVariables'
import SwiperCore, { Navigation } from 'swiper'
import commerce from '@lib/api/commerce'

SwiperCore.use([Navigation])


function LookbookPage({ data }: any) {
  const { PageViewed } = EVENTS_MAP.EVENT_TYPES
  const {} = EVENTS_MAP.ENTITY_TYPES

  useAnalytics(PageViewed, {
    eventType: PageViewed,
    pageCategory: 'Lookbook',
    omniImg: data[0].image,
  })

  return (
    <div className="mt-0 relative mb-5">
      <div className="text-center pt-8 pb-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
          {SHOP_BY_LIFESTYLRE}
        </h1>
        <h1 className="text-xl mt-2 font-medium tracking-tight text-gray-500">
          {data.length}{' '}{RESULTS}
        </h1>
      </div>
      <div className="relative w-full overflow-x-auto">
        <Swiper
          slidesPerView={1.5}
          loopFillGroupWithBlank={true}
          loop={true}
          navigation={true}
        >
          <ul
            role="list"
            className="mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:space-x-0 lg:grid lg:grid-cols-4 lg:gap-x-8"
          >
            {data?.map((lookbook: any) => (
              <SwiperSlide className="pr-5" key={lookbook.slug}>
                <li
                  key={lookbook.id}
                  className="w-64 inline-flex flex-col text-center lg:w-auto"
                >
                  <div className="group relative flex flex-col sm:flex-row justify-between items-center">
                    <div className="w-full bg-gray-200 rounded-md overflow-hidden aspect-w-1 aspect-h-1">
                      <div className='image-container'>
                        <Image
                          layout='fill'
                          src={lookbook.mainImage || IMG_PLACEHOLDER}
                          alt={lookbook.name}
                          className="w-auto h-96 object-center object-cover hover:opacity-75 sm:min-h-screen sm:max-h-screen image"
                        ></Image>  
                      </div>
                    </div>
                    <div className="w-full sm:w-1/2 p-5 flex justify-center flex-col items-center">
                      <h3 className="font-extrabold w-full text-left text-2xl sm:text-4xl text-gray-900">
                        {lookbook.name}
                      </h3>
                      <p className="text-md sm:text-lg py-5 text-gray-900 text-left line-clip-7">
                        {lookbook.description}
                      </p>
                      <Link href={`/${lookbook.slug}`}>
                        <button
                          type="button"
                          className="mt-6 cursor-pointer align-left justify-start flex-col font-extrabold border border-gray-900 text-gray-900 py-3 px-3 hover:bg-gray-100"
                        >
                          {SHOP_THE_LOOK}
                        </button>
                      </Link>
                    </div>
                  </div>
                </li>
              </SwiperSlide>
            ))}
          </ul>
        </Swiper>
      </div>
    </div>
  )
}

LookbookPage.Layout = Layout

const PAGE_TYPE = PAGE_TYPES['Page']

export async function getStaticProps({
  params,
  locale,
  locales,
  preview,
}: GetStaticPropsContext) {
  const lookbookData = await getLookbooks();

  const infraPromise = commerce.getInfra();
  const infra = await infraPromise;

  return {
    props: {
      data: lookbookData,
      globalSnippets: infra?.snippets,
      snippets: []
    },
    revalidate: 200,
  };
}

export default withDataLayer(LookbookPage, PAGE_TYPE)
