import * as React from 'react';
import cxs from 'cxs';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cx from 'classnames';

const styles = {
  container: cxs({
    position: 'absolute',
    top: '0px',
    left: '0px',
    right: '0px',
    height: '100px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '64px',
    color: '#fff',
    ' div': {
      marginTop: '-20px',
      width: '100px',
      minHeight: '100px',
      borderRadius: '9999px',
      backgroundColor: '#282c34',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '50px'
    },
    ' p': {
      fontFamily: '"Nanum Pen Script", cursive',
      fontWeight: 'bold',
      margin: '10px 0 0 0'
    },
  })
}

export const DialogHeader: React.FC<{
  icon?: IconProp,
  title: string,
  color?: string
}> = props => {

  return (
    <div className={cx(
      styles.container,
      props.color && cxs({ color: props.color })
    )}>
      { props.icon && (
        <div>
          <FontAwesomeIcon icon={props.icon} />
        </div>
      ) }
      <p>
        { props.title }
      </p>
    </div>
  );
};
