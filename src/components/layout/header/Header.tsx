import styles from "./Header.module.scss";
import { AlignLeftOutlined } from "@ant-design/icons";
import userService from "../../../services/user-service";
import { useNavigate } from "react-router-dom";

const Header = ({ handleMenuToggle }: any) => {
  const navigate = useNavigate();
  const handleLogOut = ()=>{
    userService.logout();
    navigate("/");
  }
  return (
    <>
      <header className={styles["app-bar"]}>
        <div className="flex items-center justify-between">
          <div className="flex">
            <button
              className="bg-transparent border-none"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuToggle}
            >
              <AlignLeftOutlined />
            </button>
            <span className={styles.title}>Company</span>
          </div>
          <div><button className="cursor-pointer border-none bg-transparent hover:text-blue-500" onClick={handleLogOut}>Đăng xuất</button></div>
        </div>
        <div></div>
      </header>
      {/* <Sidebar menuOpen={menuOpen} /> */}
    </>
  );
};

export default Header;
