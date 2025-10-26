import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, Edit3, Plus } from "lucide-react";

export default function Category() {
    const [categories, setCategories] = useState([]);
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({ name: "", subCategory: "", image: "" });

    const API = "http://localhost:5000/api/categories";

    const fetchData = async () => {
        const res = await fetch(API);
        const data = await res.json();
        setCategories(data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = editing ? "PUT" : "POST";
        const url = editing ? `${API}/${editing._id}` : API;
        await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        setOpen(false);
        setEditing(null);
        setForm({ name: "", subCategory: "", image: "" });
        fetchData();
    };

    const handleDelete = async (id) => {
        if (confirm("Are you sure to delete this category?")) {
            await fetch(`${API}/${id}`, { method: "DELETE" });
            fetchData();
        }
    };

    return (
        <div className="p-6">
            <Card className="w-full shadow-lg">
                <CardHeader className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Category Management</h2>
                    <Button onClick={() => setOpen(true)}><Plus className="mr-2" />Create Category</Button>
                </CardHeader>

                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>No.</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Subcategory</TableHead>
                                <TableHead>Image</TableHead>
                                <TableHead className={'text-center'}>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categories.map((cat, i) => (
                                <TableRow key={cat._id}>
                                    <TableCell>{i + 1}</TableCell>
                                    <TableCell>{cat.name}</TableCell>
                                    <TableCell>{cat.subCategory}</TableCell>
                                    <TableCell>
                                        <img src={cat.image} alt="" className="w-10 h-10 rounded-md" />
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <div className="flex justify-center  gap-2">
                                            <Button
                                                size="sm"
                                                onClick={() => {
                                                    setEditing(cat);
                                                    setForm(cat);
                                                    setOpen(true);
                                                }}
                                            >
                                                <Edit3 size={16} />
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleDelete(cat._id)}
                                            >
                                                <Trash2 size={16} />
                                            </Button>
                                        </div>
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Modal */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <h3 className="text-lg font-semibold">{editing ? "Update Category" : "Create Category"}</h3>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-3 mt-2">
                        <Input
                            placeholder="Category Name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            required
                        />
                        <Input
                            placeholder="Subcategory"
                            value={form.subCategory}
                            onChange={(e) => setForm({ ...form, subCategory: e.target.value })}
                            required
                        />
                        <Input
                            placeholder="Image URL"
                            value={form.image}
                            onChange={(e) => setForm({ ...form, image: e.target.value })}
                        />
                        <Button type="submit" className="w-full">
                            {editing ? "Update" : "Create"}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
