import { useState } from "react";
import { motion } from "framer-motion"; // 👈 corrected import
import { databases } from "../lib/appwriteConfig";
import toast from "react-hot-toast";

const RegisterModal = ({ close }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    program: "",
    university: "",
    year: "",
    skills: "",
    linkedin: "",
    xProfile: "",
    instagram: "",
  });

  const DATABASE_ID = "67d536ac003c051aa770"; 
  const COLLECTION_ID = "67d536e00038c2bc5952"; 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const applicationData = {
      full_name: formData.fullName,
      email: formData.email,
      course: formData.program,
      university: formData.university,
      year: formData.year,
      skills: formData.skills,
      linkedin: formData.linkedin,
      twitter: formData.xProfile || null,
      instagram: formData.instagram || null,
      created_at: new Date().toISOString(),
    };

    const loadingToast = toast.loading("Submitting application...");

    try {
      const response = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        "unique()",
        applicationData
      );
      console.log("Appwrite response:", response);

      toast.success("Application submitted!", { id: loadingToast });
      close();
    } catch (error) {
      console.error("Appwrite error:", error);
      toast.error("Submission failed: " + error.message, { id: loadingToast });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-start overflow-y-auto backdrop-blur-sm bg-[#000000a4] pt-10 font-[absans]">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-3xl mx-auto p-6 border rounded-2xl shadow-lg bg-[#1a1a1a] border-white/10 relative max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={close}
          className="absolute top-4 right-4 p-2 rounded hover:bg-gray-700 transition"
        >
          <img src="assets/close.svg" className="w-5 h-5" alt="Close" />
        </button>

        <h2 className="text-indigo-400 text-xl sm:text-2xl font-bold mb-6">Apply Now</h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name *"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="w-full p-3 rounded-md bg-zinc-900 border border-white/20 text-white placeholder:text-gray-400"
            required
          />

          <input
            type="email"
            placeholder="Email *"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-3 rounded-md bg-zinc-900 border border-white/20 text-white placeholder:text-gray-400"
            required
          />

          <input
            type="text"
            placeholder="Program * (e.g., BCA / B.Tech Computer Science)"
            value={formData.program}
            onChange={(e) => setFormData({ ...formData, program: e.target.value })}
            className="w-full p-3 rounded-md bg-zinc-900 border border-white/20 text-white placeholder:text-gray-400"
            required
          />

          <input
            type="text"
            placeholder="University *"
            value={formData.university}
            onChange={(e) => setFormData({ ...formData, university: e.target.value })}
            className="w-full p-3 rounded-md bg-zinc-900 border border-white/20 text-white placeholder:text-gray-400"
            required
          />

          <div className="relative">
            <select
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              required
              className="w-full appearance-none p-3 rounded-md bg-zinc-900 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
            >
              <option value="" disabled>Select Year</option>
              <option value="First">First</option>
              <option value="Second">Second</option>
              <option value="Third">Third</option>
              <option value="Fourth">Fourth</option>
            </select>

            <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <textarea
            rows="3"
            placeholder="List your technical skills *"
            value={formData.skills}
            onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
            className="w-full p-3 rounded-md bg-zinc-900 border border-white/20 text-white placeholder:text-gray-400"
            required
          ></textarea>

          <input
            type="url"
            placeholder="LinkedIn Profile *"
            value={formData.linkedin}
            onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
            className="w-full p-3 rounded-md bg-zinc-900 border border-white/20 text-white placeholder:text-gray-400"
            required
          />

          <input
            type="url"
            placeholder="X Profile (Optional)"
            value={formData.xProfile}
            onChange={(e) => setFormData({ ...formData, xProfile: e.target.value })}
            className="w-full p-3 rounded-md bg-zinc-900 border border-white/20 text-white placeholder:text-gray-400"
          />

          <input
            type="url"
            placeholder="Instagram Profile (Optional)"
            value={formData.instagram}
            onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
            className="w-full p-3 rounded-md bg-zinc-900 border border-white/20 text-white placeholder:text-gray-400"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full transition"
          >
            Submit Application
          </button>

          <p className="text-sm text-gray-400 mt-2">* Required fields</p>
        </form>
      </motion.div>
    </div>
  );
};

export default RegisterModal;
