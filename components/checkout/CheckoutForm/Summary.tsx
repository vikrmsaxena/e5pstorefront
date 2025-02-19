import Link from 'next/link'
import Image from 'next/image'
import { TrashIcon } from '@heroicons/react/solid'
import { PlusSmIcon, MinusSmIcon } from '@heroicons/react/outline'
import PromotionInput from '@components/cart/PromotionInput'
import {
  GENERAL_CONFIRM_ORDER,
  GENERAL_DISCOUNT,
  GENERAL_ORDER_SUMMARY,
  GENERAL_SHIPPING,
  GENERAL_TOTAL,
  ITEMS_IN_YOUR_CART,
  SUBTOTAL_INCLUDING_TAX
} from '@components/utils/textVariables'

export default function Summary({
  cart,
  handleItem,
  confirmOrder,
  isShippingDisabled,
}: any) {
  return (
    <div className="mt-10 lg:mt-0 md:sticky top-0">
      <h2 className="text-lg font-bold text-black uppercase">{GENERAL_ORDER_SUMMARY}</h2>

      <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h3 className="sr-only">{ITEMS_IN_YOUR_CART}</h3>
        <ul role="list" className="divide-y divide-gray-200">
          {cart.lineItems?.map((product: any) => (
            <li key={product.id} className="flex py-6 px-4 sm:px-6">
              <div className="flex-shrink-0">
                <Image
                  layout='fixed'
                  width={80}
                  height={80}
                  src={`${product.image}?w=100&h=100&fm=webp`}
                  alt={product.name}
                  className="w-20 rounded-md"
                ></Image>
              </div>

              <div className="ml-6 flex-1 flex flex-col">
                <div className="flex">
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm">
                      <Link href={`/${product.slug}`}>
                        <a className="font-medium text-gray-700 hover:text-gray-800 block">
                          {product.name}
                        </a>
                      </Link>
                    </h4>
                  </div>
                </div>

                <div className="flex-1 pt-2 flex items-end justify-between">
                  <p className="mt-1 text-sm font-bold text-black">
                    {product.price?.formatted?.withTax}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <dl className="border-t border-gray-200 py-6 px-4 space-y-6 sm:px-6">
          <div className="flex items-center justify-between">
            <dt className="text-sm text-gray-900">
              {' '}
              {SUBTOTAL_INCLUDING_TAX}
            </dt>
            <dd className="text-sm font-medium text-gray-900">
              {cart.subTotal?.formatted?.withTax}
            </dd>
          </div>
          {isShippingDisabled ? null : (
            <div className="flex items-center justify-between">
              <dt className="text-sm text-gray-900">{GENERAL_SHIPPING}</dt>
              <dd className="text-sm font-medium text-gray-900">
                {cart.shippingCharge?.formatted?.withTax}
              </dd>
            </div>
          )}
          <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
            {cart.promotionsApplied?.length > 0 && (
              <>
                <dt className="flex items-center text-sm text-indigo-600">
                  <span>{GENERAL_DISCOUNT}</span>
                </dt>
                <dd className="text-indigo-600 text-sm font-medium">
                  <p>{cart.discount?.formatted?.withTax}</p>
                </dd>
              </>
            )}
          </div>
          <PromotionInput />

          <div className="flex items-center justify-between border-t border-gray-200 pt-6">
            <dt className="font-medium text-gray-900">{GENERAL_TOTAL}</dt>
            <dd className="font-medium text-gray-900">
              {cart.grandTotal?.formatted?.withTax}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
