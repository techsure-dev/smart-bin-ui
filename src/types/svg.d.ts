declare module '*.svg?react' {
  import * as React from 'react';
  const ReactComponent: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  export default ReactComponent;
}