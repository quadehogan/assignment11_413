import { useState } from "react";
import type { Book } from "../types/Book";
import { updateBook } from "../api/ProjectAPICalls";
import "./BookForm.css";

interface UpdateBookFormProps {
    book: Book;
    onSuccess: () => void;
    onCancel: () => void;
}

const UpdateBookForm = ({ book, onSuccess, onCancel }: UpdateBookFormProps) => {

    const [formData, setFormData] = useState<Book>({ ...book });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await updateBook(formData.bookID, formData);
        onSuccess();
    };

    return (
        <div className="modal show d-block book-form-modal" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Book</h5>
                        <button type="button" className="btn-close" onClick={onCancel} />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="book-form-fields">
                                <div className="mb-3 full-width">
                                    <label className="form-label">Title</label>
                                    <input className="form-control" type="text" name="title" value={formData.title} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Author</label>
                                    <input className="form-control" type="text" name="author" value={formData.author} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Category</label>
                                    <input className="form-control" type="text" name="category" value={formData.category} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Publisher</label>
                                    <input className="form-control" type="text" name="publisher" value={formData.publisher} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">ISBN</label>
                                    <input className="form-control" type="text" name="isbn" value={formData.isbn} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Classification</label>
                                    <input className="form-control" type="text" name="classification" value={formData.classification} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Page Count</label>
                                    <input className="form-control" type="number" name="pageCount" value={formData.pageCount} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Price</label>
                                    <input className="form-control" type="number" name="price" step="0.01" value={formData.price} onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
                            <button type="submit" className="btn btn-primary">Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateBookForm;
