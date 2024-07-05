import { Route, Routes } from 'react-router-dom';
import { Home } from './home';
import { Main } from './main';
import { NewDashboard } from './home/newDashboard';
import { RegisterUser } from './home/registerUser';
import { SelectActivity } from './home/selectActivity';
import { GeneralQuestion } from './home/questions1';
import { TermsAndConditions } from './home/termsAndConditions';

const routes = [
  { path: '/', Page: Home },
  { path: '/main', Page: Main },
  { path: '/dashboard', Page: NewDashboard },
  { path: '/registeruser', Page: RegisterUser },
  { path: '/selectactivity', Page: SelectActivity },
  { path: '/generalquestion', Page: GeneralQuestion },
  { path: '/terms', Page: TermsAndConditions },
];

function Routing() {
  const getRoutes = () => routes.map(({ path, Page }) => <Route key={path} path={path} element={<Page />} />);

  return <Routes>{getRoutes()}</Routes>;
}

export { Routing };