import { useEffect, useState } from 'react'
import axios from 'axios'

//TODO to be removed when not used
export default function DummyPage() {
  const [data, setData] = useState(null)
  useEffect(() => {
    axios
      .get(
        `https://cdn.contentful.com/spaces/8quq83pnph70/environments/master/entries/31TNnjHlfaGUoMOwU0M2og?access_token=ZQwTPTY6-2UgXUFCA-lze-8idaWL5fsHXTFgTASKHJQ`
      )
      .then((res) => setData(res.data))
    //   const client = contentful.createClient({
    //     space: '8quq83pnph70',
    //     environment: 'master', // defaults to 'master' if not set
    //     accessToken: 'ZQwTPTY6-2UgXUFCA-lze-8idaWL5fsHXTFgTASKHJQ',
    //   })
    //   client
    //     .getEntry('31TNnjHlfaGUoMOwU0M2og')
    //     .then((entry) => console.log(entry))
    //     .catch(console.error)
  }, [])

  if (!data) return null
  return (
    <div>
      <span className="text-white">{data.fields.body}</span>
    </div>
  )
}
