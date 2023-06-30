import { render, screen } from '@testing-library/react';
import GridLayout from './Grid';



const comics = [
    {
      id: 1,
      title: 'Comic 1',
    },
    {
      id: 2,
      title: 'Comic 2',
    },
    {
      id: 3,
      title: 'Comic 3',
    },
  ];
  
  describe('GridLayout', () => {
    test('renders the comics correctly', () => {
      render(<GridLayout comics={comics as any} />);
  
      comics.forEach((comic) => {
        expect(screen.getByText(comic.title)).toBeInTheDocument();
      });
    });
  });

  
  
  
  
  
  






