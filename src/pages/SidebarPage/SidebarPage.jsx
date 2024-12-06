import React from 'react';
import sidebarLinks from "./SidebarLinks";
import RouteLink from '../../components/RouteLink/RouteLink';
import "./sidebarPage.scss";

const SidebarPage = () => {
  return (
    <div className='sidebar_page'>
      <div className="sidebar_con">
        <ul className='sidebar_items'>
          {
            sidebarLinks.map((item, idx) => (
              <RouteLink
                icon={item.icon}
                label={item.label}
                path={item.path}
                key={idx}
              />
            ))
          }
        </ul>
      </div>
    </div>
  );
};

export default SidebarPage;
