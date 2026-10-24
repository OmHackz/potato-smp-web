import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ToastProvider } from '../ui/Toast';
import styles from './Layout.module.css';

export const Layout = () => {
  return (
    <ToastProvider>
      <div className={styles.layout}>
        <Navbar />
        <main className={styles.main} id="main-content" role="main">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ToastProvider>
  );
};