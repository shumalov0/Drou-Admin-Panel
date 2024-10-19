import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Icon from "../components/Icon";
import PageTitle from "../components/Typography/PageTitle";
import { HomeIcon, AddIcon, PublishIcon, StoreIcon } from "../icons";
import {
  Card,
  CardBody,
  Label,
  Input,
  Textarea,
  Button,
  Select,
} from "@windmill/react-ui";

const FormTitle = ({ children }) => {
  return (
    <h2 className="mb-3 text-sm font-semibold text-gray-600 dark:text-gray-300">
      {children}
    </h2>
  );
};

const AddProduct = () => {
  // State-ləri müəyyənləşdirək
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [inStock, setInStock] = useState(false);
  const [stockQuantity, setStockQuantity] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState(null);

  // useEffect vasitəsilə məlumatları API-dən almaq
  useEffect(() => {
    axios
      .get("https://drou-electronics-store.onrender.com/api/v1/category/") // Correct category API
      .then((response) => setCategories(response.data.data));

    axios
      .get("https://drou-electronics-store.onrender.com/api/v1/brand/") // Correct brand API
      .then((response) => setBrands(response.data.data));

    axios
      .get("https://drou-electronics-store.onrender.com/api/v1/color/") // Correct color API
      .then((response) => setColors(response.data.data));

    axios
      .get("https://drou-electronics-store.onrender.com/api/v1/subcategory/") // Correct subcategory API
      .then((response) => setSubcategories(response.data.data));
  }, []);

  // Məhsul əlavə etmək funksiyası
  const handleAddProduct = () => {
    const formData = new FormData();

    formData.append("name", productName); // Məhsul adı
    formData.append("category", selectedCategory); // Kateqoriya ID-si
    formData.append("price", productPrice); // Məhsulun qiyməti
    formData.append("brand", selectedBrand); // Brend ID-si
    formData.append("inStock", inStock); // Məhsul stokda olub-olmaması (boolean true/false)
    formData.append("color", selectedColor); // Məhsulun rəngi
    formData.append("description", productDescription); // Məhsulun təsviri
    formData.append("subcategory", selectedSubcategory); // Subcategory ID-si
    formData.append("stock", stockQuantity); // Məhsulun stok sayı
    if (productImage) {
      formData.append("images", productImage); // Məhsulun şəkli (əgər varsa)
    }

    axios
      .post(
        "https://drou-electronics-store.onrender.com/api/v1/products/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log(response.data); // Backend-dən gələn cavabı yoxlayırıq
        alert("Product added successfully!");
      })
      .catch((error) => {
        console.error("Error adding product:", error.response.data); // Səhvləri çap edirik
      });
  };

  // Şəkil yükləmə funksiyası
  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
  };

  return (
    <div>
      <PageTitle>Add New Product</PageTitle>

      {/* Breadcrumb */}
      <div className="flex text-gray-800 dark:text-gray-300">
        <div className="flex items-center text-purple-600">
          <Icon className="w-5 h-5" aria-hidden="true" icon={HomeIcon} />
          <NavLink exact to="/app/dashboard" className="mx-2">
            Dashboard
          </NavLink>
        </div>
        {">"}
        <p className="mx-2">Add new Product</p>
      </div>

      <div className="w-full mt-8 grid gap-4 grid-col md:grid-cols-3 ">
        <Card className="row-span-2 md:col-span-2">
          <CardBody>
            <FormTitle>Product Image</FormTitle>
            <input
              type="file"
              className="mb-4 text-gray-800 dark:text-gray-300"
              onChange={handleImageChange} // Şəkil dəyişikliklərinə qulaq asırıq
            />

            <FormTitle>Product Name</FormTitle>
            <Label>
              <Input
                className="mb-4"
                placeholder="Type product name here"
                value={productName}
                onChange={(e) => setProductName(e.target.value)} // Adı yazırıq
              />
            </Label>

            <FormTitle>Product Price</FormTitle>
            <Label>
              <Input
                type="number"
                className="mb-4"
                placeholder="Enter product price here"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)} // Qiyməti yazırıq
              />
            </Label>

            <FormTitle>In Stock</FormTitle>
            <Label>
              <Input
                type="checkbox"
                className="mb-4"
                checked={inStock}
                onChange={(e) => setInStock(e.target.checked)} // Stokdadır checkbox-u
              />
            </Label>

            <FormTitle>Stock Quantity</FormTitle>
            <Label>
              <Input
                type="number"
                className="mb-4"
                placeholder="Enter product stock quantity"
                value={stockQuantity}
                onChange={(e) => setStockQuantity(e.target.value)} // Stok sayını yazırıq
              />
            </Label>

            <FormTitle>Full description</FormTitle>
            <Label>
              <Textarea
                className="mb-4"
                rows="5"
                placeholder="Enter product full description here"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)} // Məhsulun tam təsvirini yazırıq
              />
            </Label>

            <div className="w-full">
              <Button
                size="large"
                iconLeft={AddIcon}
                onClick={handleAddProduct}
              >
                Add Product
              </Button>
            </div>
          </CardBody>
        </Card>

        <Card className="h-auto">
          <CardBody>
            <Label className="mt-4 py-6">
              <FormTitle>Select Product Category</FormTitle>
              <Select
                className="mt-1"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </Label>

            <Label className="mt-4 py-6">
              <FormTitle>Select Product Brand</FormTitle>
              <Select
                className="mt-1"
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
              >
                <option value="">Select a brand</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </Select>
            </Label>

            <Label className="mt-4 py-6">
              <FormTitle>Select Product Color</FormTitle>
              <Select
                className="mt-1"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
              >
                <option value="">Select a color</option>
                {colors.map((color) => (
                  <option key={color.id} value={color.id}>
                    {color.name}
                  </option>
                ))}
              </Select>
            </Label>

            <Label className="mt-4 py-6">
              <FormTitle>Select Product Subcategory</FormTitle>
              <Select
                className="mt-1"
                value={selectedSubcategory}
                onChange={(e) => setSelectedSubcategory(e.target.value)}
              >
                <option value="">Select a sussdlkmlscategory</option>
                {subcategories.map((subcategory) => (
                  <option key={subcategory.id} value={subcategory.id}>
                    {subcategory.name}
                  </option>
                ))}
              </Select>
            </Label>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default AddProduct;
