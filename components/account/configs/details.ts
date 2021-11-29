import * as Yup from 'yup'

export const formConfig = [
  {
    type: 'text',
    name: 'firstName',
    placeholder: 'First name',
    label: 'First name',
  },
  {
    type: 'text',
    name: 'lastName',
    placeholder: 'Last name',
    label: 'Last name',
  },
  {
    type: 'email',
    name: 'email',
    placeholder: 'Email',
    label: 'Email',
  },
  {
    type: 'mobile',
    name: 'mobile',
    placeholder: 'Mobile Number',
    label: 'Mobile Number',
  },
  {
    type: 'phone',
    name: 'phone',
    placeholder: 'Phone number',
    label: 'Phone number',
  },
]

export const schema = Yup.object({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  email: Yup.string().email().required(),
  mobile: Yup.string(),
  phone: Yup.string(),
})
