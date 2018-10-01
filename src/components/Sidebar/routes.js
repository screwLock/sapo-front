import React from "react";

export const routes = [
    {
      path: "/",
      exact: true,
      sidebar: () => <div>Overview</div>,
      main: () => <h2>Overview</h2>
    },
    {
      path: "/blackoutDates",
      sidebar: () => <div>Blackout Dates</div>,
      main: () => <h2>Blackout Dates</h2>
    },
    {
      path: "/zipcodes",
      sidebar: () => <div>Zipcodes</div>,
      main: () => <h2>Zipcodes</h2>
    },
    {
      path: "/employees",
      sidebar: () => <div>Employees</div>,
      main: () => <h2>Employees</h2>
    },
    {
      path: "/categories",
      sidebar: () => <div>Categories</div>,
      main: () => <h2>Categories</h2>
    },  
    {
      path: "/emails",
      sidebar: () => <div>Emails</div>,
      main: () => <h2>Emails</h2>
    },  
  ];

