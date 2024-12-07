import { Route, Routes } from 'react-router-dom';
import { Home } from './home';
import { NewDashboard } from './home/newDashboard';
import { RegisterUser } from './home/registerUser';
import { SelectActivity } from './home/selectActivity';
import { IntroductoryCourse } from './home/introductoryCourse';
import { GeneralQuestion } from './home/questions1';
import { TermsAndConditions } from './home/termsAndConditions';

const routes = [
  { path: '/', Page: Home },
  { path: '/dashboard', Page: NewDashboard },
  { path: '/registeruser', Page: RegisterUser },
  { path: '/activity', Page: SelectActivity },
  { path: '/introductoryCourse', Page: IntroductoryCourse },
  { path: '/generalquestion', Page: GeneralQuestion },
  { path: '/terms', Page: TermsAndConditions },
];

function Routing() {
  const getRoutes = () => routes.map(({ path, Page }) => <Route key={path} path={path} element={<Page />} />);

  return <Routes>{getRoutes()}</Routes>;
}

export { Routing };