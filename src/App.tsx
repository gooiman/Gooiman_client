import { RouterProvider } from 'react-router-dom';

import router from './router';
import { useEffect } from 'react';
import { initializeApp } from './store/useUserStore';

function App() {
  useEffect(() => {
    initializeApp();
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
