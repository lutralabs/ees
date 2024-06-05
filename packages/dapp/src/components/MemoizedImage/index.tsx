import Image, { type ImageProps } from 'next/image';
import React from 'react';

export const MemoizedImage: React.FC<ImageProps> = React.memo(Image);
