import { AllElectron } from 'electron';
import React, { useEffect, useState } from 'react';
import { useGlobalDispatch } from '../../context/GlobalContext';
import RangeInput from './RangeInput/RangeInput';
import ChangeOutputInput from './ChangeOutputInput/ChangeOutputInput';

const { ipcRenderer }: AllElectron = window.require('electron');

const RangesForm = () => {
  const dispatch = useGlobalDispatch();
  const [fields, setFields] = useState({
    width: 0,
    height: 0,
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
    if (name === 'quality' || name === 'width' || name === 'height') {
      setFields({
        ...fields,
        [name]: parseInt(value),
      });
    }
  };

  return (
    <form
      className='form'
      onSubmit={() =>
        dispatch({
          type: 'SET_FILE_OPTIONS',
          payload: fields,
        })
      }
    >
      <h2 className='form-heading'>CHANGE SIZE</h2>
      <RangeInput
        onChange={handleChangeRange}
        value={width}
        inputName={'width'}
      />
      <RangeInput
        onChange={handleChangeRange}
        value={height}
        inputName={'height'}
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
