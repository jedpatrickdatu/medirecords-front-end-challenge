// import { render, screen } from '@testing-library/react';
import App from './App';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

configure({adapter: new Adapter()});

describe('App', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('renders two section components', () => {
    expect(wrapper.find('.section').length).toEqual(2);
  });

  const validInputParams = [
    {
      describeMsg: 'when input is a comma-separated list of positive whole numbers',
      expectationMsg: 'sets output as input with the numbers doubled without error',
      input: '1,2,3,4,5,6',
      output: '2,4,6,8,10,12',
    },
    {
      describeMsg: 'when input is a comma-separated list of numbers including a negative number, decimal, and spaces',
      describeMsg: 'when input is a series of numbers including a negative number and separated by commas',
      expectationMsg: 'sets output as input with the numbers doubled without spaces and without error',
      input: ' 1    ,-2,3.1,-4.25,5.11,0,6 ',
      output: '2,-4,6.2,-8.5,10.22,0,12',
    },
    {
      describeMsg: 'when input is a comma-separated list of positive whole numbers but one of the values is empty',
      expectationMsg: 'sets output as input with the numbers doubled without error while setting the empty value as empty',
      input: ',2,    ,,5,',
      output: ',4,,,10,',
    },
  ];

  const invalidInputParams = [
    {
      describeMsg: 'when input contains non-numeric values except for commas',
      input: 'Hello, th3re!',
    },
    {
      describeMsg: 'when input is a comma-separated list of numbers but one of the values is a non-numeric value',
      input: '1,2,E,4,5...,6',
    },
  ];

  validInputParams.forEach(({describeMsg, expectationMsg, input, output}) => {
    describe(describeMsg, () => {
      it(expectationMsg, () => {
        wrapper.find('.input').simulate('change', {target: {value: input}});
  
        expect(wrapper.find('.output').props().value).toEqual(output);
        expect(wrapper.find('.invalid-input-msg').exists()).toBeFalsy();
      });
    });
  });

  invalidInputParams.forEach(({describeMsg, input}) => {
    describe(describeMsg, () => {
      it('shows invalid input error and sets output to be an empty string', () => {
        wrapper.find('.input').simulate('change', {target: {value: input}});
  
        expect(wrapper.find('.invalid-input-msg').exists()).toBeTruthy();
        expect(wrapper.find('.invalid-input-msg').props().children).toEqual(
          'Invalid input. Please enter a comma-separated list of numbers.'
        );
        expect(wrapper.find('.output').props().value).toEqual('');
      });
    });
  });

  describe('when initial input is invalid then is changed to a valid one', () => {
    it('hides the error message upon entering the valid input', () => {
      wrapper.find('.input').simulate('change', {target: {value: 'Hello, th3re!'}});

      expect(wrapper.find('.invalid-input-msg').exists()).toBeTruthy();
      expect(wrapper.find('.invalid-input-msg').props().children).toEqual(
        'Invalid input. Please enter a comma-separated list of numbers.'
      );

      wrapper.find('.input').simulate('change', {target: {value: '1,2,3,4,5,6'}});

      expect(wrapper.find('.invalid-input-msg').exists()).toBeFalsy();
    });
  });
});
