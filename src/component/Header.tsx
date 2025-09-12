import kmitlLogo from "../assets/images/Logo/kmitl_logo.png"

const Header = () => {
  return (
    <header className="w-[1080px] h-[100px] mx-auto px-[25px] py-[18px] flex items-center justify-between bg-white shadow-sm rounded-2xl">
      <div className="flex items-center space-x-2">
        <img
          src={kmitlLogo}
          alt="Logo"
          className="w-[130px] h-[67px] cursor-pointer"
        />
        
      </div>
    </header>
  );
};

export default Header;
