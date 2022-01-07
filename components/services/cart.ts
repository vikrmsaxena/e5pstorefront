import {
  NEXT_ADD_TO_CART,
  NEXT_GET_CART,
  NEXT_GET_USER_CART,
  NEXT_ASSOCIATE_CART,
  NEXT_MERGE_CART,
} from '@components/utils/constants'
import axios from 'axios'
import eventDispatcher from '@components/services/analytics/eventDispatcher'
import { EVENTS_MAP } from '@components/services/analytics/constants'
interface CartItem {
  basketId?: string
  productId?: string
  qty?: number
  manualUnitPrice?: number
  displayOrder?: number
  stockCode?: string
  userId?: string
  isAssociated?: boolean
}

interface GetCart {
  basketId?: string
}

const { BasketItemAdded, BasketItemRemoved, BasketViewed } =
  EVENTS_MAP.EVENT_TYPES

export default function cartHandler() {
  return {
    addToCart: async (
      {
        basketId,
        productId,
        qty,
        manualUnitPrice,
        displayOrder,
        stockCode,
        userId,
        isAssociated = true,
      }: CartItem,
      type = 'ADD',
      data = {}
    ) => {
      switch (type) {
        case 'ADD':
          eventDispatcher(BasketItemAdded, { ...data })
          break
        case 'REMOVE':
          eventDispatcher(BasketItemRemoved, { ...data })
          break
      }
      const response = await axios.post(NEXT_ADD_TO_CART, {
        data: {
          basketId,
          productId,
          qty,
          manualUnitPrice,
          displayOrder,
          stockCode,
        },
      })
      if (userId && !isAssociated) {
        await cartHandler().associateCart(userId, basketId)
      }
      return response.data
    },
    getCart: async ({ basketId }: GetCart) => {
      const response = await axios.get(`${NEXT_GET_CART}?basketId=${basketId}`)
      return response.data
    },
    associateCart: async (userId: string, basketId?: string) => {
      const response = await axios.post(NEXT_ASSOCIATE_CART, {
        data: { userId: userId, basketId: basketId },
      })
      return response
    },
    getCartByUser: async ({ userId, basketId }: any) => {
      const userCart: any = await axios.get(
        `${NEXT_GET_USER_CART}?userId=${userId}`
      )
      try {
        if (userId) {
          const response = await axios.post(NEXT_MERGE_CART, {
            data: {
              userBasketId: userCart.data[0].id,
              currentBasketId: basketId,
            },
          })
          return response.data
        } else {
          return userCart.data[0]
        }
      } catch (error) {
        console.log(error, 'err')
      }
    },
  }
}
