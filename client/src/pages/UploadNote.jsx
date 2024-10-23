import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useFeedContext } from '../contexts/FeedContext'

const UploadNote = () => {

    const [file, setFile] = useState("")
    const [title, setTitle] = useState("")
    const [code, setCode] = useState("")
    const [description, setDescription] = useState("")
    const [name, setName] = useState("")
    const [isUploaded, setIsUploaded] = useState(false)

    const navigate = useNavigate()
    const {setFeed} = useFeedContext()

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title);
      formData.append("code", code);
      formData.append("description", description);
      formData.append("name", name);
  
      fetch(`${import.meta.env.VITE_SERVER_URL}/api/notes/upload-pdf`, {
          credentials: "include",
          method: "POST",
          body: formData
      })
      .then(res => res.json())
      .then((data) => {
          if (data.success) {
              fetch(`${import.meta.env.VITE_SERVER_URL}/api/notes`).then((res) => res.json()).then((data) => setFeed(data));
              setIsUploaded(true);
              toast.success("File uploaded successfully");
              navigate("/");  // Redirect to home page here
          } else {
              // Handle upload failure if necessary
              console.error("Upload failed:", data.message);
          }
      })
      .catch((error) => {
          console.error("Error uploading file:", error);
      });
  }
  
  return (
        <div className="bg-[#F3F2F0] px-6 sm:px-20 lg:px-40 py-6 sm:py-10 flex flex-col items-center justify-center mx-auto rounded-md">
          <div className="text-[#004182] text-3xl text-center font-semibold mt-10">
            Upload Notes
          </div>
          <form onSubmit={handleSubmit} className="border-stone-800 p-10 flex flex-col gap-2 ">
            <div className="flex flex-col md:flex-row justify-between gap-2">
              <div>
                <input
                  id="title"
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title of the post *"
                  className="w-full bg-[#F3F2F0] h-10 border border-gray-700 rounded-md p-2"
                />
              </div>
              <div>
                <input
                  id="code"
                  type="text"
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Course code *"
                  className="w-full bg-[#F3F2F0] h-10 border border-gray-700 rounded-md p-2"
                />
              </div>
              <div>
                <input
                  id="subject"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Subject name *"
                  className="w-full bg-[#F3F2F0] h-10 border border-gray-700 rounded-md p-2"
                />
              </div>
            </div>
            <div className="w-full ">
              <textarea
                id="description"
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description *"
                rows={6}
                className="w-full bg-[#F3F2F0] border border-gray-700 rounded-md  h-fit min-h-40 p-2"
              />
            </div>
            <div>
              <input
                id="file"
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                accept='application/pdf'
                placeholder="Choose your file"
                className="w-full bg-[#F3F2F0] h-10 border border-gray-700 rounded-md cursor-pointer "
              />
            </div>
            <div className="flex justify-center ">
              <button className="bg-sky-600 text-white p-2 rounded-md w-[100%] ">
                Submit
              </button>
            </div>
          </form>
        </div>
  )
}

export default UploadNote