import React, { useState, useCallback, useRef, useEffect } from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container, Error } from './styles';

interface SelectProps {
  options: {
    value: string | number;
    label: string | number;
  }[];
  name: string;
}

const Select: React.FC<SelectProps> = ({ options, name, ...rest }) => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'value',
    });
  }, [registerField, fieldName]);

  const handleSelectBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!selectRef.current?.value);
  }, []);

  const handleSelectFocus = useCallback(() => {
    setIsFocused(true);
  }, []);
  return (
    <Container isFocused={isFocused} isFilled={isFilled} isErrored={!!error}>
      <select
        defaultValue={defaultValue}
        name={name}
        onFocus={handleSelectFocus}
        onBlur={handleSelectBlur}
        ref={selectRef}
        {...rest}
      >
        <option value="">Selecione o cliente</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <Error title={error}>
          <FiAlertCircle size={20} color="#c53030" />
        </Error>
      )}
    </Container>
  );
};

export default Select;
