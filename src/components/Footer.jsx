

const Footer = () => {
  return (
    <footer className="bg-[#0f0f0f] text-gray-300 px-6 py-10 sm:px-10 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
       
        <div className="text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl font-[acma-black] font-bold text-white">
            Forged In Syntax
          </h2>
          <p className="text-sm sm:text-base mt-2 text-gray-400 font-[absans]">
            Believes in Collaborative Learning!
          </p>
        </div>

       
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 font-[absans] justify-items-center md:justify-items-start">
          <a href="https://github.com/ForgedInSyntax" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition">
            <i className="ri-github-fill text-xl"></i>
            <span className="text-sm">GitHub</span>
          </a>
          <a href="https://x.com/forgedinsyntax" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition">
            <i className="ri-twitter-x-fill text-xl"></i>
            <span className="text-sm">Twitter</span>
          </a>
          <a href="https://www.linkedin.com/company/foregedinsyntax" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition">
            <i className="ri-linkedin-box-fill text-xl"></i>
            <span className="text-sm">LinkedIn</span>
          </a>
          <a href="https://www.instagram.com/forgedinsyntax/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition">
            <i className="ri-instagram-line text-xl"></i>
            <span className="text-sm">Instagram</span>
          </a>
          <a href="https://discord.com/invite/hXZUrvwzkn" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition">
            <i className="ri-discord-line text-xl"></i>
            <span className="text-sm">Discord</span>
          </a>
          <a href="mailto:ForgedInSyntax@gmail.com" className="flex items-center gap-2 hover:text-white transition">
            <i className="ri-mail-line text-xl"></i>
            <span className="text-sm">Email</span>
          </a>
        </div>
      </div>

 
      <div className="text-sm text-gray-500 mt-10 border-t border-gray-800 pt-4 text-center font-[absans]">
        Developed by <span className="text-white font-medium">
          <a href="https://divyanshu-sindhu.forgedinsyntax.club/">@ Divyanshu Sindhu</a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
