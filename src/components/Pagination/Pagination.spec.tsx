import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Pagination } from './Pagination';
import { MemoryRouter } from 'react-router-dom';

const Component = ({ page }: { page: string }) => (
  <MemoryRouter initialEntries={['/page/1']}>
    <Pagination page={page} />
  </MemoryRouter>
);

describe('Pagination', () => {
  it('should render page number', async () => {
    render(<Component page="1" />);
    const page = await screen.findByText('Page 1');
    expect(page).toBeTruthy();
  });

  it('should render page number', async () => {
    render(<Component page="2" />);
    const page = await screen.findByText('Page 2');
    expect(page).toBeTruthy();
  });
});
