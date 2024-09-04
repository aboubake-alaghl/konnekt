export default interface CheckCodeValidationResponse {
    code: string
    amount: number
    type: "percentage" | "currency"
  }
  