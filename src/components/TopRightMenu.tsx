import * as React from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cxs from 'cxs';

const styles = {
  container: cxs({
    display: 'inline-flex',
    position: 'absolute',
    top: '20px',
    right: '20px',
  }),
  button: cxs({
    padding: '6px 12px',
    borderRadius: '10px',
    backgroundColor: 'rgba(0, 0, 0, .1)',
    border: '1px solid rgba(0, 0, 0, .3)',
    fontFamily: '"Nanum Pen Script", cursive',
    fontWeight: 'bold',
    fontSize: '22px',
    color: 'rgba(255, 255, 255, .8)',
    outline: 'none',
    marginRight: '5px',
    transition: '.1s all ease',
    cursor: 'pointer',
    ':hover': {
      border: '1px solid rgba(0, 0, 0, .3)',
      backgroundColor: 'rgba(0, 0, 0, .2)',
      color: 'rgba(255, 255, 255, .7)',
    },
    ':active': {
      transition: '.05s all ease',
      backgroundColor: 'rgba(0, 0, 0, .3)',
    }
  })
}

export const TopRightMenu: React.FC<{
  actions: Array<{
    icon?: IconProp,
    text?: string,
    onClick?: () => void,
  }>
}> = props => {

  return (
    <div className={styles.container}>
      { props.actions.map((action, id) => (
        <button
          className={styles.button}
          onClick={action.onClick}
        >
          { action.text }
          { action.text && action.icon && <>&nbsp;&nbsp;</> }
          { action.icon && <FontAwesomeIcon icon={action.icon} /> }
        </button>
      )) }
    </div>
  );
};
