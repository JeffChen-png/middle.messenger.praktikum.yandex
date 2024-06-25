import { expect } from 'chai';
import { beforeEach, describe, it } from 'mocha';
import Sinon from 'sinon';

import Component from '.';

describe('Component test', () => {
  let TestingElement: typeof Component;

  beforeEach(() => {
    class DivElement extends Component {
      constructor(props: any) {
        super({ ...props });
      }

      componentDidMount(): void {}

      render() {
        return `<div>{{text}}</div>`;
      }
    }

    TestingElement = DivElement;
  });

  it('show', () => {
    const testingComponent = new TestingElement();
    testingComponent.show();

    expect(testingComponent.element?.style.visibility).to.equal('unset');
  });
  it('hide', () => {
    const testingComponent = new TestingElement();
    testingComponent.hide();

    expect(testingComponent.element?.style.visibility).to.equal('none');
  });
  it('getContent', () => {
    const testingComponent = new TestingElement();
    testingComponent.show();

    expect(testingComponent.getContent()).to.equal(testingComponent.element);
  });
  it('render props', () => {
    const renderProp = 'test';

    const testingComponent = new TestingElement({ text: renderProp });
    testingComponent.show();

    expect(testingComponent.element?.innerHTML).to.equal(renderProp);
  });
  it('set props', () => {
    const newProps = 'test-test';
    const testingComponent = new TestingElement({ text: 'test' });

    testingComponent.setProps({ text: newProps });

    expect(testingComponent.element?.innerHTML).to.equal(newProps);
  });
  it('render', () => {
    const testingComponent = new TestingElement({ text: 'test' });
    const render = Sinon.spy(testingComponent, 'render');

    testingComponent.show();
    testingComponent.setProps({ text: 'test-test' });

    expect(render.callCount).to.equal(1);
  });
  it('events', () => {
    const click = Sinon.stub();

    const testingComponent = new TestingElement({
      text: 'test',
      events: {
        click,
      },
    });
    testingComponent.show();

    testingComponent.element?.dispatchEvent(new MouseEvent('click'));
    expect(click.callCount).to.equal(1);
  });
});
