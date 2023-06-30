import React from 'react';
import { Box, Step, StepLabel, Stepper } from '@mui/material';

interface FormStepperProps {
  steps: { label: string; fields: { label:string, name: string; type: string }[] }[];
  activeStep: number;
}

export const FormStepper: React.FC<FormStepperProps> = ({ steps, activeStep }) => {
  return (
    <Box
    sx={{width:"100%"}}>
    <Stepper activeStep={activeStep} sx={{ paddingBottom: "50px" }}>
      {steps.map((step) => (
        <Step key={step.label}>
          <StepLabel>{step.label}</StepLabel>
        </Step>
      ))}
    </Stepper>
    </Box>
  );
};