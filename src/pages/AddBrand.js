import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Icon from "../components/Icon";
import PageTitle from "../components/Typography/PageTitle";
import { HomeIcon, AddIcon } from "../icons";
import { Card, CardBody, Label, Input, Button } from "@windmill/react-ui";
import axios from "axios"; 

const FormTitle = ({ children }) => {
  return (
    <h2 className="mb-3 text-sm font-semibold text-gray-600 dark:text-gray-300">
      {children}
    </h2>
  );
};

const AddBrand= () => {
  const [brandName, setBrandName] = useState("");
  const [message, setMessage] = useState("");

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!brandName.trim()) {
      setMessage("Brand adı boş ola bilməz.");
      return;  
    }

    try {
      const response = await axios.post(
        "https://drou-electronics-store.onrender.com/api/v1/brand/create",
        {
          name: brandName,
        }
      );
      

      if (response.data.success) {
        setMessage("Brand created successfully!");
        setBrandName(""); 
 
      }
    } catch (error) {
      setMessage("Failed to create brand.");
      console.error("Error creating brand:", error);
    }
  };


  return (
    <div>
      <PageTitle>Add New Brand</PageTitle>

      {/* Breadcum */}
      <div className="flex text-gray-800 dark:text-gray-300">
        <div className="flex items-center text-purple-600">
          <Icon className="w-5 h-5" aria-hidden="true" icon={HomeIcon} />
          <NavLink exact to="/app/dashboard" className="mx-2">
            Dashboard
          </NavLink>
        </div>
        {">"}
        <p className="mx-2">Add new Brand</p>
      </div>

      <div className="w-full mt-8 grid gap-4 grid-col md:grid-cols-3 ">
        <Card className="row-span-2 md:col-span-2">
          <CardBody>
            <form onSubmit={handleSubmit}>
              <FormTitle>Brand Name</FormTitle>
              <Label>
                <Input
                  className="mb-4"
                  placeholder="Type Brand name here"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                />
              </Label>


              <div className="w-full">
                <Button type="submit" size="large" iconLeft={AddIcon}>
                  Add Brand
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

export default AddBrand;
