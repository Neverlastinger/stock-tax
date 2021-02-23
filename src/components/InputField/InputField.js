import React, { useState, useMemo } from 'react';
import { v4 as uuid } from 'uuid';
import cn from 'classnames';
import './InputField.scss';

const ENTER_CODE = 13;

/**
 * Represents an input field.
 *
 * @param {String}  type: html type attribute
 * @param {String}  label: optional label displayed on top of the field
 * @param {String}  placeholder: input placeholder
 * @param {SVG}     icon: icon displayed on the left of the input (email, password, etc.)
 * @param {Boolean} isMandatory: when true, displays an * symbil next to the label
 * @param {String}  background
 * @param {String}  error: when provided, displays the error state of the component and the error message
 * @param           props: rest of props passed to the <input />
 */
const InputField = ({ type = 'text', label, placeholder = '', icon, isMandatory = true, className, background, error, onEnter, ...props }) => {
  const [isActive, setIsActive] = useState(false);

  const htmlId = useMemo(() => (
    uuid()
  ), []);

  const onFocus = () => {
    setIsActive(true);
  };

  const onBlur = () => {
    setIsActive(false);
  };

  const onKeyPress = (e) => {
    e.charCode === ENTER_CODE && onEnter && onEnter();
  };

  return (
    <div className={cn('input-field-wrapper', { error, [className]: className })}>
      {label && (
        <label htmlFor={htmlId}>
          {label}
          {isMandatory && (
            <span className="mandatory-indicator"> *</span>
          )}
        </label>
      )}

      <div className={cn('input-field', { active: isActive })}>
        <div className="icon">
          <div className="inner-icon" style={{ background }}>
            <img src={icon} alt="" />
          </div>
        </div>
        <div className="field">
          <div className="inner-field">
            <input
              type={type}
              placeholder={placeholder}
              onFocus={onFocus}
              onBlur={onBlur}
              id={htmlId}
              onKeyPress={onKeyPress}
              style={{
                background
              }}
              {...props}
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="error-message">{error}</div>
      )}
    </div>
  );
};

export default InputField;
