import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const AddProduct = () => {
    const [categories, setCategories] = useState([]);
    const [images, setImages] = useState([]);
    const [preview, setPreview] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        category: "",
        subCategory: "",
        description: "",
        price: "",
        discountPrice: "",
        stock: "",
        inStock: true,
        isFeatured: false,
        sizes: [],
        colors: "",
        material: "",
        fitType: "",
        gender: "",
        careInstructions: "",
        tags: "",
        thumbnail: "",
    });

    useEffect(() => {
        // Fetch categories from server
        fetch("http://localhost:5000/api/categories")
            .then((res) => res.json())
            .then((data) => setCategories(data))
            .catch((err) => console.error(err));
    }, []);

    // handle text input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // handle checkbox (sizes)
    const handleSizeChange = (size) => {
        setFormData((prev) => {
            const sizes = prev.sizes.includes(size)
                ? prev.sizes.filter((s) => s !== size)
                : [...prev.sizes, size];
            return { ...prev, sizes };
        });
    };

    // handle multiple image upload + preview
    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const urls = files.map((file) => URL.createObjectURL(file));
        setImages(files);
        setPreview(urls);
    };

    const removeImage = (index) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
        setPreview((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Product Data:", formData);
        console.log("Images:", images);
    };

    const sizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

    return (
        <div className="w-full p-6">
            <Card className="w-full shadow-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Add New Product</CardTitle>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Product Info */}
                        <div className="grid md:grid-cols-3 gap-4">
                            <div>
                                <Label>Name</Label>
                                <Input name="name" value={formData.name} onChange={handleChange} required />
                            </div>
                            <div>
                                <Label>Slug</Label>
                                <Input name="slug" value={formData.slug} onChange={handleChange} />
                            </div>
                            <div className="w-full border">
                                <Label>Category</Label>
                                <Select onValueChange={(value) => setFormData({ ...formData, category: value })} >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((cat) => (
                                            <SelectItem key={cat._id} value={cat.name}>
                                                {cat.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                        </div>

                        {/* Price & Stock */}
                        <div className="grid md:grid-cols-3 gap-4">
                            <div>
                                <Label>Subcategory</Label>
                                <Input name="subCategory" value={formData.subCategory} onChange={handleChange} />
                            </div>
                            <div>
                                <Label>Price</Label>
                                <Input type="number" name="price" value={formData.price} onChange={handleChange} />
                            </div>
                            <div>
                                <Label>Discount Price</Label>
                                <Input
                                    type="number"
                                    name="discountPrice"
                                    value={formData.discountPrice}
                                    onChange={handleChange}
                                />
                            </div>

                        </div>

                        {/* Sizes */}
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <Label>Available Sizes</Label>
                                <div className="flex flex-wrap gap-4 mt-2">
                                    {sizes.map((size) => (
                                        <div key={size} className="flex items-center space-x-2">
                                            <Checkbox
                                                checked={formData.sizes.includes(size)}
                                                onCheckedChange={() => handleSizeChange(size)}
                                            />
                                            <span>{size}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <Label>Stock</Label>
                                <Input type="number" name="stock" value={formData.stock} onChange={handleChange} />
                            </div>
                            {/* Colors */}
                            <div>
                                <Label>Colors (comma separated)</Label>
                                <Input name="colors" value={formData.colors} onChange={handleChange} />
                            </div>
                        </div>



                        {/* Description */}
                        <div>
                            <Label>Description</Label>
                            <Textarea
                                name="description"
                                rows="4"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Images */}
                        <div>
                            <Label>Product Images</Label>
                            <Input type="file" multiple accept="image/*" onChange={handleImageUpload} />
                            <div className="flex flex-wrap gap-3 mt-3">
                                {preview.map((img, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={img}
                                            alt="preview"
                                            className="w-24 h-24 object-cover rounded-md border"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Submit */}
                        <Button type="submit" className="w-full">
                            Add Product
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default AddProduct;
