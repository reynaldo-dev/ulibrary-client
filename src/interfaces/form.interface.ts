export interface IForm {
    placeholder: string
    name: string
    type: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    className: string
    value: string | number | Date
}
