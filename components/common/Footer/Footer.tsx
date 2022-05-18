import { FC } from 'react'
import Link from 'next/link'
import type { Page } from '@commerce/types/page'
import { Logo } from '@components/ui'
import config from './config'
import { useRouter } from 'next/router'
import { 
  BTN_SIGN_UP, 
  COPYRIGHT_FOOTER_INFO, 
  GENERAL_EMAIL_ADDRESS, 
  SIGN_UP_FOR_NEWSLETTER, 
  SIGN_UP_TEXT 
} from '@components/utils/textVariables'

interface Props {
  config: []
}

const Footer: FC<Props> = ({ config }) => {
  const router = useRouter()

  const handleRedirect = (path: string) => (path ? router.push(path) : {})

  return (
    <footer aria-labelledby="footer-heading" className="footer_row_light-grey">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="flex flex-col py-10">
          <div className='grid grid-cols-1 justify-center text-center'>
            {/* Newsletter section */}
            <div className="mt-12 md:mt-0">
              <h3 className="text-3xl uppercase font-semibold text-black">
                {SIGN_UP_FOR_NEWSLETTER}
              </h3>
              <p className="mt-2 text-md text-black max-w-xl mx-auto">
                {SIGN_UP_TEXT}
              </p>
              <form className="mt-8 flex sm:max-w-3xl mx-auto">
                <label htmlFor="email-address" className="sr-only">
                  {GENERAL_EMAIL_ADDRESS}
                </label>
                <input
                  id="email-address"
                  type="text"
                  autoComplete="email"
                  required
                  placeholder='Your e-mail'
                  className="appearance-none min-w-0 w-full bg-white rounded-sm shadow-sm py-4 px-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black hover:border-black border border-white"
                />
                <div className="ml-4 flex-shrink-0">
                  <button
                    type="submit"
                    className="w-full bg-black border border-transparent uppercase rounded-sm shadow-sm py-4 px-10 flex items-center justify-center text-whitw font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                  >
                    {BTN_SIGN_UP}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-black">        
        <div className="py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 md:grid-flow-col md:gap-x-8 md:gap-y-16 md:auto-rows-min">
            {/* Image section */}
            <div className="col-span-1 md:col-span-2 lg:row-start-1 lg:col-start-1">
              <Logo />
            </div>

            {/* Sitemap sections */}
            <div className="mt-10 col-span-6 grid grid-cols-2 gap-8 sm:grid-cols-3 md:mt-0 md:row-start-1 md:col-start-3 md:col-span-8 lg:col-start-2 lg:col-span-6">
              <div className="grid grid-cols-1 gap-y-12 sm:col-span-2 sm:grid-cols-2 sm:gap-x-8">
                {config.map((item: any, idx: number) => {
                  return (
                    <div key={`${idx}-footer-item`}>
                      <h3 className="text-md font-medium text-gray-900">
                        {item.caption}
                      </h3>
                      <ul role="list" className="mt-6 space-y-6">
                        {item.navBlocks.map((navBlock: any) => (
                          <li key={navBlock.boxTitle} className="text-sm">
                            <h3 className="text-sm font-medium text-gray-900">
                              {navBlock.boxTitle}
                            </h3>
                            <ul>
                              {navBlock.navItems.map(
                                (navItem: any, navItemIdx: number) => {
                                  return (
                                    <li
                                      key={navItemIdx + 'navItem'}
                                      className="text-sm"
                                    >
                                      <span className="text-gray-500 hover:text-gray-600 cursor-hand">
                                        {navItem.caption}
                                      </span>
                                    </li>
                                  )
                                }
                              )}
                            </ul>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                })}
              </div>
            </div>            
          </div>
        </div>        
      </div>
      <div className="py-10 text-center footer_row_dark-grey">
          <p className="text-md text-gray-600">
            &copy; {COPYRIGHT_FOOTER_INFO}
          </p>
        </div>
    </footer>
  )
}

export default Footer
