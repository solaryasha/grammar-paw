'use client';

import Image from 'next/image';

const Loader = () => {
  return (
    <div className='w-40 h-40 bg-white rounded-full flex items-center justify-center'>
      <div>
      <Image 
        src='/cat-playing.gif' 
        width="40"
        height="40" 
        alt="a cat shows from the box and hides back"
        className='rounded-full mx-auto'
      />
        <span className='text-black'>Checking ...</span>
      </div>
    </div>
  );
};

export default Loader;