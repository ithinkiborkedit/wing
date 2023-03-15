import classNames from "classnames";
import { createRef, ReactNode, useEffect, useState } from "react";
import { DraggableCore } from "react-draggable";

export interface RightResizableWidgetProps {
  className?: string;
  children?: ReactNode | undefined;
}

export function RightResizableWidget(props: RightResizableWidgetProps) {
  const { className, children } = props;

  const [offset, setOffset] = useState(0);
  const resizeTarget = createRef<HTMLDivElement>();
  const [isResizing, setResizing] = useState(false);

  return (
    <div className={classNames("relative", className)} ref={resizeTarget}>
      <DraggableCore
        onStart={(event) => {
          if (resizeTarget.current) {
            document.body.style.cursor = "col-resize";

            setOffset(
              (event as MouseEvent).clientX - resizeTarget.current.clientWidth,
            );

            setResizing(true);
          }
        }}
        onDrag={(event) => {
          if (resizeTarget.current) {
            resizeTarget.current.style.width = `${
              offset + (event as MouseEvent).clientX
            }px`;
          }
        }}
        onStop={() => {
          if (resizeTarget.current) {
            document.body.style.cursor = "";

            resizeTarget.current.style.width = `${resizeTarget.current.clientWidth}px`;

            setResizing(false);
          }
        }}
      >
        <div
          className={classNames(
            "absolute inset-y-0 -right-0.5 w-1 cursor-col-resize transition-colors ease-in-out hover:bg-sky-500 z-20",
            isResizing && "bg-sky-500",
          )}
        />
      </DraggableCore>

      {children}
    </div>
  );
}
