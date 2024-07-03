import { Link } from 'react-router-dom';
import DropdownUser from './DropdownUser';
import LogoIcon from '../images/logo/logo-icon.svg';
import DarkModeSwitcher from './DarkModeSwitcher';

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center lg:justify-end justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">

      </div>
    </header>
  );
};

export default Header;
