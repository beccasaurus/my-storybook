import * as React from 'react';

export interface Props {
  /** This is hello! */
  hello: string;
}

/**
 * My cool component
 */
export function MyComponent({ hello }: Props) {
  return <p>{hello}</p>;
}

export default MyComponent;
