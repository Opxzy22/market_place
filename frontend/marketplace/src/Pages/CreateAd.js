import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/createAd.css';
import FileUploader from '../Components/dropZone';
import { useDropzone } from 'react-dropzone';

function ProductForm() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [selectedSubsubcategory, setSelectedSubsubcategory] = useState('');
  const [selectedSubsubsubcategory, setSelectedSubsubsubcategory] = useState('');
  const [subcategories, setSubcategories] = useState([]);
  const [subsubcategories, setSubsubcategories] = useState([]);
  const [subsubsubcategories, setSubsubsubcategories] = useState([]);
  const [subsubsubsubcategories, setSubsubsubsubcategories] = useState([]);
  const [subsubsubsubcategoriesVisible, setSubsubsubsubcategoriesVisible] = useState(false);
  const [selectedSubsubsubsubcategory, setSelectedSubsubsubsubcategory] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [images, setImages] = useState('');
  const [errors, setErrors] = useState({
    category: false,
    subcategory: false,
    subsubcategory: false
  });

  const user_id = localStorage.getItem('user_id');

  useEffect(() => {
    // Fetch categories dropdown options on component mount
    axios.post('http://127.0.0.1:8000/category/dropdown-options/')
      .then(response => {
        setCategories(response.data.categories);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleCategoryChange = async (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory(''); // Reset subcategory when category changes
    setSelectedSubsubcategory(''); // Reset sub-subcategory when category changes
    setSelectedSubsubsubcategory(''); // Reset sub-sub-subcategory when category changes
    setSuccessMessage('');
    setErrors({...errors, subcategory: false, subsubcategory: false});
    
    try {
      // Fetch subcategories for the selected category
      const formData = new FormData();
      formData.append('parent_id', categoryId);
      const response = await axios.post('http://127.0.0.1:8000/category/subcategories/', formData);
      
      // Update subcategories state
      setSubcategories(response.data.subcategories);
      // Reset subsubcategories state
      setSubsubcategories([]);
      // Reset subsubsubcategories state
      setSubsubsubcategories([]);
      // Reset subsubsubsubcategories state
      setSubsubsubsubcategories([]);
      // Hide subsubsubsubcategories dropdown
      setSubsubsubsubcategoriesVisible(false);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  const handleSubcategoryChange = async (subcategoryId) => {
    setSelectedSubcategory(subcategoryId);
    setSelectedSubsubcategory(''); // Reset sub-subcategory when subcategory changes
    setSelectedSubsubsubcategory(''); // Reset sub-sub-subcategory when subcategory changes
    
    try {
      // Fetch subsubcategories for the selected subcategory
      const formData = new FormData();
      formData.append('parent_id', subcategoryId);
      const response = await axios.post('http://127.0.0.1:8000/category/subcategories/', formData);
      
      // Update subsubcategories state
      setSubsubcategories(response.data.subcategories);
      // Reset subsubsubcategories state
      setSubsubsubcategories([]);
      // Reset subsubsubsubcategories state
      setSubsubsubsubcategories([]);
      // Hide subsubsubsubcategories dropdown
      setSubsubsubsubcategoriesVisible(false);
    } catch (error) {
      console.error('Error fetching subsubcategories:', error);
    }
  };

  const handleSubsubcategoryChange = async (subSubcategoryId) => {
    setSelectedSubsubcategory(subSubcategoryId);
    setSelectedSubsubsubcategory(''); // Reset sub-sub-subcategory when subsubcategory changes
    
    try {
      // Fetch subsubsubcategories for the selected subsubcategory
      const formData = new FormData();
      formData.append('parent_id', subSubcategoryId);
      const response = await axios.post('http://127.0.0.1:8000/category/subcategories/', formData);
      
      // Update subsubsubcategories state
      setSubsubsubcategories(response.data.subcategories);
      // Reset subsubsubsubcategories state
      setSubsubsubsubcategories([]);
      // Hide subsubsubsubcategories dropdown
      setSubsubsubsubcategoriesVisible(false);
    } catch (error) {
      console.error('Error fetching subsubsubcategories:', error);
    }
  };

  const handleSubsubsubcategoryChange = async (subSubSubcategoryId) => {
    setSelectedSubsubsubcategory(subSubSubcategoryId);
    
    try {
      // Fetch subsubsubsubcategories for the selected subsubsubcategory
      const formData = new FormData();
      formData.append('parent_id', subSubSubcategoryId);
      const response = await axios.post('http://127.0.0.1:8000/category/subcategories/', formData);
      
      // Update subsubsubsubcategories state
      setSubsubsubsubcategories(response.data.subcategories);
      // Show subsubsubsubcategories dropdown if there are subsubsubsubcategories
      setSubsubsubsubcategoriesVisible(response.data.subcategories.length > 0);
    } catch (error) {
      console.error('Error fetching subsubsubsubcategories:', error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setImage(acceptedFiles[0]); // Assuming you only want to use the first selected file
    }
  });

  const handleFileChange =  (selectedFiles) => {
    setImages(selectedFiles);
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Check if all necessary dropdowns have been selected
    if (!selectedCategory || selectedCategory === '') {
      setErrors({...errors, category: true});
      return;
    }
    if ((!selectedSubcategory || selectedSubcategory === '') && subcategories.length > 0) {
      setErrors({...errors, subcategory: true});
      return;
    }
    if ((!selectedSubsubcategory || selectedSubsubcategory === '') && subsubcategories.length > 0) {
      setErrors({...errors, subsubcategory: true});
      return;
    }

    if ((!selectedSubsubsubcategory || selectedSubsubsubcategory === '') && subsubsubcategories.length > 0) {
      setErrors({...errors, subsubcategory: true});
      return;
    }

    if ((!selectedSubsubsubsubcategory || selectedSubsubsubsubcategory === '') && subsubsubsubcategories.length > 0) {
      setErrors({...errors, subsubcategory: true});
      return;
    }
  

    // Construct form data
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('user_id', user_id);
    formData.append('images', images);
     // Append image file to FormData
    if (image) {
      formData.append('display_image', image);
  }
  if (images && images.length > 0) {
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]); // Append each image file
    }
  }

    // Determine the category ID based on the selected dropdowns
    let categoryId = selectedSubsubsubsubcategory;
    if (!categoryId) categoryId = selectedSubsubsubcategory;
    if (!categoryId) categoryId = selectedSubsubcategory;
    if (!categoryId) categoryId = selectedSubcategory;

    formData.append('category_id', categoryId);

    // Submit form data
    try {
      const response = await axios.post('http://127.0.0.1:8000/create-product/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });
      console.log('Product created successfully:', response.data);
      setSuccessMessage('Product created successfully');
    } catch (error) {
      console.error('Error creating product:', error);
    }
    console.log(images)
  };

  return (
    <div className="product-form-container">
      <form onSubmit={handleFormSubmit} className="product-form">
        {/* Category dropdown */}
        <div className="form-group">
          <select className="form-control" value={selectedCategory} onChange={(e) => handleCategoryChange(e.target.value)}>
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
          {errors.category && <span className="error-message">Please select a category</span>}
        </div>
  
        {/* Subcategory dropdown */}
        {selectedCategory && (
          <div className="form-group">
            <select className="form-control" value={selectedSubcategory} onChange={(e) => handleSubcategoryChange(e.target.value)} disabled={subcategories.length === 0}>
              <option value="">Select a subcategory</option>
              {subcategories.map(subcategory => (
                <option key={subcategory.id} value={subcategory.id}>{subcategory.name}</option>
              ))}
            </select>
            {errors.subcategory && <span className="error-message">Please select a subcategory</span>}
          </div>
        )}
  
        {/* Sub-subcategory dropdown */}
        {selectedSubcategory && (
          <div className="form-group">
            <select className="form-control" value={selectedSubsubcategory} onChange={(e) => handleSubsubcategoryChange(e.target.value)} disabled={subsubcategories.length === 0}>
              <option value="">Select a sub-subcategory</option>
              {subsubcategories.map(subsubcategory => (
                <option key={subsubcategory.id} value={subsubcategory.id}>{subsubcategory.name}</option>
              ))}
            </select>
            {errors.subsubcategory && <span className="error-message">Please select a sub-subcategory</span>}
          </div>
        )}
  
        {/* Sub-sub-subcategory dropdown */}
        {selectedSubsubcategory && (
          <div className="form-group">
            <select className="form-control" value={selectedSubsubsubcategory} onChange={(e) => handleSubsubsubcategoryChange(e.target.value)} disabled={subsubsubcategories.length === 0}>
              <option value="">Select a sub-sub-subcategory</option>
              {subsubsubcategories.map(subsubsubcategory => (
                <option key={subsubsubcategory.id} value={subsubsubcategory.id}>{subsubsubcategory.name}</option>
              ))}
            </select>
          </div>
        )}
  
        {/* Sub-sub-sub-subcategory dropdown */}
        {subsubsubsubcategoriesVisible && (
          <div className="form-group">
            <select className="form-control" value={selectedSubsubsubsubcategory} onChange={(e) => setSelectedSubsubsubsubcategory(e.target.value)}>
              <option value="">Select a sub-sub-sub-subcategory</option>
              {subsubsubsubcategories.map(subsubsubsubcategory => (
                <option key={subsubsubsubcategory.id} value={subsubsubsubcategory.id}>{subsubsubsubcategory.name}</option>
              ))}
            </select>
          </div>
        )}
  
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Input title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div className='img-select'>
          <div {...getRootProps({ className: 'drop-zone-image' })}>
            <input {...getInputProps()} className="form-control-file" />
            <p>+</p>
          </div>
          {image && (
            <img src={URL.createObjectURL(image)} className="image-item" alt="select" />
          )}
          </div>
        
        <FileUploader handleFileChange={handleFileChange} />
  
        <div className="form-group">
          <button type="submit" className="create-ad-submit">Submit</button>
        </div>
      </form>
      {/* Display success message if product is created successfully */}
      {successMessage && <div className="success-message">{successMessage}</div>}
    </div>
  );
}

export default ProductForm;
