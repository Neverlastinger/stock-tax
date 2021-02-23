import React from 'react';
import classnames from 'classnames';
import MaterialSelect from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

/**
 * Represents a select with dropdown options component.
 *
 * @param {String}   label
 * @param {String}   value:
 * @param {Function} onValueSelected
 * @param {Array}    options: can be an array of either strings of { value: {String}, label: {String} }
 * @param {Array}    props
 */
const Select = ({ label, value = [], onValueSelected, options, className, ...props }) => (
  <FormControl fullWidth variant="outlined" className={className}>
    <InputLabel>{label}</InputLabel>
    <MaterialSelect
      value={value}
      onChange={(e) => { onValueSelected(e.target.value); }}
      label={label}
      {...props}
    >
      {options.map((option) => (
        typeof option === 'string'
          ? <MenuItem key={option} value={option} className={classnames({ 'main-option': option === '[ALL]' })}>{option}</MenuItem>
          : <MenuItem key={option.value} value={option.value} className={classnames({ 'main-option': option === '[ALL]' })}>{option.label}</MenuItem>
      ))}
    </MaterialSelect>
  </FormControl>
);

export default Select;
