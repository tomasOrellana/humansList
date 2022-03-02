import React from "react";

type WrappedComponentType = {
  wrap?: React.FC<React.ReactElement>;
  children: React.ReactElement;
};

const WrappedComponent: React.FC<WrappedComponentType> = ({ wrap, children }) =>
  wrap ? wrap(children) : children;

export default WrappedComponent;
