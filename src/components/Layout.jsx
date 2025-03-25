import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import styles from "../css modules/components/Layout.module.scss"; // Ensure proper styling

export default function Layout({ children }) {
  return (
    <div className={styles.layoutContainer}>
      {/* Sidebar */}
      <div className={styles.sidebarContainer}>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {children}
      </div>
    </div>
  );
}
