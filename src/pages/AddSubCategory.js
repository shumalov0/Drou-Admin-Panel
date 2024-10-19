import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Icon from "../components/Icon";
import PageTitle from "../components/Typography/PageTitle";
import { HomeIcon, AddIcon } from "../icons";
import { Card, CardBody, Label, Input, Button, Select } from "@windmill/react-ui";
import axios from "axios"; 

const FormTitle = ({ children }) => {
  return (
    <h2 className="mb-3 text-sm font-semibold text-gray-600 dark:text-gray-300">
      {children}
    </h2>
  );
};

const AddSubCategory = () => {
  const [subcategoryName, setSubcategoryName] = useState("");
  const [categories, setCategories] = useState([]); // State for categories
  const [selectedCategory, setSelectedCategory] = useState(""); // State for selected category
  const [message, setMessage] = useState("");

  // Fetch categories from API when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://drou-electronics-store.onrender.com/api/v1/category");
        console.log(response)
        setCategories(response.data.data); 
       // Assuming the categories are inside 'response.data.categories'
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };


    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subcategoryName.trim()) {
      setMessage("Subcategory adı boş ola bilməz.");
      return;
    }

    try {
      const response = await axios.post(
        "https://drou-electronics-store.onrender.com/api/v1/subcategory/create",
        {
          name: subcategoryName,
          parentCategoryID: selectedCategory, // Send selected category ID
        }
      );
      

      if (response.data.success) {
        setSubcategoryName("");
        setSelectedCategory(""); // Reset selected category
      }
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Failed to create Subcategory.");
      console.error("Error creating subcategory:", error);
    }
  };

  return (
    <div>
      <PageTitle>Add New Subcategory</PageTitle>

      {/* Breadcrumb */}
      <div className="flex text-gray-800 dark:text-gray-300">
        <div className="flex items-center text-purple-600">
          <Icon className="w-5 h-5" aria-hidden="true" icon={HomeIcon} />
          <NavLink exact to="/app/dashboard" className="mx-2">
            Dashboard
          </NavLink>
        </div>
        {">"}
        <p className="mx-2">Add new Subcategory</p>
      </div>

      <div className="w-full mt-8 grid gap-4 grid-col md:grid-cols-3">
        <Card className="row-span-2 md:col-span-2">
          <CardBody>
            <form onSubmit={handleSubmit}>
              <FormTitle>Subcategory Name</FormTitle>
              <Label>
                <Input
                  className="mb-4"
                  placeholder="Type Subcategory name here"
                  value={subcategoryName}
                  onChange={(e) => setSubcategoryName(e.target.value)}
                />
              </Label>

              <Label className="mt-4 py-6">
                <FormTitle>Select Product Category</FormTitle>
                <Select
                  className="mt-1"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)} // Handle category change
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Select>
              </Label>

              <div className="w-full">
                <Button type="submit" size="large" iconLeft={AddIcon}>
                  Add Subcategory
                </Button>
              </div>
            </form>

            {message && <p className="mt-4 text-green-600">{message}</p>}
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default AddSubCategory;
