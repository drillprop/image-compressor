import { AllElectron } from 'electron';
import React from 'react';
import { ReactComponent as ArrowLeft } from '../../assets/arrow-left.svg';
import { ReactComponent as ArrowRight } from '../../assets/arrow-right.svg';
import { useGlobalContext } from '../../context/GlobalContext';

const { shell }: AllElectron = window.require('electron');

const SuccessView = () => {
  const { dispatch, state } = useGlobalContext();
  return (
    <div className='mt-8'>
      <h2
        className='text-xl font-bold leading-10 cursor-pointer'
        onClick={async () => {
          await shell.openPath(state.outputFolder);
          shell.openPath(state.compressedImgPath);
        }}
      >
        Successfully compressed files!
        <br />
        Go to <span className='text-green-700'>your files.</span>
      </h2>
      <div>
        <button
          className='flex mt-10 justify-center bg-green-700 text-white font-bold p-4 rounded w-full'
          type='submit'
          onClick={() => dispatch({ type: 'RESTART' })}
        >
          <span className='mr-2'>UPLOAD ANOTHER FILES</span>
          <ArrowRight />
        </button>
        <button
          className='mt-12 text-gray-600 font-bold p-4 rounded w-full border-2 border-dashed border-gray-500'
          type='submit'
          onClick={() => dispatch({ type: 'GO_BACK' })}
        >
          <div className='flex justify-center'>
            <ArrowLeft className='mr-2' />
            <span>TRY AGAIN</span>
          </div>
          <span className='font-normal block mt-1'>
            with different settings
          </span>
        </button>
      </div>
    </div>
  );
};

export default SuccessView;
