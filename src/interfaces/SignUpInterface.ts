export default interface SignUpInterface {
    email: string,
    password1: string,
    password2: string,
    first_name: string,
    last_name: string,
    referrer_code?: string | null
}