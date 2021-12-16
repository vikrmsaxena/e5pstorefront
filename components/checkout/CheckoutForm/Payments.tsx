import { useEffect, useState } from 'react'
import { CheckCircleIcon } from '@heroicons/react/solid'
import Button from '@components/ui/IndigoButton'

export default function PaymentMethods({
  paymentData,
  handlePaymentMethod,
  selectedPaymentMethod,
}: any) {
  const [methods, setPaymentMethods] = useState([])
  const [activePaymentMethod, setActivePaymentMethod] = useState({ id: null })
  useEffect(() => {
    paymentData()
      .then((response: any) => {
        console.log(response)
        setPaymentMethods(response.data || [])
      })
      .catch((err: any) => console.log(err))
  }, [])

  console.log(methods)
  return (
    <ul className={`text-gray-900 mt-10`}>
      {methods?.map((item: any, idx: number) => {
        return (
          <li
            key={idx}
            onClick={() => setActivePaymentMethod(item)}
            className={`${
              activePaymentMethod.id === item.id ? 'border-indigo-600' : ''
            }  pointer border-t border py-5 px-5 flex justify-between flex-row`}
          >
            <div className="flex flex-row justify-center items-center">
              {activePaymentMethod.id === item.id ? (
                <div>
                  <CheckCircleIcon
                    className="h-5 pr-4 text-indigo-600"
                    aria-hidden="true"
                  />
                </div>
              ) : null}
              {activePaymentMethod.id !== item.id ? (
                <div>
                  <CheckCircleIcon
                    className="h-5 pr-4 text-left align-left text-gray-200"
                    aria-hidden="true"
                  />
                </div>
              ) : null}
            </div>
            <div>
              <h3 className="font-bold">{item.displayName}</h3>
              <p className="text-sm py-2">{item.description}</p>
            </div>
          </li>
        )
      })}
      {activePaymentMethod.id &&
      selectedPaymentMethod?.id !== activePaymentMethod.id ? (
        <div className="py-5 flex justify-center w-full">
          <Button
            buttonType="button"
            action={() => handlePaymentMethod(activePaymentMethod)}
            title="Confirm"
          />
        </div>
      ) : null}
    </ul>
  )
}
