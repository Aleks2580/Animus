import React, { useState, Suspense } from "react";
import { supabase } from "../../supabaseClient";
import { Form, Input, Button, Checkbox, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import styles from "./AddProduct.module.css";

// Lazy-load ReactQuill
const ReactQuill = React.lazy(() => import("react-quill"));
import "react-quill/dist/quill.snow.css";

const quillModules = {
  toolbar: [
    [{ header: [3, 4, false] }],
    ["bold"],
    [{ list: "bullet" }],
    ["link"],
    ["clean"],
  ],
};

const quillFormats = [
  "header",
  "bold",
  "list",
  "bullet",
  "link",
];

export default function AddProduct() {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  // English fields
  const [subnameEn, setSubnameEn] = useState("");
  const [priceEn, setPriceEn] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [dosageEn, setDosageEn] = useState("");
  const [researchEn, setResearchEn] = useState("");

  // Chinese fields
  const [subnameZh, setSubnameZh] = useState("");
  const [priceZh, setPriceZh] = useState("");
  const [descriptionZh, setDescriptionZh] = useState("");
  const [dosageZh, setDosageZh] = useState("");
  const [researchZh, setResearchZh] = useState("");

  // Single shared "name"
  // (We’ll handle the input with antd Form for that one.)
  
  // Handle file selection
  const handleFileChange = (info) => {
    const uploadedFile = info.file.originFileObj;
    setFile(uploadedFile);
  };

  // Upload image to storage
  const uploadImageToStorage = async (file) => {
    const filePath = `products/${Date.now()}-${file.name}`;
    console.log("Generated file path:", filePath);

    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from("sapientropic")
      .upload(filePath, file);

    if (uploadError) {
      throw new Error("Failed to upload image: " + uploadError.message);
    }

    const { data: publicData, error: urlError } = supabase
      .storage
      .from("sapientropic")
      .getPublicUrl(filePath);

    if (urlError) {
      throw new Error("Failed to retrieve public URL: " + urlError.message);
    }

    console.log("Public URL:", publicData.publicUrl);
    return publicData.publicUrl;
  };

  // Handle form submission
  // We'll use antd's <Form> for "name" and "instock". 
  // For subnames/prices, we're using normal <Input> outside the Form, or 
  // we could do them inside the Form with "onChange" manually. 
  // For clarity, let's do them as separate inputs with onChange.
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      let imageUrl = "";
      // If user selected a file, upload it, otherwise empty string
      if (file) {
        imageUrl = await uploadImageToStorage(file);
      }

      // Insert 2 rows:
      // 1) English row
      // 2) Chinese row
      const { data: insertData, error: insertError } = await supabase
        .from("Products")
        .insert([
          {
            // Shared fields
            name: values.name,       // from antd <Form.Item>
            image: imageUrl,         // same for both
            instock: values.instock || false,

            // English-specific
            language: "en-US",
            subname: subnameEn,
            price: priceEn,
            description: descriptionEn,
            dosage: dosageEn,
            research: researchEn,
          },
          {
            // Shared fields
            name: values.name,      
            image: imageUrl,
            instock: values.instock || false,

            // Chinese-specific
            language: "zh-CN",
            subname: subnameZh,
            price: priceZh,
            description: descriptionZh,
            dosage: dosageZh,
            research: researchZh,
          },
        ]);

      if (insertError) {
        throw new Error("Failed to insert products: " + insertError.message);
      }

      console.log("Inserted data:", insertData);
      message.success("Two rows (EN + ZH) added successfully!");

      // Reset everything
      setFile(null);
      setSubnameEn("");
      setPriceEn("");
      setDescriptionEn("");
      setDosageEn("");
      setResearchEn("");
      setSubnameZh("");
      setPriceZh("");
      setDescriptionZh("");
      setDosageZh("");
      setResearchZh("");
    } catch (err) {
      console.error("Submission error:", err.message);
      message.error("Failed to add products!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.adminForm}>
      <h2>Add Product - Same Name & Image, Different Fields for EN & ZH</h2>

      {/* antd Form for "name" and "instock" */}
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          className={styles.formItem}
          label="Product Name (Shared)"
          name="name"
          rules={[{ required: true, message: "Product name is required!" }]}
        >
          <Input placeholder="Enter product name" />
        </Form.Item>

        <Form.Item
          className={styles.formItem}
          label="In Stock (Shared)"
          name="instock"
          valuePropName="checked"
        >
          <Checkbox>In Stock</Checkbox>
        </Form.Item>

        <Form.Item className={styles.formItem} label="Image (Shared)">
          <Upload
            maxCount={1}
            accept="image/*"
            customRequest={({ onSuccess }) => setTimeout(() => onSuccess("ok"), 0)}
            onChange={handleFileChange}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        <h3>English Fields</h3>
        <div style={{ marginBottom: 20 }}>
          <label>Subname (EN):</label>
          <Input
            placeholder="Enter subname (English)"
            value={subnameEn}
            onChange={(e) => setSubnameEn(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label>Price (EN):</label>
          <Input
            placeholder="Enter price (English)"
            value={priceEn}
            onChange={(e) => setPriceEn(e.target.value)}
          />
        </div>

        <Form.Item className={styles.formItem} label="Description (EN)">
          <Suspense fallback={<p>Loading editor...</p>}>
            <ReactQuill
              value={descriptionEn}
              onChange={setDescriptionEn}
              modules={quillModules}
              formats={quillFormats}
            />
          </Suspense>
        </Form.Item>
        <Form.Item className={styles.formItem} label="Dosage (EN)">
          <Suspense fallback={<p>Loading editor...</p>}>
            <ReactQuill
              value={dosageEn}
              onChange={setDosageEn}
              modules={quillModules}
              formats={quillFormats}
            />
          </Suspense>
        </Form.Item>
        <Form.Item className={styles.formItem} label="Research (EN)">
          <Suspense fallback={<p>Loading editor...</p>}>
            <ReactQuill
              value={researchEn}
              onChange={setResearchEn}
              modules={quillModules}
              formats={quillFormats}
            />
          </Suspense>
        </Form.Item>

        <h3>Chinese Fields</h3>
        <div style={{ marginBottom: 20 }}>
          <label>Subname (ZH):</label>
          <Input
            placeholder="Enter subname (Chinese)"
            value={subnameZh}
            onChange={(e) => setSubnameZh(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label>Price (ZH):</label>
          <Input
            placeholder="Enter price (Chinese)"
            value={priceZh}
            onChange={(e) => setPriceZh(e.target.value)}
          />
        </div>

        <Form.Item className={styles.formItem} label="Description (ZH)">
          <Suspense fallback={<p>Loading editor...</p>}>
            <ReactQuill
              value={descriptionZh}
              onChange={setDescriptionZh}
              modules={quillModules}
              formats={quillFormats}
            />
          </Suspense>
        </Form.Item>
        <Form.Item className={styles.formItem} label="Dosage (ZH)">
          <Suspense fallback={<p>Loading editor...</p>}>
            <ReactQuill
              value={dosageZh}
              onChange={setDosageZh}
              modules={quillModules}
              formats={quillFormats}
            />
          </Suspense>
        </Form.Item>
        <Form.Item className={styles.formItem} label="Research (ZH)">
          <Suspense fallback={<p>Loading editor...</p>}>
            <ReactQuill
              value={researchZh}
              onChange={setResearchZh}
              modules={quillModules}
              formats={quillFormats}
            />
          </Suspense>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={styles.submitButton}
            loading={loading}
          >
            Add product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
