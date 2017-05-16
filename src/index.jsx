// Allows listening for pointer events using PEP for browsers that don't support them.
// This component also adds support for the declarative event binding that React does well,
// even though React doesn't support pointer events yet.

import React from 'react';
import PropTypes from 'prop-types';


// A mapping of pointer event props to event names.
const pointerEventMap = {
	onPointerMove:   'pointermove',
	onPointerDown:   'pointerdown',
	onPointerUp:     'pointerup',
	onPointerOver:   'pointerover',
	onPointerOut:    'pointerout',
	onPointerEnter:  'pointerenter',
	onPointerLeave:  'pointerleave',
	onPointerCancel: 'pointercancel'
};

// An array of just the pointer event props.
const pointerEventProps = Object.keys(pointerEventMap);


// Component with pointer events enabled (specially made for Pointer Events Polyfill)
class Pointable extends React.Component {

	constructor(props) {
		super(props);
		this.setRef = this.setRef.bind(this);
	}

	// When component mounts, check for pointer event listeners in props and register them manually.
	componentDidMount() {
		initNodeWithPE(this.pointableNode, this.props);
	}

	// When component updates, diff pointer events and manually remove/add event listeners as needed.
	componentDidUpdate(prevProps) {
		updateNodeWithPE(this.pointableNode, prevProps, this.props);
	}

	setRef(node) {
		this.pointableNode = node;
		if(this.props.elementRef) {
			this.props.elementRef(node);
		}
	};

	render() {
		// Collect unused props to pass along to rendered node.
		// This could be done simply with lodash, but avoiding the extra dependency here isn't difficult.

		// Create a shallow copy of props
		const otherProps = { ...this.props };
		// Remove known pointer event props
		pointerEventProps.forEach(prop => delete otherProps[prop]);
		// Remove other props used by <Pointable />
		delete otherProps.children;
		delete otherProps.tagName;
		delete otherProps.touchAction;
		delete otherProps.elementRef;

		const El = this.props.tagName;

		return (
			<El ref={this.setRef} {...otherProps}>
				{this.props.children}
			</El>
		);
	}
}


Pointable.propTypes = {
	tagName: PropTypes.string.isRequired,
	touchAction: PropTypes.oneOf(['auto', 'none', 'pan-x', 'pan-y', 'manipulation']).isRequired,
	elementRef: PropTypes.func,
	onPointerMove: PropTypes.func,
	onPointerDown: PropTypes.func,
	onPointerUp: PropTypes.func,
	onPointerOver: PropTypes.func,
	onPointerOut: PropTypes.func,
	onPointerEnter: PropTypes.func,
	onPointerLeave: PropTypes.func,
	onPointerCancel: PropTypes.func
};

Pointable.defaultProps = {
	tagName: 'div',
	touchAction: 'auto'
};


export default Pointable;


// Helper methods

// Given a DOM node and a props object, add appropriate pointer events.
const initNodeWithPE = (node, props) => {
	let hasPE = false;

	// Check for all possible pointer event prop names.
	pointerEventProps.forEach(eventProp => {
		// If an event prop exists in given props, add the event listener.
		const listener = props[eventProp];
		if (listener) {
			hasPE = true;
			node.addEventListener(pointerEventMap[eventProp], listener);
		}
	});

	// For PEP, add the 'touch-action' attribute if pointer events were registered.
	if (hasPE) {
		node.setAttribute('touch-action', props.touchAction);
	}
};


// Given a DOM node, a stale props object, and a new props object, compute which pointer events to remove and/or add.
const updateNodeWithPE = (node, prevProps, nextProps) => {
	let hasPE = false;

	pointerEventProps.forEach(eventProp => {
		// To perform diff, grab references to old and new listener functions for event.
		const listenerOld = prevProps[eventProp];
		const listenerNew = nextProps[eventProp];

		// If a listener (still) exists, mark that there are pointer events.
		if (listenerNew) {
			hasPE = true;
		}

		// If listener hasn't changed, there's nothing to do.
		// Note the additional check exists because `undefined` !== `null` but both mean "no event listener".
		if (listenerOld === listenerNew || !listenerOld && !listenerNew) return;

		// Remove existing event listener.
		if (listenerOld) {
			node.removeEventListener(pointerEventMap[eventProp], listenerOld);
		}

		// Add/update with new event listener.
		if (listenerNew) {
			node.addEventListener(pointerEventMap[eventProp], listenerNew);
		}
	});

	// For PEP, ensure the 'touch-action' attribute reflects the currently attached event listeners.
	if (hasPE) {
		node.setAttribute('touch-action', nextProps.touchAction);
	}
	else {
		node.removeAttribute('touch-action');
	}
};




///////////////////////
// TEST-ONLY EXPORTS //
///////////////////////
//
// These methods are private to the module, but should still be tested.

export const __test__ = {
	initNodeWithPE,
	updateNodeWithPE
};
