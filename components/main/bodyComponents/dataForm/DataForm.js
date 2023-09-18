import React, { useState, useEffect } from 'react'
import { getProviders, signIn, signOut, useSession, getSession } from 'next-auth/react'
import axios from "axios"

/** Material UI */
import Grid from '@mui/material/Grid';
import Button from "./components/Button";
import Checkbox from "./components/Checkbox";
import DatePicker from "./components/DatePicker";
import Input from "./components/Input";
import RadioGroup from "./components/RadioGroup";
import Select from "./components/Select";
import CustomizedSelect from "./components/CustomizedSelect";
import { useForm, Form } from "./components/useForm";

const initialFValues = {
  firstName: '',
  lastName: '',
  customized: {
    select: '1',
    input: ''
  },
  mobile: '',
  radioGroup: '',
  category: '',
  hireDate: new Date(),
  isCheck: false,
}

const radioItems = [
  { id: 'optionRadio1', title: 'Option1' },
  { id: 'optionRadio2', title: 'Option2' },
  { id: 'optionRadio3', title: 'Option3' },
]

const optionsSelect = [
  { id: 'Menor', title: 'Menor' },
  { id: 'Juvenil', title: 'Juvenil' },
  { id: 'Sub 20', title: 'Sub 20' },
  { id: 'Sub 23', title: 'Sub 23' },
]

const optionsCustomized = [
  { id: '1', title: 'V' },
  { id: '2', title: 'E' },                
]

export default function DataForm(props) {
  let { account, setBackdrop } = props
  const { data: session, status } = useSession()
  let {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm
  } = useForm();
  
  useEffect(() => {
    setValues({
      ...values,
      ...account
    })
  }, [account])
  
  const validate = (fieldValues = values) => {
    let temp = {}
    if ('firstName' in fieldValues)
      fieldValues.firstName ? null : temp.firstName = "This field is required."
    if ('lastName' in fieldValues)
      fieldValues.lastName ? null : temp.lastName = "This field is required."
    if ('customized' in fieldValues)
      (fieldValues.customized.select && fieldValues.customized.input)  ? null : temp.customized = "This field is required."
    /* 
    if ('email' in fieldValues)
    temp.email = (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(fieldValues.email) ? "" : "Email is not valid."
    */
    if ('mobile' in fieldValues)
      fieldValues.mobile.length > 9 ? null : temp.mobile = "This field is required."
    if ('selectId' in fieldValues)
      fieldValues.selectId.length != 0 ? null : temp.selectId = "This field is required."

    setErrors({
      ...temp
    })

    return temp
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errs = validate();

    if (Object.keys(errs).length) return;
    setBackdrop(true)    
       
    try {
      axios({
        url: `${process.env.BACKEND_URL}/api-user/${session.user._id}/account`,
        method: "put",
        data: values,
        headers: {
          'Authorization':`Bearer ${process.env.TOKEN_ACCESS}`
        },
        withCredentials: true,
      })     
    } 
    catch (error) {
      console.error(error)
    }
  };

  return (
    <>
      <Form>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Input
              required
              label="First name"
              name="firstName"
              value={values.firstName}
              onChange={handleInputChange}
              error={errors.firstName}
            />
            <Input
              required
              label="Last name"
              name="lastName"
              value={values.lastName}
              onChange={handleInputChange}
              error={errors.lastName}
            />
            <CustomizedSelect
              required
              name="customized"
              label="Customized Select"
              value={values.customized}
              onChange={handleInputChange}
              options={optionsCustomized}
              error={errors.customized}
            />
            <Input
              label="Mobile"
              name="mobile"
              value={values.mobile}
              onChange={handleInputChange}
              error={errors.mobile}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <RadioGroup
              name="radioGroup"
              label="Option Radio"
              value={values.radioGroup}
              onChange={handleInputChange}
              items={radioItems}
            />
            <Select
              name="category"
              label="Category"
              value={values.category}
              onChange={handleInputChange}
              options={optionsSelect}
              error={errors.selectId}
            />
            <DatePicker
              disableFuture={true}
              name="hireDate"
              label="Hire Date"
              value={values.hireDate}
              onChange={handleInputChange}
            />
            <Checkbox
              name="isCheck"
              label="Check Option"
              value={values.isCheck}
              onChange={handleInputChange}
            />
            <div>
              <Button
                onClick={handleSubmit}  
                text="Submit" 
              />
              <Button
                text="Reset"
                color="neutral"
                onClick={resetForm}  
              />
            </div>
          </Grid>
        </Grid>
      </Form>
    </>
  )
}
