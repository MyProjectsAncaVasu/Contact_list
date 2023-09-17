import { NavLink } from 'react-router-dom';
import styles from './Nav.module.css';

export function Nav() {
  return (
    <nav className={styles['main-menu']}>
      <ul className="  bg-orange-50 h-16 md:flex  justify-center gap-20 text-2xl font-bold ">
        <li className=" mt-4 transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 ">
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : '')}
            to="/home"
          >
            Home
          </NavLink>
        </li>

        <li className=" mt-4 transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110">
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : '')}
            to="/students_list/form"
          >
            Students
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
