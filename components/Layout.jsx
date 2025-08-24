import Header from "./Header";
import Footer from "./Footer";
import styles from "../styles/Home.module.css";

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Header />

      {/* content wrapper grows to push footer to the bottom when page content is short */}
      <div className={styles.content}>
        {children}
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
