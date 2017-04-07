import { __test__ } from '../src';

// Pull in private methods to test
const { initNodeWithPE, updateNodeWithPE } = __test__;



test('initNodeWithPE', () => {
	// Create a mock DOM node with the minimal API needed for testing.
	const mockNode = {
		addEventListener: jest.fn(),
		setAttribute: jest.fn()
	};


	// Test 1 - not using PE
	// ------------------------------------------------

	const props1 = {
		touchAction: 'auto',
		onClick: () => {}
	};

	initNodeWithPE(mockNode, props1);

	expect(mockNode.addEventListener).not.toHaveBeenCalled();
	expect(mockNode.setAttribute).not.toHaveBeenCalled();

	jest.clearAllMocks();


	// Test 2 - using a couple PE
	// ------------------------------------------------

	const props2 = {
		touchAction: 'auto',
		onPointerEnter: () => {},
		onPointerLeave: () => {}
	};

	initNodeWithPE(mockNode, props2);

	expect(mockNode.addEventListener).toHaveBeenCalledTimes(2);
	expect(mockNode.addEventListener.mock.calls[0]).toEqual(['pointerenter', props2.onPointerEnter]);
	expect(mockNode.addEventListener.mock.calls[1]).toEqual(['pointerleave', props2.onPointerLeave]);

	expect(mockNode.setAttribute).toHaveBeenCalledTimes(1);
	expect(mockNode.setAttribute).toHaveBeenCalledWith('touch-action', 'auto');

	jest.clearAllMocks();
});




test('updateNodeWithPE', () => {
	// Create a mock DOM node with the minimal API needed for testing.
	const mockNode = {
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
		setAttribute: jest.fn(),
		removeAttribute: jest.fn()
	};


	// Test 1 - Going from no PE to having a couple PE
	// ------------------------------------------------

	const prevProps1 = {
		touchAction: 'auto',
		onClick: () => {}
	};

	const nextProps1 = {
		touchAction: 'auto',
		onPointerEnter: () => {},
		onPointerLeave: () => {}
	};

	updateNodeWithPE(mockNode, prevProps1, nextProps1);

	expect(mockNode.addEventListener).toHaveBeenCalledTimes(2);
	expect(mockNode.addEventListener.mock.calls[0]).toEqual(['pointerenter', nextProps1.onPointerEnter]);
	expect(mockNode.addEventListener.mock.calls[1]).toEqual(['pointerleave', nextProps1.onPointerLeave]);

	expect(mockNode.removeEventListener).not.toHaveBeenCalled();

	expect(mockNode.setAttribute).toHaveBeenCalledTimes(1);
	expect(mockNode.setAttribute).toHaveBeenCalledWith('touch-action', 'auto');

	expect(mockNode.removeAttribute).not.toHaveBeenCalled();

	jest.clearAllMocks();


	// Test 2 - Going from a couple PE to no PE
	// ------------------------------------------------

	const prevProps2 = {
		touchAction: 'auto',
		onPointerEnter: () => {},
		onPointerLeave: () => {}
	};

	const nextProps2 = {
		touchAction: 'auto',
		onClick: () => {}
	};

	updateNodeWithPE(mockNode, prevProps2, nextProps2);

	expect(mockNode.addEventListener).not.toHaveBeenCalled();

	expect(mockNode.removeEventListener).toHaveBeenCalledTimes(2);
	expect(mockNode.removeEventListener.mock.calls[0]).toEqual(['pointerenter', prevProps2.onPointerEnter]);
	expect(mockNode.removeEventListener.mock.calls[1]).toEqual(['pointerleave', prevProps2.onPointerLeave]);

	expect(mockNode.setAttribute).not.toHaveBeenCalled();

	expect(mockNode.removeAttribute).toHaveBeenCalledTimes(1);
	expect(mockNode.removeAttribute).toHaveBeenCalledWith('touch-action');

	jest.clearAllMocks();


	// Test 3 - no PE
	// ------------------------------------------------

	const prevProps3 = {
		touchAction: 'auto',
		onClick: () => {}
	};

	const nextProps3 = {
		touchAction: 'auto',
		onClick: () => {}
	};

	updateNodeWithPE(mockNode, prevProps3, nextProps3);

	expect(mockNode.addEventListener).not.toHaveBeenCalled();
	expect(mockNode.removeEventListener).not.toHaveBeenCalled();
	expect(mockNode.setAttribute).not.toHaveBeenCalled();
	expect(mockNode.removeAttribute).toHaveBeenCalled();

	jest.clearAllMocks();


	// Test 4 - Changing PE (and touch-action)
	// ------------------------------------------------

	const prevProps4 = {
		touchAction: 'auto',
		onPointerEnter: () => {},
		onPointerLeave: () => {}
	};

	const nextProps4 = {
		touchAction: 'none',
		onPointerMove: () => {}
	};

	updateNodeWithPE(mockNode, prevProps4, nextProps4);

	expect(mockNode.addEventListener).toHaveBeenCalledTimes(1);
	expect(mockNode.addEventListener).toHaveBeenCalledWith('pointermove', nextProps4.onPointerMove);

	expect(mockNode.removeEventListener).toHaveBeenCalledTimes(2);
	expect(mockNode.removeEventListener.mock.calls[0]).toEqual(['pointerenter', prevProps4.onPointerEnter]);
	expect(mockNode.removeEventListener.mock.calls[1]).toEqual(['pointerleave', prevProps4.onPointerLeave]);

	expect(mockNode.setAttribute).toHaveBeenCalledTimes(1);
	expect(mockNode.setAttribute).toHaveBeenCalledWith('touch-action', 'none');

	expect(mockNode.removeAttribute).not.toHaveBeenCalled();

	jest.clearAllMocks();
});
