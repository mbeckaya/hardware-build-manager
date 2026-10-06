import { Link } from 'react-router';

export default function Navbar() {
    return (
        <header className="navbar bg-base-100 shadow-sm">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl">
                    Hardware Build Manager
                </Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <Link to="/">Build List</Link>
                    </li>
                    <li>
                        <Link to="/builds/new">New Build</Link>
                    </li>
                    <li>
                        <a href="/api/v1/builds/export">Export Builds</a>
                    </li>
                </ul>
            </div>
        </header>
    );
}
