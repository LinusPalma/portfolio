import { Suspense } from 'react';
import PortfolioPage from '@/pages/portfolio-page';

const App = () => {
  return (
    <div className="app">
      <Suspense fallback={<div>Loading...</div>}>
        <PortfolioPage />
      </Suspense>
    </div>
  );
};

export default App;