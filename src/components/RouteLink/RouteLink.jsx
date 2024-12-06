import React from 'react';
import { Link } from 'react-router-dom';

const RouteLink = ({ path, label, icon }) => {
  return (
    <li>
      <Link to={path}>
        <span className='icon'>{icon}</span>
        <span>{label}</span>
      </Link>
    </li>
  );
};

export default RouteLink;
