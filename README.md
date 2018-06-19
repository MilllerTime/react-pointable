# &lt;Pointable /&gt; (obsolete as of React 16.4.0)

[![npm](https://img.shields.io/npm/v/react-pointable.svg?style=flat-square)](https://www.npmjs.com/package/react-pointable) [![Travis](https://img.shields.io/travis/MilllerTime/react-pointable/master.svg?style=flat-square)](https://travis-ci.org/MilllerTime/react-pointable) [![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg?style=flat-square)](https://github.com/facebook/jest) [![David](https://img.shields.io/david/dev/MilllerTime/react-pointable.svg?style=flat-square)](https://david-dm.org/MilllerTime/react-pointable?type=dev)


A dependency free React component supporting declarative pointer event binding.

## Migrating to React 16.4+

As of [React 16.4.0](https://reactjs.org/blog/2018/05/23/react-v-16-4.html), pointer events are now supported out of the box! [Custom DOM attributes](https://reactjs.org/blog/2017/09/08/dom-attributes-in-react-16.html) are also supported, meaning React works well with PEP in browsers that don't natively support pointer events.

This component still works well pre React 16.4, but if you're upgrading it is simple to remove this component from your code. You can replace any instances of the `<Pointable>` component with a native DOM element.

```javascript
// For example, this:

<Pointable onPointerDown={() => alert('Touched!')}>
  Touch me
</Pointable>

// becomes this:

<div onPointerDown={() => alert('Touched!')}>
  Touch me
</div>
```

## Purpose

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
Typings for react-pointable are available on NPM.

If you're using a version of React < 16.4, run
```
npm install --save-dev @types/react-pointable@1.1.3
```
If you happen to be using React 16.4+ and can't yet remove this package for some reason, you can instead run
```
npm install --save-dev @types/react-pointable
```
To learn more, see the discussion in the [DefinitelyTyped repo](https://github.com/DefinitelyTyped/DefinitelyTyped/pull/26363).


## License
MIT
