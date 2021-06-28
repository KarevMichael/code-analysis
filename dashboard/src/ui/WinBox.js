import { useCallback, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import WinBox from 'winbox/src/js/winbox.js';
import 'winbox/dist/css/winbox.min.css';

const useWinBox = (title, options) => {
  const ref = useRef(null);
  if (ref.current == null) {
    ref.current = new WinBox(title, options);
  }
  return ref;
};

export const WBox = ({
  title,
  // initial values
  x,
  y,
  width,
  height,
  // ...
  // callbacks
  onMove,
  onClose,
  onResize,
  // ...
  children
}) => {
  const ref = useWinBox(title, { x, y, width, height });
  const closed = useRef(false);
  const closedCb = useCallback(() => {
    closed.current = true;
    if (onClose) {
      onClose.call(ref.current);
    }
  }, [ref, onClose]);
  const { current: wb } = ref;
  wb.onmove = onMove;
  wb.onclose = closedCb;
  wb.onresize = onResize;
  // ...
  useEffect(() => {
    wb.setTitle(title);
  }, [wb, title]);
  // ...
  useEffect(() => {
    return () => {
      if (!closed.current) {
        wb.close();
      }
    };
  }, [wb]);
  return ReactDOM.createPortal(children, wb.body);
};
