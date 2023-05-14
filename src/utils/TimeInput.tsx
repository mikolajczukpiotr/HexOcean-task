import { ChangeEvent, useState } from "react";

interface TimeInputProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const TimeInput = ({
  id,
  name,
  label,
  value,
  onChange,
  error,
}: TimeInputProps) => {
  const [isMaskVisible, setIsMaskVisible] = useState(false);

  const toggleMaskVisibility = () => {
    setIsMaskVisible(!isMaskVisible);
  };

  const mask = isMaskVisible ? "HH:MM:SS" : "";
  const maskedValue = value.padEnd(8, "_").substring(0, 8).replace(/_/g, mask);

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <div>
        <input
          type="text"
          id={id}
          name={name}
          value={maskedValue}
          onChange={onChange}
          onFocus={toggleMaskVisibility}
          onBlur={toggleMaskVisibility}
        />
        {error && <div>{error}</div>}
      </div>
    </div>
  );
};

export default TimeInput;
