import React from 'react';
import renderer from 'react-test-renderer';
import Pointable from "../src";

let addEventListener;
let setAttribute;

function createNodeMock(element) {
    if (element.type === 'div') {
        return {
            addEventListener,
            setAttribute
        };
    }
    return null;
}

const rendererOptions = {createNodeMock};

describe("component", () => {

    beforeEach(() => {
        addEventListener = jest.fn();
        setAttribute = jest.fn();
    });

    it("renders", () => {
        const component = renderer.create(
            <Pointable></Pointable>,
            rendererOptions
        );
        const tree = component.toJSON();
        expect(tree).toEqual({
            "type": "div",
            "props": {},
            "children": null
        });
        expect(addEventListener).not.toHaveBeenCalled();
        expect(setAttribute).not.toHaveBeenCalled();
    });

    it("renders with element type", () => {
        const component = renderer.create(
            <Pointable tagName="section"></Pointable>,
            rendererOptions
        );
        const tree = component.toJSON();
        expect(tree).toEqual({
            "type": "section",
            "props": {},
            "children": null
        });
        expect(addEventListener).not.toHaveBeenCalled();
        expect(setAttribute).not.toHaveBeenCalled();
    });

    it("renders with touch action", () => {
        const onPointerMove = () => {};
        const component = renderer.create(
            <Pointable touchAction="auto" onPointerMove={onPointerMove}></Pointable>,
            rendererOptions
        );
        const tree = component.toJSON();
        expect(tree).toEqual({
            "type": "div",
            "props": {},
            "children": null
        });
        expect(addEventListener).toHaveBeenCalledWith("pointermove", onPointerMove);
        expect(setAttribute).toHaveBeenCalledWith('touch-action', 'auto');
    });

    it("passes ref to parent", () => {
        const elementRef = jest.fn();
        const ParentComponent = (props) => (
            <Pointable elementRef={elementRef} />
        );
        const component = renderer.create(
            <ParentComponent />,
            rendererOptions
        );
        expect(elementRef).toHaveBeenCalled();
        expect(addEventListener).not.toHaveBeenCalled();
        expect(setAttribute).not.toHaveBeenCalled();
    });

    [
        'onPointerMove',
        'onPointerDown',
        'onPointerUp',
        'onPointerOver',
        'onPointerOut',
        'onPointerEnter',
        'onPointerLeave',
        'onPointerCancel'
    ].forEach((evtName) => {
        it(`adds event listener for ${evtName}`, () => {
            const domEventName = evtName.substr(2).toLowerCase();
            const handler = () => {};
            const pointableProps = {
                [evtName]: handler
            };
            const component = renderer.create(
                <Pointable {...pointableProps}></Pointable>,
                rendererOptions
            );
            expect(addEventListener).toHaveBeenCalledWith(domEventName, handler);
        });
    });
});
