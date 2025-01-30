import React from "react";
//@import styles
import styles from "./index.module.scss";
// @import libs

const InputField = ({
  icon,
  name,
  value,
  label,
  error = "",
  infoText = "",
  register = () => {},
  onChange,
  placeholder,
  type = "text",
  className = "",
  disable = false,
  height = "48px",
  autoComplete = "off",
  maxLength = 50,
  isPhone = false,
  alphaNumeric = false,
  isAlphabitAllowed = false,
  isCNIC = false,
  isNICOP = false,
  isloginPage = false,
  ...props
}) => {
  const handleInput = (e) => {
    if (isPhone) {
      let value = e.target.value.replace(/\D/g, "");

      if (value.startsWith("92")) {
        value = "0" + value.slice(2);
      }

      if (value.length === 1 && value !== "0") {
        value = "03";
      } else if (
        value.length > 1 &&
        !value.startsWith("03") &&
        value.startsWith("0")
      ) {
        value = "03" + value.slice(1);
      }
      if (value.length > 11) {
        value = value.slice(0, 11); // Truncate to 11 digits
      }

      e.target.value = value;
    } else {
      e.target.value = e.target.value.replace(/\D/g, "");
    }
  };

  const onInputChange = (e) => {
    if (alphaNumeric) {
      e.target.value = e.target.value.replace(/[^a-zA-Z0-9\s]/g, "");
    }
    if (isAlphabitAllowed) {
      e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    }
  };
  return (
    <div className={`${isloginPage ? "mb-3" : "mb-5"} w-full ${className}`}>
      {label && (
        <label className="mb-[8px] block text-[16px] font-medium  text-custom-dark">
          {label}
        </label>
      )}
      <div className="flex items-center rounded-[12px] border border-[#B4B5BB] px-3">
        {icon && <span className="mr-2">{icon}</span>}
        {type === "number" ? (
          <input
            {...props}
            type="text"
            value={value}
            disabled={disable}
            onChange={onChange}
            maxLength={maxLength}
            {...register(name)}
            placeholder={placeholder}
            autoComplete={type === "password" ? "new-password" : autoComplete}
            className={` ${styles.numberInput} h-[${height}] flex-1 appearance-none border-none bg-transparent bg-none outline-none disabled:cursor-not-allowed disabled:opacity-30  `}
            style={{
              MozAppearance: "textfield",
              backgroundColor: "transparent",
            }}
            onInput={handleInput}
          />
        ) : (
          <input
            {...props}
            type={type}
            value={value}
            disabled={disable}
            onChange={onChange}
            maxLength={maxLength}
            {...register(name)}
            placeholder={placeholder}
            autoComplete={type === "password" ? "new-password" : autoComplete}
            className={` ${styles.numberInput} h-[${height}] flex-1 appearance-none border-none bg-transparent bg-none outline-none disabled:cursor-not-allowed disabled:opacity-30  `}
            style={{
              MozAppearance: "textfield",
              backgroundColor: "transparent",
            }}
            onInput={onInputChange}
          />
        )}
      </div>
      {infoText ? (
        <p className="mt-2 text-sm text-gray-600">{infoText}</p>
      ) : null}
      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
    </div>
  );
};

export default InputField;
