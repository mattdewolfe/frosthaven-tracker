import { Link } from 'react-router-dom';
import RouteMap from '../routes';

export default function Navbar() {
    return <nav className='nav'>
        <a href='/' className='site-title'>
            Frosthaven Stat Tracker
        </a>
        <ul>
            <li>
                <Link to={RouteMap.HOME}>
                    Home
                </Link>
            </li>
            <Link to={RouteMap.PLAYERS}>
                Players Page
            </Link>
            <li>
                <Link to={RouteMap.SCENARIOS}>
                    Scenarios
                </Link>
            </li>
            <li>
                <Link to={RouteMap.EXAMPLE}>
                    Example
                </Link>
            </li>


        </ul>
    </nav>
}