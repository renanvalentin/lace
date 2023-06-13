import React from 'react';

import * as Dialog from '@radix-ui/react-dialog';
import classNames from 'classnames';

import { Box } from '../box';

import * as cx from './side-drawer-content.css';

type Props = Omit<Dialog.DialogContentProps, 'className'>;

export const Content = ({
  children,
  ...props
}: Readonly<Props>): JSX.Element => (
  <Dialog.Content {...props} className={classNames(cx.container, cx.storybook)}>
    <Box className={cx.content}>{children}</Box>
  </Dialog.Content>
);