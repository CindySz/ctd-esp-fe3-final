import React from 'react';
import { Box, TextField } from '@mui/material';

interface FormStepProps {
  fields: { label: string, name: string; type: string }[];
  register: any;
  errors: any;
}

export const FormStep: React.FC<FormStepProps> = ({ fields, register, errors}) => {
  return (
    <>
      {fields.map((field) => (
         <Box
         sx={{width:"100%"}} key={field.name}>
        <div >
          <TextField
            {...register(field.name)}
            label={field.label }
            type={field.type}
            name={field.name}
            error={!!errors[field.name]}
            helperText={errors[field.name]?.message?.toString()
            }
            sx={{ paddingBottom: "20px", width:"100%" }}
          />
        </div>
       </Box>
      ))}
    </>
  );
};