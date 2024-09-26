import { ReactNode } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import DetailMemo from '@pages/DetailMemo.page';
import Main from '@pages/Main.page';

interface RouteElement {
  path: string;
  element: ReactNode;
}

const routes: RouteElement[] = [
  { path: '/', element: <Main /> },
  { path: '/detail-memo', element: <DetailMemo /> },
];

const router = createBrowserRouter(routes);

export default router;
