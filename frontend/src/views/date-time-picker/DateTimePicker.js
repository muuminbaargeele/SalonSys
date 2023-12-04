import * as React from 'react'
// import { DemoContainer } from '@mui/material/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/material/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/material/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/material/x-date-pickers/DateTimePicker'

export default function BasicDateTimePicker() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker']}>
        <DateTimePicker label='Basic date time picker' />
      </DemoContainer>
    </LocalizationProvider>
  )
}
