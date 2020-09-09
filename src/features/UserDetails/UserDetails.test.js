import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux'
import { createStore } from '@reduxjs/toolkit'
import { act } from "react-dom/test-utils"
import Enzyme, { shallow, mount } from 'enzyme'
import sinon from 'sinon'

import { UserDetailsBody, UserDetailsHead, Button } from '@material-ui/core'
import UserDetails from './UserDetails'
import Spinner from '../Spinner/Spinner'

import * as requests from '../../requests/requests'
import * as utils from '../../utils/validationUtils'
import combinedReducers from '../../reducers/index'

Enzyme.configure({ adapter: new Adapter() })
const store = createStore(combinedReducers)

describe('UserDetails tests', () => {
  it('should render a UserDetails component', () => {
    const wrapper = shallow(<Provider store={store}><UserDetails /></Provider>)
    expect(wrapper.find(UserDetails)).toHaveLength(1)
  })

  it.skip('should render 1 UserDetailsHead component', () => {
    const wrapper = mount(<Provider store={store}><UserDetails /></Provider>)
    expect(wrapper.find(UserDetailsHead)).toHaveLength(1)
  })

  it.skip('should render 1 UserDetailsBody component', () => {
    const wrapper = mount(<Provider store={store}><UserDetails /></Provider>)
    expect(wrapper.find(UserDetailsBody)).toHaveLength(1)
  })

  it.skip('should render navigation wrapper', () => {
    const wrapper = mount(<Provider store={store}><UserDetails /></Provider>)
    expect(wrapper.find('#navigationWrapper')).toHaveLength(1)
  })

  it.skip('should render 5 buttons inside navigation wrapper', () => {
    const wrapper = mount(<Provider store={store}><UserDetails /></Provider>)
    const navigationWrapper = wrapper.find('#navigationWrapper')
    expect(navigationWrapper.find(Button)).toHaveLength(1)
  })

  it('should call fetchUserDetailsData on component', () => {
    const fetchUserDataStub = sinon.stub(requests, requests.fetchUserData.name)
    act(() => { mount(<Provider store={store}><UserDetails /></Provider>) })

    expect(fetchUserDataStub.calledOnce).toBeTruthy()
    fetchUserDataStub.restore()
  })

  it('should render Spinner while pending for UserDetailsData', () => {
    const isUserDetailsDataValidStub = sinon.stub(utils, utils.isUserDetailsValid.name).callsFake(() => false)
    const wrapper = mount(<Provider store={store}><UserDetails /></Provider>)
    
    expect(wrapper.find(Spinner)).toHaveLength(1)
    isUserDetailsDataValidStub.restore()
  })
})
