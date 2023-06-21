import { Link } from 'react-router-dom';

import styles from './Sidebar.module.scss';
import {  FundOutlined, PieChartOutlined, UserOutlined } from '@ant-design/icons';

const Sidebar = ({ menuOpen }: any) => {
    const menuItem = [
        { title: 'Dashboard', icon: <FundOutlined />, route: '/dashboard' },
        { title: 'Sale', icon: <PieChartOutlined />, route: '/sale' },
        { title: 'DS Khách Hàng', icon: <UserOutlined />, route: '/khach-hang' },
    ]
    return (
        <div className={styles.sidebar}>
            {menuItem.map((item,index) => (
                <nav key={index}  aria-label="main mailbox folders" style={{ padding: 0 }}>
                    <Link to={item.route} className={styles.link}>
                        <div className={styles['menu-sidebar']}>
                            <div className={styles['icon-sidebar']}>
                                {item.icon}
                            </div>
                            <div className={menuOpen ? styles['menu--text'] : styles['menu--text-closed']}>{item.title} </div>
                        </div>
                    </Link>
                </nav>
            ))}


        </div>
    );
};

export default Sidebar;
