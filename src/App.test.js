import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import App from './App'

Enzyme.configure({ adapter: new Adapter() })

describe('App tests', () => {
  it('should render App component', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find('#App').length === 1).toBeTruthy()
  })
})
