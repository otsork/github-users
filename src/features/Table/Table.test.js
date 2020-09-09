import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux'
import { createStore } from '@reduxjs/toolkit'
import { act } from "react-dom/test-utils"
import Enzyme, { shallow, mount } from 'enzyme'
import sinon from 'sinon'

import { TableBody, TableHead, Button, } from '@material-ui/core'
import Table from './Table'
import Spinner from '../Spinner/Spinner'

import * as requests from '../../requests/requests'
import * as utils from '../../utils/validationUtils'
import combinedReducers from '../../reducers/index'

Enzyme.configure({ adapter: new Adapter() })
const store = createStore(combinedReducers)

describe('Table tests', () => {
  it('should render a Table component', () => {
    const wrapper = shallow(<Provider store={store}><Table /></Provider>)
    expect(wrapper.find(Table)).toHaveLength(1)
  })

  it('should render 1 TableHead component', () => {
    const wrapper = mount(<Provider store={store}><Table /></Provider>)
    expect(wrapper.find(TableHead)).toHaveLength(1)
  })

  it('should render 1 TableBody component', () => {
    const wrapper = mount(<Provider store={store}><Table /></Provider>)
    expect(wrapper.find(TableBody)).toHaveLength(1)
  })

  it('should render navigation wrapper', () => {
    const wrapper = mount(<Provider store={store}><Table /></Provider>)
    expect(wrapper.find('#navigationWrapper')).toHaveLength(1)
  })

  it('should render 5 buttons inside navigation wrapper', () => {
    const wrapper = mount(<Provider store={store}><Table /></Provider>)
    const navigationWrapper = wrapper.find('#navigationWrapper')
    expect(navigationWrapper.find(Button)).toHaveLength(5)
  })

  it('should call fetchTableData on component', () => {
    const fetchTableDataStub = sinon.stub(requests, requests.fetchTableData.name)
    act(() => { mount(<Provider store={store}><Table /></Provider>) })

    expect(fetchTableDataStub.calledOnce).toBeTruthy()
    fetchTableDataStub.restore()
  })

  it('should render Spinner while pending for tableData', () => {
    const isTableDataValidStub = sinon.stub(utils, utils.isTableDataValid.name).callsFake(() => false)
    const wrapper = mount(<Provider store={store}><Table /></Provider>)
    
    expect(wrapper.find(Spinner)).toHaveLength(1)
    isTableDataValidStub.restore()
  })

  it('should not render spinner if tableData is available', () => {
    const isTableDataValidStub = sinon.stub(utils, utils.isTableDataValid.name).callsFake(() => true)
    const wrapper = mount(<Provider store={store}><Table /></Provider>)
    
    expect(wrapper.find(Spinner)).toHaveLength(0)
    isTableDataValidStub.restore()
  })
  it.skip('renders john_doe if fetchTableData request fails', () => {
    // TODO
  })
})
