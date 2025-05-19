import { Link } from 'react-router-dom';
import { HOME_ROUTE } from '../router/routerTypes';

const NotFoundPage = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            <Link to={HOME_ROUTE} style={{ color: '#007bff', textDecoration: 'none' }}>
                Go back to Home
            </Link>
        </div>
    );
};

export default NotFoundPage;