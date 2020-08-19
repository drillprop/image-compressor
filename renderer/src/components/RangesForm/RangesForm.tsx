import { AllElectron, IpcRendererEvent } from 'electron';
import React, { useCallback, useEffect, useState } from 'react';
import { useGlobalContext } from '../../context/GlobalContext';
import ChangeOutputInput from './ChangeOutputInput/ChangeOutputInput';
import RangeInput from './RangeInput/RangeInput';
import slash from 'slash';

const { ipcRenderer, remote }: AllElectron = window.require('electron');

const path = slash(remote.app.getPath('home') + '/image-compressor');

const RangesForm = () => {
  const { dispatch, state } = useGlobalContext();
  const [fields, setFields] = useState({
    width: state.width,
    height: state.height,
    quality: 80,
    outputFolder: path,
  });
  const { width, height, quality, outputFolder } = fields;

  useEffect(() => {
    const changeDirectory = (_: IpcRendererEvent, outputFolder: string) => {
      if (outputFolder) setFields((fields) => ({ ...fields, outputFolder }));
    };
    ipcRenderer.on('change:directory', changeDirectory);
    return () => {
      ipcRenderer.removeListener('change:directory', changeDirectory);
    };
  }, [outputFolder]);

  useEffect(() => {
    const compressImage = (_: IpcRendererEvent, compressedImgPath: string) => {
      if (compressedImgPath)
        dispatch({
          type: 'COMPRESS_IMAGE_SUCCESS',
          payload: compressedImgPath,
        });
    };
    ipcRenderer.on('image:compress', compressImage);
    return () => {
      ipcRenderer.removeListener('image:compress', compressImage);
    };
  }, [dispatch]);

  const handleChangeRange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.currentTarget;
      if (name === 'quality')
        setFields((fields) => ({ ...fields, [name]: parseInt(value) }));

      if (name === 'width' || name === 'height') {
        const oppositeAxis = name === 'width' ? 'height' : 'width';
        const oppositeAxisValue = Math.ceil(
          (state[oppositeAxis] / state[name]) * parseInt(value)
        );
        setFields((fields) => ({
          ...fields,
          [name]: parseInt(value),
          [oppositeAxis]: oppositeAxisValue,
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
