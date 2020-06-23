// @flow
import React from 'react';
import styles from './styles.module.css';

type Props = {
  /** My lovely property */
  text: string
};

/** My lovely component */
export const ExampleComponent = ({ text }: Props) => {
  return <div className={styles.test}>Example Component: {text}</div>;
};

ExampleComponent.defaultProps = {
  text: 'Default text'
};

export default ExampleComponent;

export * from './AnotherComponent';
