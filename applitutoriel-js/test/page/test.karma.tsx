const assert = require('assert');
import * as React from "react";
import * as ReactDom from 'react-dom';
var ReactTestUtils = require('react-dom/test-utils'); // ES5 with npm
import { Button } from "hornet-js-react-components/src/widget/button/button";
var chai = require('chai');

describe("Test Karma", () => {
    it("Test KO", () => {
        assert.equal(1, 2);
    });
    it("Test OK", () => {
        assert.equal(1, 1);
    });
    it("Test React", () => {
        let button = ReactTestUtils.renderIntoDocument(<Button/>)
        chai.expect(button).to.be.ok;
        var div = document.createElement('div');
        document.body.appendChild(div);
        ReactDom.render(<Button/>, div);
    });
});
