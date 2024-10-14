/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
  {
    path: "/app/dashboard", // the url
    icon: "HomeIcon", // the component being exported from icons/index.js
    name: "Dashboard", // name that appear in Sidebar
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
    name: "Colors",
    routes: [
      {
        path: "/app/all-colors",
        name: "All Colors",
      },
      {
        path: "/app/add-color",
        name: "Add Color",
      },
    ],
  },
  {
    icon: "TruckIcon",
    name: "Brand",
    routes: [
      {
        path: "/app/all-brand",
        name: "All Brand",
      },
      {
        path: "/app/add-brand",
        name: "Add Brand",
      },
    ],
  },
  {
    icon: "TruckIcon",
    name: "Category",
    routes: [
      {
        path: "/app/all-category",
        name: "All Category",
      },
      {
        path: "/app/add-category",
        name: "Add Category",
      },
    ],
  },
  {
    icon: "TruckIcon",
    name: "SubCategory",
    routes: [
      {
        path: "/app/all-subcategory",
        name: "All SubCategory",
      },
      {
        path: "/app/add-subcategory",
        name: "Add SubCategory",
      },
    ],
  },
  {
    path: "/app/customers",
    icon: "GroupIcon",
    name: "Customers",
  },
  {
    path: "/app/chats",
    icon: "ChatIcon",
    name: "Chats",
  },
  {
    path: "/app/manage-profile",
    icon: "UserIcon",
    name: "Profile",
  },
  {
    path: "/app/logout",
    icon: "OutlineLogoutIcon",
    name: "Logout",
  },
];

export default routes;
