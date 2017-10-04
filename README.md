# &lt;Pointable /&gt;

[![npm](https://img.shields.io/npm/v/react-pointable.svg?style=flat-square)](https://www.npmjs.com/package/react-pointable) [![Travis](https://img.shields.io/travis/MilllerTime/react-pointable/master.svg?style=flat-square)](https://travis-ci.org/MilllerTime/react-pointable) [![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg?style=flat-square)](https://github.com/facebook/jest) [![David](https://img.shields.io/david/dev/MilllerTime/react-pointable.svg?style=flat-square)](https://david-dm.org/MilllerTime/react-pointable?type=dev)


A dependency free React component supporting declarative pointer event binding.

- Allows using pointer events with React today.
- Compatible with the official [pointer events polyfill](https://github.com/jquery/PEP) and its `touch-action` workaround.
- Internal event listeners are kept up-to-date as pointer event handlers come and go.
- Customizable wrapper element.

Note that this component does nothing special to facilitate [pointer capture](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events#Pointer_capture).

## Installation

```
npm install --save react-pointable
```

## Usage
By default, a `<Pointable />` component renders a `<div>` and passes through any non-pointer event props like `className`, `style`, etc. Any pointer event props will just work as expected.

When using `<Pointable />` for interactive elements, this makes managing pointer events easy:
```javascript
import Pointable from 'react-pointable';

<Pointable onPointerDown={() => alert('Touched!')}>
  Touch me
</Pointable>
```

Composing is also easy:
```javascript
const HairTrigger = ({ onTouch, disabled, children, ...otherProps }) => (
  <Pointable onPointerEnter={disabled ? null : onTouch} {...otherProps}>
    {children}
  </Pointable>
);
```

All pointer events are supported:

`onPointerMove`, `onPointerDown`, `onPointerUp`, `onPointerOver`, `onPointerOut`, `onPointerEnter`, `onPointerLeave`, `onPointerCancel`

## Additional Props
`<Pointable />` accepts special non-pointer event props:

- `tagName [string = 'div']` - If you don't want a `<div />`  to be rendered, you can pass any valid element type and it will be rendered instead.
- `touchAction [string = 'auto']` - When used with PEP in a browser that doesn't support pointer events, chances are the CSS property `touch-action` also isn't supported. PEP therefore supports a `touch-action` _attribute_, and this prop allows setting that in a fully declarative manner. You can read more about the PEP attribute [on its repo](https://github.com/jquery/PEP#polyfill-limitations).
- `elementRef [function]` - Provides the generated element to a parent component. (optional)

## Example
[Here's a CodePen using Pointable](http://codepen.io/MillerTime/pen/QKaLky/) that allows toggling between pointer and mouse events, using the same components.

## TypeScript Typings
Typings for projects written in TypeScript are available on NPM:

```
npm install --save-dev @types/react-pointable
```

## License
MIT
