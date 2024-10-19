import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Icon from "../components/Icon";
import PageTitle from "../components/Typography/PageTitle";
import { HomeIcon, AddIcon } from "../icons";
import { Card, CardBody, Label, Input, Button } from "@windmill/react-ui";
import axios from "axios"; // API isteği yapmak için

const FormTitle = ({ children }) => {
  return (
    <h2 className="mb-3 text-sm font-semibold text-gray-600 dark:text-gray-300">
      {children}
    </h2>
  );
};

const AddColor = () => {
  const [colorName, setColorName] = useState("");
  const [hexCode, setHexCode] = useState("");
  const [message, setMessage] = useState("");

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://drou-electronics-store.onrender.com/api/v1/color/create",
        {
          name: colorName,
          hex: hexCode,
        }
      );
      

      if (response.data.success) {
        setMessage("Color created successfully!");
        setColorName(""); // Formu temizle
        setHexCode("");    // Formu temizle
      }
    } catch (error) {
      setMessage("Failed to create color.");
      console.error("Error creating color:", error);
    }
  };


  return (
    <div>
      <PageTitle>Add New Color</PageTitle>

      {/* Breadcum */}
      <div className="flex text-gray-800 dark:text-gray-300">
        <div className="flex items-center text-purple-600">
          <Icon className="w-5 h-5" aria-hidden="true" icon={HomeIcon} />
          <NavLink exact to="/app/dashboard" className="mx-2">
            Dashboard
          </NavLink>
        </div>
        {">"}
        <p className="mx-2">Add new Color</p>
      </div>

      <div className="w-full mt-8 grid gap-4 grid-col md:grid-cols-3 ">
        <Card className="row-span-2 md:col-span-2">
          <CardBody>
            <form onSubmit={handleSubmit}>
              <FormTitle>Color Name</FormTitle>
              <Label>
                <Input
                  className="mb-4"
                  placeholder="Type Color name here"
                  value={colorName}
                  onChange={(e) => setColorName(e.target.value)}
                />
              </Label>

              <FormTitle>Color hex#</FormTitle>
              <Label>
                <Input
                  className="mb-4"
                  placeholder="Enter Color hex code here"
                  value={hexCode}
                  onChange={(e) => setHexCode(e.target.value)}
                />
              </Label>

              <div className="w-full">
                <Button type="submit" size="large" iconLeft={AddIcon}>
                  Add Color
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

export default AddColor;
