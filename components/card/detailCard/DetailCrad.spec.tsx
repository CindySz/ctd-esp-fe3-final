import { render, screen } from '@testing-library/react';
import DetailsCard from './DetailsCard';
import { IResult } from 'types/Comic';
import comic from 'dh-marvel/test/mocks/comic';
describe('DetailsCard', () => {
    test('renders the comic details correctly', () => {
      render(<DetailsCard comic={comic as IResult} />);
      
      expect(screen.getByText('Marvel Previews (2017)')).toBeInTheDocument();
  
      expect(screen.getByText('$100')).toBeInTheDocument();
  
      expect(screen.getByText('50% OFF!')).toBeInTheDocument();
 
      expect(screen.getByText('$50')).toBeInTheDocument();
    });
  });