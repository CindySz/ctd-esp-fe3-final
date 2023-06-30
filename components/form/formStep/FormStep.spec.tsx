import React from 'react';
import { render, screen } from '@testing-library/react';
import { FormStep } from './FormStep';

describe('FormStep', () => {
  test('renders text fields with correct labels', () => {
    const fields = [
      { label: 'Name', name: 'name', type: 'text' },
      { label: 'Email', name: 'email', type: 'email' },
    ];
    const register = jest.fn();
    const errors = {};

    render(<FormStep fields={fields} register={register} errors={errors} />);

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });
});