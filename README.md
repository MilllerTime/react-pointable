# &lt;Pointable /&gt;
A dependency free React component supporting declarative pointer event binding. Compatible with the official [pointer events polyfill](https://github.com/jquery/PEP).
Note that this component does nothing special to facilitate [pointer capture](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events#Pointer_capture).

## Basic Usage
By default, a `<Pointable />` component just renders a `<div />`, passing through any props like `className`, `style`, non-pointer events, etc. What's special is that you can add pointer event props, react-style, and they will be properly bound. If a subsequent render adds or removes any pointer events, the internal listeners are updated accordingly.

When using `<Pointable />` as an interactive element, this makes managing pointer events easy:
```JS
<Pointable onPointerDown={() => alert('Touched!')}>
  Touch me
</Pointable>
```

All pointer events are supported:

`onPointerMove`, `onPointerDown`, `onPointerUp`, `onPointerOver`, `onPointerOut`, `onPointerEnter`, `onPointerLeave`, `onPointerCancel`

## Additional Props
`<Pointable />` accepts two special non-pointer event props:

- `tagName [string = 'div']` - If you don't want a `<div />`  to be rendered, you can pass any valid element type and it will be rendered instead.
- `touchAction [string = 'auto']` - When used with PEP in a browser that doesn't support pointer events, chances are the CSS property `touch-action` also isn't supported. PEP therefore supports a `touch-action` _attribute_, and this prop allows setting that in a declarative way. You can read more about the PEP attribute [on its repo](https://github.com/jquery/PEP#polyfill-limitations).

## Example
[Here's a CodePen using Pointable](http://codepen.io/MillerTime/pen/QKaLky/) that allows toggling between pointer and mouse events, using the same components.

## License
MIT
