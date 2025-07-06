import { Link } from "react-router-dom";

const Button = ({children, disabled,to}) => {
  const className="inline-block px-4 py-3 font-semibold tracking-wide uppercase transition-colors duration-300 bg-yellow-400 rounded-full focus:outline-none focus:ring focus:ring-yellow-300 focus:bg-yellow-300 focus:ring-offset-2 hover:bg-yellow-300 text-stone-800 disabled:cursor-not-allowed sm:px-6 sm:py-4"
  if (to) {
    return <Link className={className} to={to}>{children}</Link>
  }

  return (
    <button className={className} disabled={disabled} >
      {children}
    </button>
  );
};

export default Button;