import { attr } from 'dom7'
import Link from 'next/link'

interface Attribute {
  fieldCode: string
  fieldName: string
  fieldValues: []
}

interface Attributes {
  attributes: [Attribute]
  onChange: any
  link?: string
}

const ColorSelector = ({ attr, onChange, link }: any) => {
  return (
    <div>
      {attr.fieldValues.map((item: any, idx: number) => {
        return (
          <Link key={idx} href={link || '#'} passHref>
            <a
              key={idx}
              onMouseEnter={() => onChange(item, 'enter')}
              onMouseLeave={() => onChange(item, 'leave')}
              className="h-8 w-8 inline-block rounded-full mr-2 mt-2 border border-gray-100"
              style={{ backgroundColor: item.fieldValue }}
            />
          </Link>
        )
      })}
    </div>
  )
}

ColorSelector.displayName = 'ColorSelector'

const getAttributeComponent = (type: string) => {
  switch (type) {
    case 'global.colour':
      return (props: any) => <ColorSelector {...props} />
    default:
      return () => null
  }
}

export default function AttributeSelector({
  attributes,
  onChange = {},
  link,
}: Attributes) {
  return (
    <>
      {attributes.map((attr: Attribute, idx: number) => {
        const Component = getAttributeComponent(attr.fieldCode)
        // return <>{({ attr, onChange, link })}</>
        return (
          <Component attr={attr} key={idx} onChange={onChange} link={link} />
        )
      })}
    </>
  )
}
