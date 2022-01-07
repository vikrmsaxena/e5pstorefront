import { XIcon as XIconSolid } from '@heroicons/react/solid'
import { Layout } from '@components/common'
import { GetServerSideProps } from 'next'
import withDataLayer, { PAGE_TYPES } from '@components/withDataLayer'
import { useCart as getSsrCart } from '@framework/cart'
import cookie from 'cookie'
import { basketId as basketIdGenerator } from '@components/ui/context'
import Link from 'next/link'
import { useUI } from '@components/ui/context'
import cartHandler from '@components/services/cart'
import { PlusSmIcon, MinusSmIcon } from '@heroicons/react/outline'
import PromotionInput from '../components/cart/PromotionInput'
import { useEffect, useState } from 'react'
import axios from 'axios'
import {
  NEXT_SHIPPING_PLANS,
  NEXT_UPDATE_DELIVERY_INFO,
} from '@components/utils/constants'
import { EVENTS_MAP } from '@components/services/analytics/constants'
import eventDispatcher from '@components/services/analytics/eventDispatcher'

function Cart({ cart }: any) {
  const { setCartItems, cartItems, basketId } = useUI()
  const [deliveryPlans, setDeliveryPlans] = useState([])

  const { addToCart, getCart } = cartHandler()
  const { BasketViewed } = EVENTS_MAP.EVENT_TYPES

  const mapShippingPlansToItems = (plans: any, items: any) => {
    const itemsClone = [...items]
    return plans.reduce((acc: any, obj: any) => {
      acc.forEach((cartItem: any) => {
        const foundShippingPlan = obj.items.find((item: any) => {
          return (
            item.productId.toLowerCase() === cartItem.productId.toLowerCase()
          )
        })
        if (foundShippingPlan) {
          cartItem.shippingPlan = obj
        }
      })
      return acc
    }, itemsClone)
  }

  const fetchShippingPlans = async (userCart: any) => {
    const shippingMethodItem: any = userCart.shippingMethods.find(
      (method: any) => method.id === userCart.shippingMethodId
    )

    const model = {
      BasketId: basketId,
      OrderId: '00000000-0000-0000-0000-000000000000',
      PostCode: '',
      ShippingMethodType: shippingMethodItem.type,
      ShippingMethodId: userCart.shippingMethodId,
      ShippingMethodName: shippingMethodItem.displayName,
      ShippingMethodCode: shippingMethodItem.shippingCode,
      DeliveryItems: userCart.lineItems.map((item: any) => {
        return {
          BasketLineId: Number(item.id),
          OrderLineRecordId: '00000000-0000-0000-0000-000000000000',
          ProductId: item.productId,
          ParentProductId: item.parentProductId,
          StockCode: item.stockCode,
          Qty: item.qty,
          PoolCode: item.poolCode || null,
        }
      }),
      AllowPartialOrderDelivery: true,
      AllowPartialLineDelivery: true,
      PickupStoreId: '00000000-0000-0000-0000-000000000000',
      RefStoreId: null,
      PrimaryInventoryPool: 'PrimaryInvPool',
      SecondaryInventoryPool: 'PrimaryInvPool',
      IsEditOrder: false,
      OrderNo: null,
      DeliveryCenter: null,
    }
    const response: any = await axios.post(NEXT_SHIPPING_PLANS, { model })
    setCartItems({
      ...userCart,
      lineItems: mapShippingPlansToItems(response.data, userCart.lineItems),
    })
    setDeliveryPlans(response.data)
  }

  useEffect(() => {
    eventDispatcher(BasketViewed, 'cart seen')
    if (cart.shippingMethods.length > 0) fetchShippingPlans(cart)
    else {
      setCartItems(cart)
    }
  }, [])

  const handleItem = (product: any, type = 'increase') => {
    const asyncHandleItem = async () => {
      const data: any = {
        basketId,
        productId: product.id,
        stockCode: product.stockCode,
        manualUnitPrice: product.manualUnitPrice,
        displayOrder: product.displayOrderta,
        qty: -1,
      }
      let type = 'ADD'

      if (type === 'increase') {
        data.qty = 1
      }
      if (type === 'delete') {
        type = 'REMOVE'
        data.qty = 0
      }
      try {
        await addToCart(data, type, { product })
        await axios.post(NEXT_UPDATE_DELIVERY_INFO, {
          data: deliveryPlans,
          id: basketId,
        })
        const newCart: any = await getCart({ basketId })
        if (newCart.shippingMethods.length > 0) fetchShippingPlans(newCart)
        else {
          setCartItems(newCart)
        }
      } catch (error) {
        console.log(error)
      }
    }
    asyncHandleItem()
  }

  const userCart = cartItems

  const isEmpty: boolean = userCart?.lineItems?.length === 0

  const isShippingDisabled =
    cartItems.lineItems.filter(
      (i: any) => i.itemType === 2 || i.itemType === 20
    ).length === cartItems.lineItems.length

  return (
    <div className="bg-white">
      <main className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Shopping Cart
        </h1>
        {!isEmpty && (
          <form className="relative mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
            <section aria-labelledby="cart-heading" className="lg:col-span-7">
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>

              <ul
                role="list"
                className="border-t border-b border-gray-200 divide-y divide-gray-200"
              >
                {userCart.lineItems?.map((product: any, productIdx: number) => (
                  <li key={productIdx} className="flex py-6 sm:py-10">
                    <div className="flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-24 h-24 rounded-md object-center object-cover sm:w-48 sm:h-48"
                      />
                    </div>
                    <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                      <div className="relative pr-9 flex justify-between sm:pr-0 h-full">
                        <div className="flex flex-col justify-between h-full">
                          <div>
                            <div className="flex justify-between flex-col">
                              <h3 className="py-2 text-md font-bold text-gray-900">
                                {product.brand}
                              </h3>
                              <h3 className="text-sm">
                                <Link href={`/${product.slug}`}>
                                  <a
                                    href={product.slug}
                                    className="font-medium text-gray-700 hover:text-gray-800"
                                  >
                                    {product.name}
                                  </a>
                                </Link>
                              </h3>
                            </div>

                            <p className="mt-1 text-sm font-medium text-gray-900">
                              {product.price?.formatted?.withTax}
                            </p>
                            {product.children?.map(
                              (child: any, idx: number) => {
                                return (
                                  <div
                                    className="flex mt-10"
                                    key={'child' + idx}
                                  >
                                    <div className="flex-shrink-0 w-12 h-12 border border-gray-200 rounded-md overflow-hidden">
                                      <img
                                        src={child.image}
                                        alt={child.name}
                                        className="w-full h-full object-center object-cover"
                                      />
                                    </div>
                                    <div className="flex ml-5 justify-between font-medium text-gray-900">
                                      <Link href={`/${child.slug}`}>
                                        {child.name}
                                      </Link>
                                      <p className="ml-4">
                                        {child.price?.formatted?.withTax}
                                      </p>
                                      {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
                                    </div>
                                    <div className="flex-1 flex items-center justify-end text-sm">
                                      {/* <p className="text-gray-500">Qty {product.quantity}</p> */}

                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleItem(child, 'delete')
                                        }
                                        className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500"
                                      >
                                        <span className="sr-only">Remove</span>
                                        <XIconSolid
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      </button>
                                    </div>
                                  </div>
                                )
                              }
                            )}
                          </div>
                          <p className="py-5 text-sm font-medium text-gray-900">
                            {product.shippingPlan?.shippingSpeed}
                          </p>
                        </div>

                        <div className="mt-4 sm:mt-0 sm:pr-9">
                          <div className="border px-4 text-gray-900 flex flex-row">
                            <MinusSmIcon
                              onClick={() => handleItem(product, 'decrease')}
                              className="w-4 cursor-pointer"
                            />
                            <span className="text-md px-2 py-2">
                              {product.qty}
                            </span>
                            <PlusSmIcon
                              className="w-4 cursor-pointer"
                              onClick={() => handleItem(product, 'increase')}
                            />
                          </div>
                        </div>
                        <div className="absolute top-0 right-0">
                          <button
                            type="button"
                            onClick={() => handleItem(product, 'delete')}
                            className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500"
                          >
                            <span className="sr-only">Remove</span>
                            <XIconSolid
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
            {/* Order summary */}
            <section
              aria-labelledby="summary-heading"
              className="md:sticky top-0 mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
            >
              <h2
                id="summary-heading"
                className="text-lg font-medium text-gray-900"
              >
                Order summary
              </h2>

              <dl className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">
                    Subtotal (taxes included)
                  </dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {cartItems.subTotal?.formatted?.withTax}
                  </dd>
                </div>
                {isShippingDisabled ? null : (
                  <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                    <dt className="flex items-center text-sm text-gray-600">
                      <span>Shipping</span>
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {cartItems.shippingCharge?.formatted?.withTax}
                    </dd>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                  {userCart.promotionsApplied?.length > 0 && (
                    <>
                      <dt className="flex items-center text-sm text-indigo-600">
                        <span>Discount</span>
                      </dt>
                      <dd className="text-indigo-600 text-sm font-medium">
                        <p>{cartItems.discount?.formatted?.withTax}</p>
                      </dd>
                    </>
                  )}
                </div>
                <PromotionInput />

                <div className="text-gray-900 border-t border-gray-200 pt-4 flex items-center justify-between">
                  <dt className="font-medium text-gray-900">Order total</dt>
                  <dd className="font-medium text-gray-900">
                    {cartItems.grandTotal?.formatted?.withTax}
                  </dd>
                </div>
              </dl>

              <div className="mt-6">
                <Link href="/checkout">
                  <a
                    type="submit"
                    className="text-center w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                  >
                    Checkout now
                  </a>
                </Link>
              </div>
            </section>
          </form>
        )}
        {isEmpty && (
          <div className="py-10 text-gray-900 h-full w-full flex flex-col justify-center items-center">
            Uh-oh, you don't have any items in here
            <Link href="/search">
              <button
                type="button"
                className="text-indigo-600 font-medium hover:text-indigo-500"
              >
                Catalog
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
Cart.Layout = Layout

const PAGE_TYPE = PAGE_TYPES['Checkout']

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = cookie.parse(context.req.headers.cookie || '')
  let basketRef: any = cookies.basketId
  if (!basketRef) {
    basketRef = basketIdGenerator()
    context.res.setHeader('set-cookie', `basketId=${basketRef}`)
  }

  const response = await getSsrCart()({
    basketId: basketRef,
  })

  return {
    props: { cart: response }, // will be passed to the page component as props
  }
}

export default withDataLayer(Cart, PAGE_TYPE)
