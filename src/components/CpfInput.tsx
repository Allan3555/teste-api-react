
import React, { useState, ChangeEvent } from 'react';
import { formatCpf } from '../utils/dataUtils';

interface CpfInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const CpfInput: React.FC<CpfInputProps> = ({ value, onChange, error }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formattedCpf = formatCpf(e.target.value);
    onChange(formattedCpf);
  };

  return (
    <div className="w-full">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="000.000.000-00"
        maxLength={14}
        className={`govbr-input ${error ? 'border-red-500' : ''}`}
        aria-label="CPF"
      />
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default CpfInput;
