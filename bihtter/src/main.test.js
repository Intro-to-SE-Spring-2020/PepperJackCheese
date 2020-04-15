//import React from 'react';
import Main from './components/main.component';
import renderer from 'react-test-renderer';

test('renders correctly', () => {
    const component = renderer.create(Main); 
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});