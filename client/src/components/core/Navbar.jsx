import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RouteMap } from '../../routes';

const Navbar = () => {

    const location = useLocation();

    useEffect(() => {

    }, [location]);

    return (
        <nav className='nav' style={{ position: "fixed", top: 0, left: 0, right: 0 }}>
            <a href='/' className='site-title'>
                Frosthaven Stat Tracker
            </a>

            <ul>
                <li>
                    <Link to={RouteMap.DECK_BUILDER}>
                        Deck Builder
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

export default Navbar;