import { AllElectron } from 'electron';
import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../../context/GlobalContext';
import ChangeOutputInput from './ChangeOutputInput/ChangeOutputInput';
import RangeInput from './RangeInput/RangeInput';

const { ipcRenderer }: AllElectron = window.require('electron');

const RangesForm = () => {
  const { dispatch, state } = useGlobalContext();
  const [fields, setFields] = useState({
    width: state.width,
    height: state.height,
    quality: 100,
    outputFolder: '',
  });
  const { width, height, quality, outputFolder } = fields;

  useEffect(() => {
    ipcRenderer.on('change:directory', (_, outputFolder) => {
      if (outputFolder) setFields({ ...fields, outputFolder });
    });
  }, [fields]);

  const handleChangeRange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    const isNumericField =
      name === 'quality' || name === 'width' || name === 'height';
    if (isNumericField)
      setFields({
        ...fields,
        [name]: parseInt(value),
      });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({
      type: 'SET_FILE_OPTIONS',
      payload: fields,
    });
  };

  return (
    <form className='form' onSubmit={handleSubmit}>
      <h2 className='form-heading'>CHANGE SIZE</h2>
      <RangeInput
        onChange={handleChangeRange}
        value={width}
        inputName={'width'}
        max={state.width}
      />
      <RangeInput
        onChange={handleChangeRange}
        value={height}
        inputName={'height'}
        max={state.height}
      />
      <h2 className='form-heading'>CHANGE QUALITY</h2>
      <RangeInput
        onChange={handleChangeRange}
        value={quality}
        inputName={'quality'}
      />
      <ChangeOutputInput value={outputFolder} />
      <button className='btn' type='submit'>
        COMPRESS
      </button>
    </form>
  );
};

export default RangesForm;
