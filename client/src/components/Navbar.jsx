import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RouteMap } from '../routes';

export default function Navbar() {

    const location = useLocation();

    useEffect(() => {

    }, [location]);

    return (
        <nav className='nav'>
            <a href='/' className='site-title'>
                Frosthaven Stat Tracker
            </a>

            <ul>
                <li>
                    <Link to={RouteMap.HOME}>
                        Home
                    </Link>
                </li>

                <li>
                    <Link to={RouteMap.PLAYERS}>
                        Players
                    </Link>
                </li>

                <li>
                    <Link to={RouteMap.SCENARIOS}>
                        Scenarios
                    </Link>
                </li>
            </ul>
        </nav>
    );
}