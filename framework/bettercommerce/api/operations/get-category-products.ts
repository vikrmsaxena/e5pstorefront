import fetcher from '../../fetcher'
import { SEARCH_ADVANCED_ENDPOINT, SEARCH_MINIMAL_ENDPOINT } from '@components/utils/constants'

export default async function getCategoryProducts(
  categoryId: string,
  cookies?: any
) {
  try {
    // Call minimal endpoint
    const response: any = await fetcher({
      url: SEARCH_MINIMAL_ENDPOINT, //SEARCH_ADVANCED_ENDPOINT,
      method: 'post',
      data: { categoryId },
      cookies,
    })
    return { ...response.result, ...{snippets: response?.snippets} };
  } catch (error: any) {
    throw new Error(error)
  }
}
