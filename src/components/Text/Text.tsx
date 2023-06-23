import React, { forwardRef, useRef } from "react";
import cx from "classnames";
import { useMergeRefs } from "../../hooks";
import VibeComponentProps from "../../types/VibeComponentProps";
import VibeComponent from "../../types/VibeComponent";
import { getTestId } from "../../tests/test-ids-utils";
import { ComponentDefaultTestId } from "../../tests/constants";
import { ElementContent } from "../../types";
import { TextSize, TextWeight, TextColor, TextAlign } from "./TextConstants";
import { useEllipsisClass, useGlobalTextClass, useTooltipProps } from "./TextHooks";
import Tooltip, { TooltipProps } from "../Tooltip/Tooltip";
import styles from "./Text.module.scss";

export interface TextProps extends VibeComponentProps {
  /**
   * The element tag of the text component
   */
  element?: string;
  /**
   * The textual content
   */
  children: ElementContent;
  size?: TextSize;
  weight?: TextWeight;
  color?: TextColor;
  align?: TextAlign;
  /**
   * When the text is too long, cut the end of the text and display instead of it three dots (...)
   */
  ellipsis?: boolean;
  /**
   * Use this prop combined with the boolean ellipsis prop for truncate the text and add an ellipsis after a certain number of lines
   */
  maxLines?: number;
  /**
   * All props are passed to the tooltip displayed when hovering over the text. By default, the tooltip will display when text contains an ellipsis and will show the full text
   */
  tooltipProps?: TooltipProps;
  /**
   * Hide tooltip when hovering the text, by default the tooltip swill display when text contains an ellipsis
   */
  withoutTooltip?: boolean;
}

const Text: VibeComponent<TextProps, HTMLElement> = forwardRef(
  (
    {
      className,
      id,
      children,
      tooltipProps,
      "data-testid": dataTestId = getTestId(ComponentDefaultTestId.TEXT, id),
      element = "span",
      size = "medium",
      weight = "normal",
      color = "primary",
      align = "start",
      ellipsis = true,
      maxLines = 1,
      withoutTooltip = false
    },
    ref
  ) => {
    const componentRef = useRef(null);
    const mergedRef = useMergeRefs({ refs: [ref, componentRef] });

    const textGlobalClass = useGlobalTextClass(size, weight);
    const { ref: overrideRef, class: ellipsisClass } = useEllipsisClass(mergedRef, ellipsis, maxLines);
    const overrideTooltipProps = useTooltipProps(
      componentRef,
      withoutTooltip,
      ellipsis,
      tooltipProps,
      children
    ) as TooltipProps;

    return (
      <Tooltip {...overrideTooltipProps}>
        {React.createElement(
          element,
          {
            id,
            "data-testid": dataTestId,
            className: cx(textGlobalClass, styles.text, styles[color], styles[align], ellipsisClass, className),
            ref: overrideRef
          },
          children
        )}
      </Tooltip>
    );
  }
);

export default Text;
