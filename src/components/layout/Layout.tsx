import React, { ReactNode, useState } from "react";
import Header from "./header/Header";
import styles from "./Layout.module.scss";
import Sidebar from "./sidebar/Sidebar";
interface Props {
  children: ReactNode;
}
const Layout: React.FC<Props> = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(true);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <div>
      <Header handleMenuToggle={handleMenuToggle} />
      <div className={styles.container}>
        <Sidebar menuOpen={menuOpen} />
        <div className={styles["main-content"]}>
          <div className="absolute w-95">{children}</div>
        </div>
      </div>
    </div>
  );
};
export default Layout;
