import React, { useState, useEffect } from "react";
import axios from "axios";
import PageTitle from "../components/Typography/PageTitle";
import { Link, NavLink } from "react-router-dom";
import {
  EditIcon,
  EyeIcon,
  GridViewIcon,
  HomeIcon,
  ListViewIcon,
  TrashIcon,
} from "../icons";
import {
  Card,
  CardBody,
  Label,
  Select,
  Button,
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Avatar,
  Badge,
  Pagination,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@windmill/react-ui";
import Icon from "../components/Icon";
import { genRating } from "../utils/genarateRating";

const ProductsAll = () => {
  const [view, setView] = useState("grid");

  // Table and grid data handling
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // To show loading state
  const [error, setError] = useState(null); // To handle errors

  // Pagination setup
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const [totalResults, setTotalResults] = useState(0); // Set total results based on fetched data

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://drou-electronics-store.onrender.com/api/v1/products?page=${page}&limit=${resultsPerPage}`
        );
        setData(response.data.data); // Assuming the API response contains data under `data.data`
        setTotalResults(response.data.total); // Assuming the total count is in `response.data.total`
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, resultsPerPage]);

  // Pagination change control
  function onPageChange(p) {
    setPage(p);
  }

  // Delete action modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDeleteProduct, setSelectedDeleteProduct] = useState(null);

  async function openModal(productId) {
    let product = data.filter((product) => product.id === productId)[0];
    setSelectedDeleteProduct(product);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  // Handle list view
  const handleChangeView = () => {
    setView(view === "list" ? "grid" : "list");
  };

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <PageTitle>All Products</PageTitle>

      {/* Breadcrumb */}
      <div className="flex text-gray-800 dark:text-gray-300">
        <div className="flex items-center text-purple-600">
          <Icon className="w-5 h-5" aria-hidden="true" icon={HomeIcon} />
          <NavLink exact to="/app/dashboard" className="mx-2">
            Dashboard
          </NavLink>
        </div>
        {">"}
        <p className="mx-2">All Products</p>
      </div>

      {/* Sort and Filter */}
      <Card className="mt-5 mb-5 shadow-md">
        <CardBody>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                All Products
              </p>
              <Label className="mx-3">
                <Select className="py-3">
                  <option>Sort by</option>
                  <option>Asc</option>
                  <option>Desc</option>
                </Select>
              </Label>

              <Label className="mx-3">
                <Select className="py-3">
                  <option>Filter by Category</option>
                  <option>Electronics</option>
                  <option>Cloths</option>
                  <option>Mobile Accessories</option>
                </Select>
              </Label>

              <Label className="mr-8">
                <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                  <input
                    className="py-3 pr-5 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                    placeholder="Number of Results"
                    value={resultsPerPage}
                    onChange={(e) => setResultsPerPage(e.target.value)}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center mr-3 pointer-events-none">
                    Results on {`${view}`}
                  </div>
                </div>
              </Label>
            </div>
            <div>
              <Button
                icon={view === "list" ? ListViewIcon : GridViewIcon}
                className="p-2"
                aria-label="Edit"
                onClick={handleChangeView}
              />
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Delete product modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader className="flex items-center">
          <Icon icon={TrashIcon} className="w-6 h-6 mr-3" />
          Delete Product
        </ModalHeader>
        <ModalBody>
          Make sure you want to delete product{" "}
          {selectedDeleteProduct && `"${selectedDeleteProduct.name}"`}
        </ModalBody>
        <ModalFooter>
          <Button layout="outline" onClick={closeModal}>
            Cancel
          </Button>
          <Button>Delete</Button>
        </ModalFooter>
      </Modal>

      {/* Product Views */}
      {view === "list" ? (
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Name</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>QTY</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Action</TableCell>
              </tr>
            </TableHeader>
            <TableBody>
              {data.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <Avatar
                        className="hidden mr-4 md:block"
                        src={product.images}
                        alt="Product image"
                      />
                      <div>
                        <p className="font-semibold">{product.name}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge type={product.qty > 0 ? "success" : "danger"}>
                      {product.qty > 0 ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">
                    {genRating(product.rating, product.reviews.length, 5)}
                  </TableCell>
                  <TableCell className="text-sm">{product.qty}</TableCell>
                  <TableCell className="text-sm">{product.price}</TableCell>
                  <TableCell>
                    <div className="flex">
                      <Link to={`/app/product/${product.id}`}>
                        <Button
                          icon={EyeIcon}
                          className="mr-3"
                          aria-label="Preview"
                        />
                      </Link>
                      <Button
                        icon={EditIcon}
                        className="mr-3"
                        layout="outline"
                        aria-label="Edit"
                      />
                      <Button
                        icon={TrashIcon}
                        layout="outline"
                        onClick={() => openModal(product.id)}
                        aria-label="Delete"
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TableFooter>
            <Pagination
              totalResults={totalResults}
              resultsPerPage={resultsPerPage}
              label="Table navigation"
              onChange={onPageChange}
            />
          </TableFooter>
        </TableContainer>
      ) : (
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-8">
          {data.map((product) => (
            <div className="h-[50px]" key={product.id}>
              <Card>
                <img
                  className="object-cover w-full"
                  src={product.images}
                  alt="Product image"
                />
                <CardBody>
                  <p className="mb-4 font-semibold">{product.name}</p>
                  <Badge type={product.qty > 0 ? "success" : "danger"}>
                    {product.qty > 0 ? "In Stock" : "Out of Stock"}
                  </Badge>
                  <p className="mt-4">${product.price}</p>
                  <div className="mt-6 flex items-center justify-between">
                    <Button block>
                      <Link to={`/app/product/${product.id}`}>View</Link>
                    </Button>
                    <Button block layout="outline">
                      Edit
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsAll;
