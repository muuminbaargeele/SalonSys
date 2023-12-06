// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'

import toast from 'react-hot-toast'

import axios from 'axios'

import FetchLoggedUserInfo from 'src/hooks/FetchLoggedUserInfo'

const FormLayoutsSeparator = () => {
    const [values, setValues] = useState({
        Title: '',
        SubTitle: '',
        Price: '',
    })

    const { values: currentUserInfo } = FetchLoggedUserInfo()
    // Handle Change
    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value })
    }

    const handleAddService = async event => {
        event.preventDefault()


        if (
            !values.Title ||
            !values.SubTitle ||
            !values.Price
        ) return toast.error('Fill all inputfields.')


        const currentDate = new Date()
        const currentYear = currentDate.getFullYear()
        const currentMonth = currentDate.getMonth() + 1
        const currentDay = currentDate.getDate()
        const currentHour = currentDate.getHours()
        const currentMinute = currentDate.getMinutes()
        const currentSecond = currentDate.getSeconds()
        const date = `${currentYear}-${currentMonth}-${currentDay} ${currentHour}:${currentMinute}:${currentSecond}`

        const currUsername = window.localStorage.getItem('username')

        const params = new URLSearchParams()
        params.append('Username', currUsername)
        params.append('Title', values.Title)
        params.append('SubTitle', values.SubTitle)
        params.append('Price', values.Price)
        params.append('CreateDT', date)

        const requestData = {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }

        try {
            const response = await axios.post(
                'https://salonsys.000webhostapp.com/backend/api/upload_service.php',
                params,
                requestData
            )
            const data = await response.data
            if (data == 'Success') {
                toast.success(data)
                setValues({
                    Title: '',
                    SubTitle: '',
                    Price: '',
                })
            } else {
                toast.error(data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Card>
            <CardHeader title='Add New Service' titleTypographyProps={{ variant: 'h6' }} />
            <Divider sx={{ margin: 0 }} />
            <form onSubmit={handleAddService}>
                <CardContent>
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label='Title'
                                placeholder='Title'
                                value={values.Title}
                                onChange={handleChange('Title')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label='SubTitle'
                                placeholder='SubTitle'
                                value={values.SubTitle}
                                onChange={handleChange('SubTitle')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label='Price'
                                placeholder='Price'
                                type='Number'
                                value={values.Price}
                                onChange={handleChange('Price')}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider sx={{ margin: 0 }} />
                <CardActions>
                    <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
                        Add
                    </Button>
                    <Button size='large' color='secondary' variant='outlined'>
                        Cancel
                    </Button>
                </CardActions>
            </form>
        </Card>
    )
}

export default FormLayoutsSeparator
