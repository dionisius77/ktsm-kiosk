import { useState } from 'react';
import { Avatar, Menu } from 'react-daisyui';
import { FiLogOut, FiMenu, FiSettings, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { logoutRedux } from 'redux/auth/auth.action';
import { useAppDispatch, useAppSelector } from 'redux/hook';

interface HeaderProps {
  toggleSidebar: () => void;
  className?: string;
}

interface HeaderMenuProps {}

const HeaderMenu: React.FC<HeaderMenuProps> = (): JSX.Element => {
  const dispatch = useAppDispatch();
  return (
    <Menu className='z-[999] fixed top-[60px] right-[20px] bg-white w-56'>
      <Menu.Item>
        <button onClick={dispatch(logoutRedux())} className='flex items-center gap-2'>
          <FiLogOut size={20} />
          <span className='font-bold'>Logout</span>
        </button>
      </Menu.Item>
    </Menu>
  );
};

const Header: React.FC<HeaderProps> = ({ toggleSidebar, className }): JSX.Element => {
  const [toolbarMenuVisible, setToolbarMenuVisible] = useState<boolean>(false);
  const toggleToolbarMenuVisible = () => setToolbarMenuVisible((prev) => !prev);
  const { user } = useAppSelector((state) => state.auth);

  return (
    <nav className={`z-[998] select-none w-[80%] h-[60px] bg-primary py-4 px-8 fixed right-0 top-0 flex justify-between items-center ${className}`}>
      <div />
      <div
        onClick={toggleToolbarMenuVisible}
        className='flex items-center gap-2 cursor-pointer p-2'
      >
        <Avatar
          size='xs'
          shape='circle'
          src='https://avatars.githubusercontent.com/u/2?v=4'
        />
        <span className='font-semibold text-white'>{user?.email}</span>
      </div>

      {toolbarMenuVisible && <HeaderMenu />}
    </nav>
  );
};

export default Header;
