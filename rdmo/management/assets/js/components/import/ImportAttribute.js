import React, { Component } from 'react'
import PropTypes from 'prop-types'
import uniqueId from 'lodash/uniqueId'

import { CodeLink, ShowLink } from '../common/Links'

import Fields from './common/Fields'
import Form from './common/Form'

import { codeClass } from '../../constants/elements'

const ImportAttribute = ({ config, attribute, importActions }) => {
  const showFields = () => importActions.updateElement(attribute, {show: !attribute.show})
  const toggleImport = () => importActions.updateElement(attribute, {import: !attribute.import})
  const updateAttribute = (key, value) => importActions.updateElement(attribute, {key: value})

  return (
    <li className="list-group-item">
      <div className="pull-right">
        <ShowLink element={attribute} onClick={showFields} />
      </div>
      <div className="checkbox">
        <label className="mr-5">
          <input type="checkbox" checked={attribute.import} onChange={toggleImport} />
          <strong>{gettext('Attribute')}</strong>
        </label>
        <CodeLink className={codeClass[attribute.type]} uri={attribute.uri} onClick={showFields} />
      </div>
      {
        attribute.show && <>
          <Form config={config} element={attribute} updateElement={updateAttribute} />
          <Fields element={attribute} />
        </>
      }
    </li>
  )
}

ImportAttribute.propTypes = {
  attribute: PropTypes.object.isRequired,
  importActions: PropTypes.object.isRequired
}

export default ImportAttribute