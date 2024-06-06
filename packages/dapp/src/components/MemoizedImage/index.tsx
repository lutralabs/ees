import React from 'react';
import Image, { type ImageProps } from 'next/image';

export const MemoizedImage: React.FC<ImageProps> = React.memo(Image);
