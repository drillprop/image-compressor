import { AllElectron } from 'electron';
import React, { useEffect, useState, useCallback } from 'react';
import { useGlobalContext } from '../../context/GlobalContext';
import ChangeOutputInput from './ChangeOutputInput/ChangeOutputInput';
import RangeInput from './RangeInput/RangeInput';

const { ipcRenderer }: AllElectron = window.require('electron');

const RangesForm = () => {
  const { dispatch, state } = useGlobalContext();
  const [fields, setFields] = useState({
    width: state.width,
    height: state.height,
    quality: 80,
    outputFolder: '',
  });
  const { width, height, quality, outputFolder } = fields;

  useEffect(() => {
    ipcRenderer.on('change:directory', (_, outputFolder) => {
      if (outputFolder) setFields({ ...fields, outputFolder });
    });
  }, [fields]);

  useEffect(() => {
    ipcRenderer.on('image:compress', (_, compressedImgPath) => {
      if (compressedImgPath) dispatch({ type: 'COMPRESS_IMAGE_SUCCESS' });
    });
  }, [dispatch]);

  const handleChangeRange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.currentTarget;
      if (name === 'quality')
        setFields((fields) => ({ ...fields, [name]: parseInt(value) }));

      if (name === 'width' || name === 'height') {
        const oppositeAxis = name === 'width' ? 'height' : 'width';

        setFields((fields) => ({
          ...fields,
          [name]: parseInt(value),
          [oppositeAxis]: Math.ceil(
            (state[oppositeAxis] / state[name]) * parseInt(value)
          ),
        }));
      }
    },
    [state]
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({
      type: 'COMPRESS_IMAGE_START',
      payload: fields,
    });
    ipcRenderer.send('image:compress', { ...fields, filePath: state.filePath });
  };

  return (
    <form className='form' onSubmit={handleSubmit}>
      <h2 className='form-heading'>CHANGE SIZE</h2>
      <RangeInput
        onChange={handleChangeRange}
        value={width}
        inputName={'width'}
        max={state.width}
        bottomTooltip={`${width} px`}
      />
      <RangeInput
        onChange={handleChangeRange}
        value={height}
        inputName={'height'}
        max={state.height}
        bottomTooltip={`${height} px`}
      />
      <h2 className='form-heading'>CHANGE QUALITY</h2>
      <RangeInput
        onChange={handleChangeRange}
        value={quality}
        inputName={'quality'}
        bottomTooltip={`${quality} %`}
      />
      <ChangeOutputInput value={outputFolder} />
      <button className='btn' type='submit'>
        COMPRESS
      </button>
    </form>
  );
};

export default RangesForm;
