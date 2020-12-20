import cxs from 'cxs';
import * as React from 'react';
import cx from 'classnames';
import Color from 'color';
import { useIsSmall } from './GameContainer';

const activeStyles: cxs.CSSObject = {
  height: '66px',
  margin: '-4px 0 0 0 !important',
  borderBottomWidth: '2px !important',
  borderBottomLeftRadius: '6px',
  borderBottomRightRadius: '6px',
  boxShadow: 'none !important'
}

const styles = {
  container: cxs({
    border: '4px solid transparent',
    width: '64px',
    height: '64px',
    borderRadius: '10px',
    overflow: 'hidden',
    display: 'inline-block',
    margin: '4px',
    backgroundClip: 'content-box',
    cursor: 'default',
    pointerEvents: 'all',
  }),
  inner: cxs({
    height: '61px',
    borderBottomLeftRadius: '10px',
    borderBottomRightRadius: '10px',
    fontFamily: '"Nanum Pen Script", cursive',
    fontSize: '64px',
    margin: '-6px 0 0 0',
    textAlign: 'center'
  }),
  containerSmall: cxs({
    width: '40px',
    height: '40px',
    borderRadius: '6px',
    borderWidth: '2px',
    margin: '2px',
  }),
  innerSmall: cxs({
    height: '32px',
    borderBottomLeftRadius: '6px',
    borderBottomRightRadius: '6px',
    fontSize: '32px',
    margin: '0 0 0 0'
  }),
  innerActive: cxs(activeStyles),
  innerClickable: cxs({
    cursor: 'pointer',
    ':hover': {
      boxShadow: 'rgba(255, 255, 255, .4) 0px 14px 10px inset',
    },
    ':active': activeStyles,
  }),
};

export interface CustomTileProps {
  // kind: 1 | 2 | 3 | 4 | 5 | 6
  color: string,
  active?: boolean,
  border?: boolean,
  noContent?: boolean,
  clickable?: boolean,
  onClick?: () => void,
  borderColor?: string,
}

export const CustomTile: React.FC<CustomTileProps> = props => {
  const small = useIsSmall();

  return (
    <div
      className={cx(
        styles.container,
        small && styles.containerSmall,
        props.border && cxs({
          borderColor: Color(props.borderColor ?? props.color).darken(.4).toString()
        }),
        cxs({
          backgroundColor: !props.noContent ? Color(props.color).darken(.2).toString() : undefined,
        }),
        props.clickable && props.noContent && cxs({
          cursor: 'pointer',
          ':hover': {
            boxShadow: `${Color(props.color).alpha(.5).toString()} 0px 4px 13px 4px inset`,
          }
        })
      )}
      onClick={props.clickable ? props.onClick : undefined}
    >
      { !props.noContent && (
        <div className={cx(
          styles.inner,
          small && styles.innerSmall,
          props.active && styles.innerActive,
          !props.active && props.clickable && styles.innerClickable,
          cxs({
            backgroundColor: props.color,
            borderBottom: `3px solid ${Color(props.color).lighten(.2).toString()}`,
            color: Color(props.color).lighten(.6).toString(),
            textShadow: `0 -4px 0 ${Color(props.color).darken(.2).toString()}`
          })
        )}>
          {/* ['쇠', '모', '귀', '려', '휘', '줴', ][props.kind - 1] */}
          { props.children }
        </div>
      ) }
    </div>
  );
};

