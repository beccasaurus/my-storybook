import React from 'react';

type Props = {
  /** My text property */
  text: string,
};

/** My amazing component */
export function MyComponent({ text }: Props) {
  // Random reminder, if you return a string instead of JSX
  // then Storybook will not show your props! Weird bug.
  return <p>Hello there! And also "{text}"</p>;
}

MyComponent.defaultProps = {
  text: 'Defaul text',
};

export default MyComponent;
