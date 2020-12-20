import * as React from 'react';
import cxs from 'cxs';

const styles = {
  container: cxs({
    height: '80px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: '"Nanum Pen Script", cursive',
    fontWeight: 'bold',
    fontSize: '32px',
    color: 'rgba(255, 255, 255, .8)',
    cursor: 'pointer',
    transition: '.15s background-color ease',
    ':hover': {
      color: '#fff',
      backgroundColor: 'rgba(255, 255, 255, .1)',
    }
  })
}

export const DialogButton: React.FC<{
  onClick?: () => void,
}> = props => {

  return (
    <div onClick={props.onClick} className={styles.container}>
      { props.children }
    </div>
  );
};
