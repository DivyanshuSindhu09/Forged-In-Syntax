import { motion } from "framer-motion";

const ProjectDetails = ({
  title,
  description,
  subDescription,
  image,
  tags,
  href,
  closeModal,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-sm bg-black/40">
      <motion.div
        className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto border shadow-sm rounded-2xl bg-gradient-to-l from-midnight to-navy border-white/10"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        
        <button
          onClick={closeModal}
          className="absolute p-2 rounded-sm top-4 right-4 bg-midnight hover:bg-gray-600"
        >
          <img src="assets/close.svg" className="w-5 h-5" alt="close" />
        </button>

       
        <img
          src={image}
          alt={title}
          className="w-full object-cover rounded-t-2xl"
        />

   
        <div className="p-5 font-[absans]">
          <h5 className="mb-2 text-2xl font-bold text-white text-left">
            {title}
          </h5>
          <p className="mb-3 text-neutral-400">{description}</p>

          {subDescription.map((subDesc, index) => (
            <p
              key={index}
              className="mb-3 text-neutral-400 text-sm sm:text-base"
            >
              {subDesc}
            </p>
          ))}

         
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 gap-4">
            <div className="flex gap-3 flex-wrap">
              {tags.map((tag) => (
                <img
                  key={tag.id}
                  src={tag.path}
                  alt={tag.name}
                  className="rounded-lg size-10 hover:scale-110 transition"
                />
              ))}
            </div>

            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-white font-medium hover:underline"
            >
              View Project
              <img src="assets/arrow-up.svg" className="w-4 h-4" alt="view" />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetails;
