import { useState } from "react";
import ProjectDetails from "./ProjectDetails";

const Project = ({
  title,
  description,
  subDescription,
  href,
  image,
  tags,
  setPreview,
}) => {
  const [isHidden, setIsHidden] = useState(false);

  return (
    <>
      <div
        className="px-4 font-[absans] py-10 min-h-[40vh] flex flex-col sm:flex-wrap sm:flex-row sm:items-center sm:justify-center gap-6"
        onMouseEnter={() => setPreview(image)}
        onMouseLeave={() => setPreview(null)}
      >
        <div className="w-full sm:w-auto flex flex-col items-center text-center sm:items-center sm:text-left">
          
          <img
            src={image}
            alt=""
            className="w-[80%] sm:w-[50%] object-cover rounded-md"
          />

         
          <p className="text-2xl mt-4">{title}</p>

        
          <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-5 text-white text-sm w-full sm:w-auto">
            {tags.map((tag) => (
              <span key={tag.id} className="bg-gray-800 px-3 py-1 flex items-center rounded-lg">
                {tag.name}
              </span>
            ))}

            <button
              onClick={() => setIsHidden(true)}
              className="flex items-center ml-15 gap-2 bg-indigo px-3 py-2 rounded-xl hover:brightness-110 transition mt-2"
            >
              <span className="read ">Read More</span>
              <img src="assets/arrow-right.svg" className="w-4" alt="arrow" />
            </button>
          </div>
        </div>
      </div>

    
      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent h-[1px] w-full" />

      
      {isHidden && (
        <ProjectDetails
          title={title}
          description={description}
          subDescription={subDescription}
          image={image}
          tags={tags}
          href={href}
          closeModal={() => setIsHidden(false)}
        />
      )}
    </>
  );
};

export default Project;
