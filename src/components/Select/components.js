import React from 'react';
import { MenuItem, Paper, TextField, Typography } from '@material-ui/core';

const Option = props => (
  <MenuItem
    buttonRef={props.innerRef}
    selected={props.isFocused}
    component="div"
    style={{
      fontWeight: props.isSelected ? 500 : 400,
    }}
    {...props.innerProps}
  >
    <div>
      {props.children}
    </div>
  </MenuItem>
);

const Placeholder = props => (
  <Typography
    color="textSecondary"
    className={props.selectProps.classes.placeholder}
    {...props.innerProps}
  >
    {props.children}
  </Typography>
);

const SingleValue = props => (
  <Typography {...props.innerProps}>
    {props.children}
  </Typography>
);

const NoOptionsMessage = props => (
  <Typography
    color="textSecondary"
    className={props.selectProps.classes.message}
    {...props.innerProps}
  >
    {props.children}
  </Typography>
);

const LoadingMessage = props => (
  <Typography
    color="textSecondary"
    className={props.selectProps.classes.message}
    {...props.innerProps}
  >
    {props.children}
  </Typography>
);

const ValueContainer = (props) => (
  <div className={props.selectProps.classes.valueContainer}>{props.children}</div>
);

const inputComponent = ({ inputRef, ...props }) => (
  <div ref={inputRef} {...props} />
);

const Control = props => (
  <TextField
    fullWidth
    InputProps={{
      inputComponent,
      inputProps: {
        className: props.selectProps.classes.input,
        inputRef: props.innerRef,
        children: props.children,
        ...props.innerProps,
      },
    }}
    {...props.selectProps.textFieldProps}
  />
);

const Menu = props => (
  <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
    {props.children}
  </Paper>
);

export default {
  Control,
  LoadingMessage,
  Menu,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};
