import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom'

import {
  fetchImage,
  updateImage,
  updateImageTitle,
  uploadImage,
  deleteImage
} from "../redux/userThunk";

import { useDrop, useDrag } from "react-dnd";
import { Logout } from "../redux/userSlice";

const ItemTypes = {
  IMAGE: "image",
};

function Home() {
  const [userImages, setUserImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [titles, setTitles] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newImageFiles, setNewImageFiles] = useState({});
  const navigate=useNavigate()

  const userData = useSelector((state) => state.user.data);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserImages = async () => {
      try {
        const response = await dispatch(fetchImage(userData._id));
        setUserImages(
          Array.isArray(response.payload.fetch) ? response.payload.fetch : []
        );
      } catch (error) {
        console.error("Error fetching user images:", error);
        setUserImages([]);
      }
    };

    fetchUserImages();
  }, [dispatch, userData._id]);

  const handleFileChange = (event) => {
    setSelectedFiles(Array.from(event.target.files));
  };

  const handleTitleChange = (index, title) => {
    setTitles((prev) => ({ ...prev, [index]: title }));
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;
    setIsUploading(true);

    const uploadPromises = selectedFiles.map(async (file, index) => {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("id", userData._id);
      formData.append("title", titles[index] || "Untitled");

      try {
        const response = await dispatch(uploadImage({ formData }));
        return response.payload;
      } catch (error) {
        console.error("Error uploading image:", error);
        return null;
      }
    });

    await Promise.all(uploadPromises);
    setSelectedFiles([]);
    setTitles({});

    const userImagesResponse = await dispatch(fetchImage(userData._id));
    setUserImages(
      Array.isArray(userImagesResponse.payload.fetch)
        ? userImagesResponse.payload.fetch
        : []
    );
    setIsUploading(false);
  };

  const handleEditTitle = (index) => {
    setEditingIndex(index);
    setNewTitle(userImages[index].title || "");
  };

  const handleSaveTitle = async (index) => {
    const updatedImages = [...userImages];
    updatedImages[index].title = newTitle;

    try {
      await dispatch(
        updateImageTitle({ id: userImages[index]._id, title: newTitle })
      );

      if (newImageFiles[userImages[index]._id]) {
        const formData = new FormData();
        formData.append("image", newImageFiles[userImages[index]._id]);
        formData.append("id", userImages[index]._id);

        const response = await dispatch(updateImage({ formData }));

        if (response.payload && response.payload.imagePath) {
          updatedImages[index].imagePath = response.payload.imagePath;
        }
      }

      setUserImages(updatedImages);
    } catch (error) {
      console.error("Error updating title or image:", error);
    }

    setEditingIndex(null);
    setNewTitle("");
    setNewImageFiles((prev) => ({ ...prev, [userImages[index]._id]: null }));
  };

  const handleChangeImage = async (event, id) => {
    const file = event.target.files[0];
    if (file) {
      setNewImageFiles((prev) => ({ ...prev, [id]: file }));

      const formData = new FormData();
      formData.append("image", file);
      formData.append("id", id);

      try {
        const response = await dispatch(updateImage({ formData }));
        if (response.payload && response.payload.imagePath) {
          setUserImages((prevImages) =>
            prevImages.map((img) =>
              img._id === id
                ? { ...img, imagePath: response.payload.imagePath }
                : img
            )
          );
        }
      } catch (error) {
        console.error("Error updating image:", error);
      }
    }
  };

  const handleDeleteImage = async (id) => {
    try {
      await dispatch(deleteImage({id:id}));
      setUserImages((prevImages) =>
        prevImages.filter((img) => img._id !== id)
      );
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const moveImage = (draggedIndex, targetIndex) => {
    const updatedImages = [...userImages];
    const [movedImage] = updatedImages.splice(draggedIndex, 1);
    updatedImages.splice(targetIndex, 0, movedImage);
    setUserImages(updatedImages);
  };

  const handleLogout = () => {
    dispatch(Logout()); // Dispatch the logout action
    // Redirect to login page if needed
    navigate('/')
  };

  return (
    <div className="p-8 font-sans">
      <button
          onClick={handleLogout}
          className="px-4 py-2 bg-slate-800 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Logout
        </button>
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">
          My Image Collection
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          View and manage your uploaded images.
        </p>
        
        <div className="mt-6">
          <input
            type="file"
            id="upload"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            htmlFor="upload"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Select Images
          </label>
        </div>
      </header>

      {selectedFiles.length > 0 && (
        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Add Titles for Selected Images
          </h2>
          <div className="flex flex-col gap-4">
            {selectedFiles.map((file, index) => (
              <div key={index} className="flex items-center gap-4">
                <img
                  src={URL.createObjectURL(file)}
                  alt="Selected"
                  className="w-16 h-16 object-cover rounded"
                />
                <input
                  type="text"
                  placeholder="Enter title"
                  value={titles[index] || ""}
                  onChange={(e) => handleTitleChange(index, e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>
          <button
            onClick={handleUpload}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Upload Images"}
          </button>
        </section>
      )}

      <section className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {userImages.map((image, index) => (
          <ImageItem
            key={image._id}
            image={image}
            index={index}
            moveImage={moveImage}
            editingIndex={editingIndex}
            handleEditTitle={handleEditTitle}
            handleSaveTitle={handleSaveTitle}
            handleDeleteImage={handleDeleteImage}
            newImageFiles={newImageFiles}
            handleChangeImage={handleChangeImage}
            newTitle={newTitle}
            setNewTitle={setNewTitle}
          />
        ))}
      </section>
    </div>
  );
}

export default Home;

// Separate ImageItem Component
function ImageItem({
  image,
  index,
  moveImage,
  editingIndex,
  handleEditTitle,
  handleSaveTitle,
  handleDeleteImage,
  newImageFiles,
  handleChangeImage,
  newTitle,
  setNewTitle,
}) {
  const [{ isDragging }, dragRef] = useDrag({
    type: ItemTypes.IMAGE,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: ItemTypes.IMAGE,
    hover: (item) => {
      if (item.index !== index) {
        moveImage(item.index, index);
        item.index = index;
      }
    },
  });

  const combinedRef = (node) => {
    dragRef(node);
    dropRef(node);
  };

  const handleInputChange = (e) => setNewTitle(e.target.value);

  return (
    <div
      ref={combinedRef}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
      className="relative border rounded-lg overflow-hidden shadow-lg"
    >
      <img
        src={image.imagePath}
        alt={image.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        {editingIndex === index ? (
          <>
            <input
              type="text"
              value={newTitle}
              onChange={handleInputChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => handleSaveTitle(index)}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save Title
            </button>
          </>
        ) : (
          <>
            <h3 className="text-xl font-bold">{image.title}</h3>
            <button
              onClick={() => handleEditTitle(index)}
              className="mt-2 px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              Edit Title
            </button>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => handleChangeImage(event, image._id)}
              className="mt-2"
            />
            <button
              onClick={() => handleDeleteImage(image._id)}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Delete Image
            </button>
          </>
        )}
      </div>
    </div>
  );
}
