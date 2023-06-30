
import { render, screen } from '@testing-library/react';
import CardComic from './CardComic';
import { IResult } from 'types/Comic';
import comic from 'dh-marvel/test/mocks/comic';

test('renders CardComic component', () => {
  

  render(<CardComic comic={comic as IResult} />);

  
  const title = screen.getByAltText("Marvel Previews (2017)");
      expect(title).toBeInTheDocument();


  const verDetallesButton = screen.getByRole('button', { name: 'Ver detalles' });
  expect(verDetallesButton).toBeInTheDocument();

  const comprarButton = screen.getByRole('button', { name: 'COMPRAR' });
  expect(comprarButton).toBeInTheDocument();
});

