import React, { useState } from "react";

import { Link } from "react-router-dom/cjs/react-router-dom.min";
import MainHeader from "./MainHeader";
import "./css/MainNavigation.css";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import BackDrop from "./BackDrop";
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';

const MainNavigation = (props) => {
  const [drawerIsOpen, setdrawerIsOpen] = useState(false);

  const openDrawer = () => {
    setdrawerIsOpen(true);
  };

  const closeDrawer = () => {
    setdrawerIsOpen(false);
  }

  return (
    <React.Fragment>
      {drawerIsOpen ? <BackDrop onClick={closeDrawer}/> :null}
      {drawerIsOpen ? (
        <SideDrawer onClick={closeDrawer}>
          <nav className="main-navigation__drawer-nav">
            <NavLinks />
          </nav>
        </SideDrawer>
      ) : null}
      <MainHeader>
        <MenuRoundedIcon className="main-navigation__btn" onClick={openDrawer}>
          <span />
          <span />
          <span />
        </MenuRoundedIcon>
        <h1 className="main_navigation__title">
          <Link to="/">Ginger</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
