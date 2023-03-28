import React, { Component, useState } from 'react'
import PropTypes from 'prop-types'
import { Tabs, Tab } from 'react-bootstrap';

import Checkbox from '../forms/Checkbox'
import Number from '../forms/Number'
import OrderedMultiSelect from '../forms/OrderedMultiSelect'
import MultiSelect from '../forms/MultiSelect'
import Select from '../forms/Select'
import Text from '../forms/Text'
import Textarea from '../forms/Textarea'
import UriPrefix from '../forms/UriPrefix'

import { BackButton, SaveButton, DeleteButton } from '../common/Buttons'

import OptionSetInfo from '../info/OptionSetInfo'
import DeleteOptionSetModal from '../modals/DeleteOptionSetModal'

import useDeleteModal from '../../hooks/useDeleteModal'

const EditOptionSet = ({ config, optionset, elements, elementActions }) => {

  const { parent, conditions, options, questions, providers } = elements

  const optionsetQuestions = questions.filter(e => optionset.questions.includes(e.id))

  const updateOptionSet = (key, value) => elementActions.updateElement(optionset, {[key]: value})
  const storeOptionSet = (back) => elementActions.storeElement('optionsets', optionset, back)
  const deleteOptionSet = () => elementActions.deleteElement('optionsets', optionset)

  const createOption = () => elementActions.createElement('options', { optionset })
  const createCondition = () => elementActions.createElement('conditions', { optionset })

  const [showDeleteModal, openDeleteModal, closeDeleteModal] = useDeleteModal()

  const info = <OptionSetInfo optionset={optionset} elements={elements} />

  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <div className="pull-right">
          <BackButton />
          <SaveButton element={optionset} onClick={storeOptionSet} />
          <SaveButton element={optionset} onClick={storeOptionSet} back={true}/>
        </div>
        {
          optionset.id ? <>
            <strong>{gettext('Option set')}{': '}</strong>
            <code className="code-options">{optionset.uri}</code>
          </> : <strong>{gettext('Create option set')}</strong>
        }
      </div>

      {
        parent && parent.question && <div className="panel-body panel-border">
          <p dangerouslySetInnerHTML={{
            __html:interpolate(gettext('This option set will be added to the question <code class="code-questions">%s</code>.'), [parent.question.uri])
          }} />
        </div>
      }

      {
        optionset.id && <div className="panel-body panel-border">
          { info }
        </div>
      }

      <div className="panel-body">
        <div className="row">
          <div className="col-sm-6">
            <UriPrefix config={config} element={optionset} field="uri_prefix"
                       onChange={updateOptionSet} />
          </div>
          <div className="col-sm-6">
            <Text config={config} element={optionset} field="uri_path"
                  onChange={updateOptionSet} />
          </div>
        </div>

        <Textarea config={config} element={optionset} field="comment"
                  rows={4} onChange={updateOptionSet} />

        <div className="row">
          <div className="col-sm-6">
            <Checkbox config={config} element={optionset} field="locked"
                      onChange={updateOptionSet} />
          </div>
          <div className="col-sm-6">
            <Number config={config} element={optionset} field="order"
                    onChange={updateOptionSet} />
          </div>
        </div>

        <OrderedMultiSelect config={config} element={optionset} field="options"
                            options={options} verboseName="option"
                            onChange={updateOptionSet} onCreate={createOption} />

        <MultiSelect config={config} element={optionset} field="conditions"
                     options={conditions} verboseName="condition"
                     onChange={updateOptionSet} onCreate={createCondition} />

        <Select config={config} element={optionset} field="provider_key"
                options={providers} onChange={updateOptionSet} />
      </div>

      <div className="panel-footer">
        <div className="pull-right">
          <BackButton />
          <SaveButton element={optionset} onClick={storeOptionSet} />
          <SaveButton element={optionset} onClick={storeOptionSet} back={true}/>
        </div>
        <DeleteButton element={optionset} onClick={openDeleteModal} />
      </div>

      <DeleteOptionSetModal optionset={optionset} info={info} show={showDeleteModal}
                            onClose={closeDeleteModal} onDelete={deleteOptionSet} />
    </div>
  )
}

EditOptionSet.propTypes = {
  config: PropTypes.object.isRequired,
  optionset: PropTypes.object.isRequired,
  elements: PropTypes.object.isRequired,
  elementActions: PropTypes.object.isRequired
}

export default EditOptionSet
