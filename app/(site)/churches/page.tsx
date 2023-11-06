import { type Metadata } from 'next';

import ChurchList from '../_components/ChurchList';

export const metadata: Metadata = {
  title: 'Churches',
};

function ChurchesPage() {
  return (
    <section>
      <ChurchList />
    </section>
  );
}

export default ChurchesPage;
