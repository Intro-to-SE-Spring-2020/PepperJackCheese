import React from 'react';
import Main from '../components/main.component';
import renderer from 'react-test-renderer';
import { create } from "react-test-renderer";

test('renders correctly', () => {
    const component = renderer.create('/Main'); 
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('post', () => {
    const component = renderer.create(<Main username = 'tacocat' description = 'test post'/>);
    const instance = component.root;
    const post = instance.findAllByType('Main');
    post.onSubmit();
    expect(post.props.description).toBe(true);

})

test('like', () => {

})

test('follow', () => {

})