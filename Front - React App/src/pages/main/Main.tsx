import { Link } from 'react-router-dom';

function Main() {
  return (
    <>
      <h1>Hola Mundo</h1>
      <div>
        <Link to="/dashboard">Go to Home</Link>
      </div>
    </>
  );
}

export { Main };