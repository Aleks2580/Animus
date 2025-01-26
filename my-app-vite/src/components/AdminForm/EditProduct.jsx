import React, { useState, useEffect, Suspense } from "react";
import { supabase } from "../../supabaseClient";
import { Form, Input, Button, Checkbox, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import styles from "./AddProduct.module.css"; // Reuse same CSS

// Lazy-load ReactQuill
const ReactQuill = React.lazy(() => import("react-quill"));
import "react-quill/dist/quill.snow.css";

// Same Quill configs
const quillModules = {
  toolbar: [
    [{ header: [3, 4, false] }],
    ["bold"],
    [{ list: "bullet" }],
    ["link"],
    ["clean"],
  ],
};

const quillFormats = ["header", "bold", "list", "bullet", "link"];

export default function EditProduct() {
  // 1) State to handle searching by product name
  const [searchName, setSearchName] = useState("");
  const [searchActive, setSearchActive] = useState(false); // has the user clicked "Search" yet?

  // 2) Once we find the product, store the name & all data
  const [productName, setProductName] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [instock, setInstock] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

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

  // =============  A) Searching logic  =============
  const handleSearch = async () => {
    if (!searchName.trim()) {
      message.warning("Please enter a product name to search.");
      return;
    }
    setLoading(true);
    try {
      // 1) Try to fetch both EN & ZH rows for that product name
      const { data, error } = await supabase
        .from("Products")
        .select("*")
        .eq("name", searchName);

      if (error) {
        throw new Error("Error fetching product: " + error.message);
      }
      if (!data || data.length === 0) {
        message.warning(`No product found with name: ${searchName}`);
        setSearchActive(false);
        return;
      }

      // We found something, so let's set up form fields
      setSearchActive(true); // Show the form
      setProductName(searchName);

      // If multiple rows exist for that name, find the EN & ZH ones
      const enRow = data.find((row) => row.language === "en-US");
      const zhRow = data.find((row) => row.language === "zh-CN");

      // We'll assume they might exist or might not
      if (enRow) {
        setInstock(!!enRow.instock);
        setImageUrl(enRow.image || "");
        setSubnameEn(enRow.subname || "");
        setPriceEn(enRow.price || "");
        setDescriptionEn(enRow.description || "");
        setDosageEn(enRow.dosage || "");
        setResearchEn(enRow.research || "");
      } else {
        // If no EN row, just reset English fields
        setInstock(false);
        setImageUrl("");
        setSubnameEn("");
        setPriceEn("");
        setDescriptionEn("");
        setDosageEn("");
        setResearchEn("");
      }

      if (zhRow) {
        setSubnameZh(zhRow.subname || "");
        setPriceZh(zhRow.price || "");
        setDescriptionZh(zhRow.description || "");
        setDosageZh(zhRow.dosage || "");
        setResearchZh(zhRow.research || "");
      } else {
        // If no ZH row, reset Chinese fields
        setSubnameZh("");
        setPriceZh("");
        setDescriptionZh("");
        setDosageZh("");
        setResearchZh("");
      }

      message.success(`Loaded product: ${searchName}`);
    } catch (err) {
      message.error("Search failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // =============  B) Upload logic  =============
  const handleFileChange = (info) => {
    const uploadedFile = info.file.originFileObj;
    setFile(uploadedFile);
  };

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

    const { data: publicData, error: urlError } = await supabase
      .storage
      .from("sapientropic")
      .getPublicUrl(filePath);

    if (urlError) {
      throw new Error("Failed to retrieve public URL: " + urlError.message);
    }

    return publicData.publicUrl;
  };

  // =============  C) Updating logic  =============
  // We'll "upsert" the two rows for that product name
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // If user provided new file, upload it
      let finalImageUrl = imageUrl;
      if (file) {
        finalImageUrl = await uploadImageToStorage(file);
      }

      // Upsert EN row
      await upsertRow("en-US", values.name, finalImageUrl);
      // Upsert ZH row
      await upsertRow("zh-CN", values.name, finalImageUrl);

      message.success("Product updated successfully!");
    } catch (err) {
      message.error("Update failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Helper for upserting a single row
  const upsertRow = async (language, name, imageUrl) => {
    let subnameVal, priceVal, descVal, dosageVal, researchVal;
    if (language === "en-US") {
      subnameVal = subnameEn;
      priceVal = priceEn;
      descVal = descriptionEn;
      dosageVal = dosageEn;
      researchVal = researchEn;
    } else {
      subnameVal = subnameZh;
      priceVal = priceZh;
      descVal = descriptionZh;
      dosageVal = dosageZh;
      researchVal = researchZh;
    }

    // Check if row for this language exists
    const { data: existingRows, error: selectError } = await supabase
      .from("Products")
      .select("id")
      .eq("name", name)
      .eq("language", language);

    if (selectError) {
      throw new Error("Failed to check existing row: " + selectError.message);
    }

    // If exists, update; otherwise, insert
    if (existingRows && existingRows.length > 0) {
      const rowId = existingRows[0].id;
      const { error: updateError } = await supabase
        .from("Products")
        .update({
          instock,
          image: imageUrl,
          subname: subnameVal,
          price: priceVal,
          description: descVal,
          dosage: dosageVal,
          research: researchVal,
        })
        .eq("id", rowId);

      if (updateError) {
        throw new Error("Failed to update row: " + updateError.message);
      }
    } else {
      // Insert new row
      const { error: insertError } = await supabase
        .from("Products")
        .insert([
          {
            name,
            language,
            instock,
            image: imageUrl,
            subname: subnameVal,
            price: priceVal,
            description: descVal,
            dosage: dosageVal,
            research: researchVal,
          },
        ]);

      if (insertError) {
        throw new Error("Failed to insert row: " + insertError.message);
      }
    }
  };

  // For the "Update" form, we store initialValues in antd Form:
  //   name = productName
  //   instock = instock
  return (
    <div className={styles.adminForm}>
      <h2>Edit Product - Search by Name</h2>

      {/* ============== 1) Search Section ============= */}
      <div style={{ marginBottom: 30 }}>
        <label>Product Name to Search: </label>
        <Input
          style={{ width: 200, marginRight: 10 }}
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          placeholder="Enter product name"
        />
        <Button type="primary" onClick={handleSearch} loading={loading}>
          Search
        </Button>
      </div>

      {/* ============== 2) Once found, show the Edit Form ============= */}
      {searchActive && (
        <Form
          layout="vertical"
          initialValues={{ name: productName, instock }}
          onFinish={handleSubmit}
        >
          {/* Shared fields */}
          <Form.Item
            className={styles.formItem}
            label="Product Name (Shared)"
            name="name"
            rules={[{ required: true, message: "Product name is required!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            className={styles.formItem}
            label="In Stock (Shared)"
            name="instock"
            valuePropName="checked"
          >
            <Checkbox
              checked={instock}
              onChange={(e) => setInstock(e.target.checked)}
            >
              In Stock
            </Checkbox>
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
            {imageUrl && (
              <div style={{ marginTop: 10 }}>
                <img
                  src={imageUrl}
                  alt="Current"
                  style={{ maxWidth: "150px", border: "1px solid #ccc" }}
                />
              </div>
            )}
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
              Update Product
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
}
