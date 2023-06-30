import React from 'react';
import { render, screen } from '@testing-library/react';
import { FormStepper } from './FormStepper';

describe('FormStepper', () => {
  test('renders steps with correct labels', () => {
    const steps = [
      {
        label: 'Datos Personales',
        fields: [
          { label: 'Nombre', name: 'name', type: 'text' },
          { label: 'Email', name: 'email', type: 'email' },
        ],
      },
      {
        label: 'Dirección de Entrega',
        fields: [
          { label: 'Dirección', name: 'address1', type: 'password' },
          { label: 'Dirección alternativa', name: 'address2', type: 'password' },
        ],
      },
    ];
    const activeStep = 0;

    render(<FormStepper steps={steps} activeStep={activeStep} />);

    
    expect(screen.getByText('Datos Personales')).toBeInTheDocument();
    expect(screen.getByText('Dirección de Entrega')).toBeInTheDocument();
  });
});