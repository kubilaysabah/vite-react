import { useState } from 'react';
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from '@mui/material';
import InvoiceForm from './_components/invoice-form';
import SelectedPackage from './_components/selected-package';

export default function Checkout() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const steps = [
    {
      label: 'Seçilen Paket',
      content: <SelectedPackage />
    },
    {
      label: 'Fatura Bilgileri',
      content: <InvoiceForm handleBack={handleBack} />
    }
  ];

  return (
    <Stepper activeStep={activeStep} orientation="vertical">
      {steps.map((step, index) => (
        <Step key={index}>
          <StepLabel>{step.label}</StepLabel>
          <StepContent>
            {step.content}
            {index < (steps.length - 1) && (
              <Box sx={{ mb: 2 }}>
                <Button type={'button'} variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
                  {'Devam Et'}
                </Button>
                <Button disabled={index === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                  {'Geri'}
                </Button>
              </Box>
            )}
          </StepContent>
        </Step>
      ))}
    </Stepper>
  );
}
