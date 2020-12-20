import * as React from 'react';
import cxs from 'cxs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import cx from 'classnames';

const styles = {
  pageContainer: cxs({
    position: 'fixed',
    top: '0px',
    left: '0px',
    right: '0px',
    bottom: '0px',
    display: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, .4)',
    opacity: 0,
    transition: '.3s opacity ease'
  }),
  pageContainerOpen: cxs({
    display: 'flex',
    opacity: 1
  }),
  dialogContainer: cxs({
    width: '400px',
    height: '600px',
    overflow: 'visible',
    backgroundColor: 'rgba(0, 0, 0, .6)',
    borderRadius: '24px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
    ' p': {
      color: '#d4d4d4',
      fontSize: '18px',
      lineHeight: 1.2,
      margin: '4px 32px',
      ' a': {
        color: 'white !important',
      }
    }
  }),
  closeContainer: cxs({
    borderRadius: '999px',
    width: '100px',
    height: '100px',
    position: 'fixed',
    top: '40px',
    right: '40px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    transition: '.15s background-color ease',
    ':hover': {
      backgroundColor: 'rgba(255, 255, 255, .2)'
    },
    ':active': {
      transition: '.05s background-color ease',
      backgroundColor: 'rgba(255, 255, 255, .3)'
    },
  })
}

export const Dialog: React.FC<{
  isOpen: boolean,
  onClose?: () => void,
  cantClose?: boolean,
}> = props => {
  return (
    <div className={cx(
      styles.pageContainer,
      props.isOpen && styles.pageContainerOpen
    )}>
      <div className={styles.dialogContainer}>
        { props.children }
      </div>
      { !props.cantClose && (
        <div className={styles.closeContainer} onClick={props.onClose}>
          <FontAwesomeIcon icon={faTimes} size="4x" />
        </div>
      ) }
    </div>
  );
};
