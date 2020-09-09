import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { shallow } from 'enzyme'

import CircularProgress from '@material-ui/core/CircularProgress'
import Spinner from './Spinner'

Enzyme.configure({ adapter: new Adapter() })

describe('Spinner tests', () => {
  it('should render Spinner component', () => {
    const wrapper = shallow(<Spinner />)
    expect(wrapper.find(CircularProgress)).toHaveLength(1)
  })
})
