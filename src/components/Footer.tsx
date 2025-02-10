const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] p-8 text-white text-center">
      <div className="flex justify-center space-x-4 mt-4">
        <a
          href="https://www.linkedin.com/in/migueljlopez02/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-8 h-8 border-2 border-white text-white font-bold lowercase transition-all duration-300 hover:bg-white hover:text-black"
        >
          in
        </a>

        <a
          href="https://github.com/Miguel1357"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-8 h-8 border-2 border-white text-white font-bold lowercase transition-all duration-300 hover:bg-white hover:text-black"
        >
          git
        </a>
      </div>

      <p className="mt-4">© 2025 Miguel Lopez. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
