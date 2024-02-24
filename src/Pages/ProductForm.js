import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const ProductForm = () => {
  const [open, setOpen] = useState(false);
  const [productData, setProductData] = useState({
    productName: "",
    description: "",
    price: "",
    category: "",
    stockQuantity: "",
    images: null,
  });
  const [selectedFileName, setSelectedFileName] = useState(""); // Track the selected file name

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProductData({ ...productData, images: file });
    setSelectedFileName(file ? file.name : ""); // Set the selected file name
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("productName", productData.productName);
      formData.append("description", productData.description);
      formData.append("price", productData.price);
      formData.append("category", productData.category);
      formData.append("stockQuantity", productData.stockQuantity);
      formData.append("images", productData.images);


      const response = await axios.post(
        "http://localhost:8081/products",
        productData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Product created successfully", response.data);

      // Assuming the server returns the image URL in the response
      const uploadedImageUrl = response.data.images;

      // Update state to store the uploaded image URL
      setProductData({ ...productData, images: uploadedImageUrl });

      // Close the modal
      handleClose();
    } catch (error) {
      console.error("Error creating product:", error.message);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>MUI - Product Form</h1>
      <Button onClick={handleOpen} color="primary" variant="contained">
        Open Product Form
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Create New Product</DialogTitle>
        <IconButton
          onClick={handleClose}
          style={{ position: "absolute", top: "8px", right: "8px" }}
        >
          <CloseIcon color="primary" />
        </IconButton>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2} margin={2}>
              <TextField
                variant="outlined"
                label="Product Name"
                fullWidth
                name="productName"
                value={productData.productName}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                label="Description"
                fullWidth
                name="description"
                value={productData.description}
                onChange={handleChange}
              />
              <TextField
                type="number"
                variant="outlined"
                label="Price"
                fullWidth
                name="price"
                value={productData.price}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                label="Category"
                fullWidth
                name="category"
                value={productData.category}
                onChange={handleChange}
              />
              <TextField
                type="number"
                variant="outlined"
                label="Stock Quantity"
                fullWidth
                name="stockQuantity"
                value={productData.stockQuantity}
                onChange={handleChange}
              />
              {/* Custom-styled file input */}
              <label htmlFor="file-input" style={{ display: "block" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  <span style={{ marginRight: "8px" }}>Upload Image:</span>
                  <Button
                    component="span"
                    color={selectedFileName ? "secondary" : "primary"}
                    variant="outlined"
                  >
                    {selectedFileName ? "File Chosen" : "Choose File"}
                  </Button>

                  <span style={{ marginLeft: "8px" }}>{selectedFileName}</span>
                </div>
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  name="images"
                  style={{ display: "none" }}
                />
              </label>

              <Button type="submit" color="primary" variant="contained">
                Submit
              </Button>
            </Stack>
          </form>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductForm;
