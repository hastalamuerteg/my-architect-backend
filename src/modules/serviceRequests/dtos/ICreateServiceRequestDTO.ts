interface ICreateServiceRequestDTO {
  title: string
  description: string
  customerId: string
  architectId: string
  requested?: boolean
  accepted?: boolean
  refused?: boolean
}

export { ICreateServiceRequestDTO }