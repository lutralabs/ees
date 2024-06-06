import React from 'react';
import SVG, { type Props as SVGProps } from 'react-inlinesvg';

export const MemoizedSVG: React.FC<SVGProps> = React.memo(SVG);
