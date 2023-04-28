import React, { Component } from 'react'
import PropTypes from 'prop-types'
import uniqueId from 'lodash/uniqueId'

import { CodeLink, ShowLink } from '../common/Links'

import Fields from './common/Fields'
import Form from './common/Form'

import { codeClass } from '../../constants/elements'

const ImportTask = ({ config, task, importActions }) => {
  const showFields = () => importActions.updateElement(task, {show: !task.show})
  const toggleImport = () => importActions.updateElement(task, {import: !task.import})
  const updateTask = (key, value) => importActions.updateElement(task, {key: value})

  return (
    <li className="list-group-item">
      <div className="pull-right">
        <ShowLink element={task} onClick={showFields} />
      </div>
      <div className="checkbox">
        <label className="mr-5">
          <input type="checkbox" checked={task.import} onChange={toggleImport} />
          <strong>{gettext('Task')}</strong>
        </label>
        <CodeLink className={codeClass[task.type]} uri={task.uri} onClick={showFields} />
      </div>
      {
        task.show && <>
          <Form config={config} element={task} updateElement={updateTask} />
          <Fields element={task} />
        </>
      }
    </li>
  )
}

ImportTask.propTypes = {
  task: PropTypes.object.isRequired,
  importActions: PropTypes.object.isRequired
}

export default ImportTask