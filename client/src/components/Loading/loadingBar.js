import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './LoadingSpinner.module.scss'

const cx = classNames.bind(styles)

const LoadingBar = ({onLoadingComplete, }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          onLoadingComplete()
          return 0;
        }
        return prevProgress + 99;
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, [onLoadingComplete]);

  return (
    <div className={cx('loadingBar')}>
        <div className={cx('loadingBar_content')} style={{width: `${progress}%`}}>
        </div>
    </div>
  );
};

export default LoadingBar