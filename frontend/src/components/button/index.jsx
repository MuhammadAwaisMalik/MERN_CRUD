import React from 'react';

const Button = ({
  variant,
  onClick,
  title = 'Submit',
  disabled,
  icon,
  iconRight = false,
  type = 'submit',
  className = '',
}) => {
  const baseStyle = ` px-[16px] h-[48px]  flex justify-center items-center text-center text-[16px] font-[400]  rounded-[12px] transition ease-in-out duration-150 ${className}`;
  const variantStyles = {
    primary: 'bg-primary text-white  font-[400] text-[16px]',
    secondary:
      'bg-gray-500 text-white hover:bg-gray-600 font-[400] text-[16px]',
    danger: 'bg-red-500 text-white hover:bg-red-600 font-[400] text-[16px]',
    success:
      'bg-green-500 text-white hover:bg-green-600 font-[400] text-[16px]',
    outline:
      'bg-transparent border-[0.5px] border-solid border-[#D0D5DD]   text-black font-[400] text-[16px]',
    black:
      'bg-black border-[0.5px] border-solid border-[#D0D5DD]   text-white font-[400] text-[16px]',
  };

  const disabledStyle = disabled
    ? 'opacity-50 !bg-gray-400  cursor-not-allowed'
    : '';

  return (
    <button
      className={`${baseStyle} ${variantStyles[variant]}  ${disabledStyle}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {icon && (
        <span className={` ${iconRight ? 'order-2 pl-1' : 'order-1 pr-2'}`}>
          {/* Implement your icon rendering logic here */}
          {icon}
        </span>
      )}
      <span
        className={`pr-2 text-[16px] font-normal  ${iconRight ? 'order-1' : 'order-2'}`}
      >
        {title}
      </span>
    </button>
  );
};

export default Button;
