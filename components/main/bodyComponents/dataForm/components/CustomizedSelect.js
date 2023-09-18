import * as React from 'react';
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText } from '@mui/material';
import { TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useState } from 'react';

export default function CustomizedSelect(props) {

  const { name, label, value, error=null, onChange, options, ...other } = props;

  const joinOptions = (name, field, val) => ({
	  target: {
		  name, 
		  value: {
        ...value,
        [field]: val
      }
		}
	})

  return (
    
      <Grid container>
        <Grid item xs={2}>
          <FormControl variant="outlined"
            {...(error && { error:true })}
          >
            <MuiSelect
              name={name}
              value={value.select}
              onChange={e => onChange(joinOptions(name, 'select', e.target.value))}
            >
              {
              options.map(item => (
                <MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>
              ))
              }
            </MuiSelect>
          </FormControl>
        </Grid>
        <Grid item xs={9}>
          <TextField
            variant="outlined"
            label={label}
            name={name}
            value={value.input}
            onChange={e => onChange(joinOptions(name, 'input', e.target.value))}
            {...(error && { error:true, helperText:error })}
            {...other}
          />
        </Grid>
      </Grid>
    
  );
}
