# &lt;Pointable /&gt;

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

Version 1.x relies on React 15.5.x and therefore the `prop-types` package. If you are on an older version of React and not using `prop-types` yet, install `react-pointable@0.1.0` instead.

## Usage
By default, a `<Pointable />` component renders a `<div>` and passes through any non-pointer event props like `className`, `style`, etc. Any pointer event props will just work as expected.

When using `<Pointable />` for interactive elements, this makes managing pointer events easy:
```javascript
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
`<Pointable />` accepts two special non-pointer event props:

- `tagName [string = 'div']` - If you don't want a `<div />`  to be rendered, you can pass any valid element type and it will be rendered instead.
- `touchAction [string = 'auto']` - When used with PEP in a browser that doesn't support pointer events, chances are the CSS property `touch-action` also isn't supported. PEP therefore supports a `touch-action` _attribute_, and this prop allows setting that in a fully declarative manner. You can read more about the PEP attribute [on its repo](https://github.com/jquery/PEP#polyfill-limitations).

## Example
[Here's a CodePen using Pointable](http://codepen.io/MillerTime/pen/QKaLky/) that allows toggling between pointer and mouse events, using the same components.

## License
MIT
