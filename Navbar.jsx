import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">Bug Tracker</div>
        <div className="space-x-4">
          <Link to="/bugs" className="text-gray-300 hover:text-white">Bugs</Link>
          <Link to="/projects" className="text-gray-300 hover:text-white">Projects</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
