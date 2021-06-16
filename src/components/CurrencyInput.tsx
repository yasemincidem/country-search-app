import React from 'react'
import styled from 'styled-components'
import { FormControl, TextField, InputAdornment, fade } from '@material-ui/core'

type Props = {
  value: string
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void
}

const StyledTextField = styled(TextField)`
  background-color: ${({ theme }) => fade(theme.palette.light, 0.15)};
  border-radius: ${({ theme }) => theme.border.radius.small};
  && {
    color: ${({ theme }) => theme.palette.light};
  }
  label {
    color: ${({ theme }) => theme.palette.light};
  }
  p {
    color: ${({ theme }) => theme.palette.light};
  }
  input {
    color: ${({ theme }) => theme.palette.light};
  }
`
const CurrencyInput = (props: Props): JSX.Element => {
  const { value, onChange } = props
  return (
    <FormControl fullWidth={true}>
      <StyledTextField
        id="input-with-icon-textfield"
        data-testid="div_currency_textField"
        type="number"
        label="Currency"
        InputProps={{
          startAdornment: <InputAdornment position="start">kr</InputAdornment>,
        }}
        value={value}
        onChange={onChange}
      />
    </FormControl>
  )
}

export default CurrencyInput
