


import styles from './Header.module.scss';
import Sidebar from '../sidebar/Sidebar';
import { AlignLeftOutlined } from '@ant-design/icons';

const Header = ({handleMenuToggle}: any) => {

  return (
    <>
      <header className={styles['app-bar']}>
          <div className='flex items-center'>
            <button  color="inherit" aria-label="menu" onClick={handleMenuToggle}>
            <AlignLeftOutlined />
            </button>
            <span  className={styles.title}>
              Company
            </span>
          </div>
          <div>
          </div>
      </header>
      {/* <Sidebar menuOpen={menuOpen} /> */}
    </>

  );
};


export default Header;
