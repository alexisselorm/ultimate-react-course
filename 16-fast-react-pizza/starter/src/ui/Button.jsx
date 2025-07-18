import { Link } from "react-router-dom";

const Button = ({children, disabled,to, type,onClick}) => {

  const base="inline-block text-sm font-semibold tracking-wide uppercase transition-colors duration-300 bg-yellow-400 rounded-full focus:outline-none focus:ring focus:ring-yellow-300 focus:bg-yellow-300 focus:ring-offset-2 hover:bg-yellow-300 text-stone-800 disabled:cursor-not-allowed"
  
  const styles={
  primary:base  +' px-4 py-3 md:px-6 md:py-4',
  small:base+' px-4 py-2 md:px-5 md:py-2.5 text-xs',
  round: base+' px-2.5 py-1 md:px-3.5 md:py-2 text-sm',
  secondary:"inline-block text-sm font-semibold tracking-wide border-2 border-stone-300 uppercase transition-colors duration-300 bg-transparent rounded-full focus:outline-none focus:ring focus:ring-stone-200 focus:bg-stone-300 focus:ring-offset-2 hover:bg-stone-300 text-stone-400 hover:text-stone-800 disabled:cursor-not-allowed px-4 py-2.5 md:px-6 md:py-3.5"
  }

  if (to) {
    return <Link className={styles[type]} to={to}>{children}</Link>
  }

  if(onClick){
     return (
    <button onClick={onClick} className={styles[type]} disabled={disabled} >
      {children}
    </button>
  );
  }

  return (
    <button className={styles[type]} disabled={disabled} >
      {children}
    </button>
  );
};

export default Button;