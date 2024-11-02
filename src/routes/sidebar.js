
const routes = [
  {
    path: "/app/dashboard",
    icon: "HomeIcon", 
    name: "Dashboard",
  },
  {
    path: "/app/orders",
    icon: "CartIcon",
    name: "Orders",
  },
  {
    icon: "TruckIcon",
    name: "Products",
    routes: [
      {
        path: "/app/all-products",
        name: "All Products",
      },
      {
        path: "/app/add-product",
        name: "Add Product",
      },
    ],
  },
  {
    icon: "TruckIcon",
    name: "Color",
    routes: [
      {
        path: "/app/add-color",
        name: "Add Color",
      },
    ],
  },
  {
    icon: "TruckIcon",
    name: "Brands",
    routes: [
      // {
      //   path: "/app/all-products",
      //   name: "All Produc",
      // },
      {
        path: "/app/add-brand",
        name: "Add Brands",
      },
    ],
  },
  {
    icon: "TruckIcon",
    name: "subcategory",
    routes: [
      // {
      //   path: "/app/all-products",
      //   name: "All Products",
      // },
      {
        path: "/app/add-subcategory",
        name: "Add subcategory",
      },
    ],
  },
  {
    icon: "TruckIcon",
    name: "category",
    routes: [
      // {
      //   path: "/app/all-products",
      //   name: "All Products",
      // },
      {
        path: "/app/add-category",
        name: "Add category",
      },
    ],
  },
  {
    path: "/app/customers",
    icon: "GroupIcon",
    name: "Customers",
  },
  // {
  //   path: "/app/chats",
  //   icon: "ChatIcon",
  //   name: "Chats",
  // },
  {
    path: "/app/manage-profile",
    icon: "UserIcon",
    name: "Profile",
  },
  // {
  //   path: "/app/settings",
  //   icon: "OutlineCogIcon",
  //   name: "Settings",
  // },
  {
    path: "/app/logout",
    icon: "OutlineLogoutIcon",
    name: "Logout",
  },
];

export default routes;
