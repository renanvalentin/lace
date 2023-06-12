/* eslint-disable  @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-unnecessary-condition */
import React from 'react';

import {
  Cell,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import { PieChartGradientColor } from './constants';

import type { ColorValueHex } from '../../types';
import type { CellProps, TooltipProps } from 'recharts';

type PieChartDataProps = Partial<{
  overrides: CellProps;
}>;

type PieChartColor = ColorValueHex | PieChartGradientColor;

type CustomData = object;

interface Data {
  name: string;
  value: number;
}

type ValueType = (number | string)[] | number | string;
type NameType = number | string;

interface PieChartBaseProps<T extends CustomData | Data> {
  colors: PieChartColor[];
  data: (PieChartDataProps & T)[];
  direction?: 'clockwise' | 'counterclockwise';
  tooltip?: TooltipProps<ValueType, NameType>['content'];
}
interface PieChartCustomKeyProps<T extends CustomData>
  extends PieChartBaseProps<T> {
  nameKey: keyof T;
  valueKey: keyof T;
}
interface PieChartDefaultKeyProps<T extends Data> extends PieChartBaseProps<T> {
  nameKey?: 'name';
  valueKey?: 'value';
}

export type PieChartProps<T extends CustomData | Data> = T extends Data
  ? PieChartDefaultKeyProps<T>
  : T extends CustomData
  ? PieChartCustomKeyProps<T>
  : never;

const formatPieColor = (color: PieChartColor): string =>
  PieChartGradientColor[color as PieChartGradientColor]
    ? `url(#${color})`
    : color;

/**
 * **Important**: The length of `colors` array needs to be greater than or equal to the length of `data` array.
 * The `data` items that do not have corresponding `color` definition will not be rendered.
 *
 * @param colors set of colors that will be used to render the pies in defined order
 * @param data dataset used to render the pies
 * @param data[].overrides Recharts Cell props
 * @param direction defines how pies will be rendered (clockwise or counterclockwise)
 * @param nameKey object key of a `data` item that will be used as name (displayed in the tooltip)
 * @param tooltip component accepted by Recharts Tooltip `content` prop
 * @param valueKey object key of a `data` item that will be used as value (displayed in the tooltip)
 */
export const PieChart = <T extends CustomData | Data>({
  colors,
  data,
  direction = 'clockwise',
  nameKey = 'name',
  tooltip,
  valueKey = 'value',
}: Readonly<PieChartProps<T>>): JSX.Element => (
  <ResponsiveContainer aspect={1}>
    <RechartsPieChart>
      <defs>
        <linearGradient id={PieChartGradientColor.LaceLinearGradient}>
          <stop offset="-18%" stopColor="#FDC300" />
          <stop offset="120%" stopColor="#FF92E1" />
        </linearGradient>
      </defs>
      {tooltip && <Tooltip content={tooltip} />}
      <Pie
        data={data.slice(0, colors.length)}
        nameKey={nameKey}
        dataKey={valueKey}
        innerRadius="90%"
        outerRadius="100%"
        cornerRadius="50%"
        paddingAngle={data.length > 1 ? 4 : 0}
        stroke="none"
        startAngle={90}
        endAngle={direction === 'clockwise' ? -270 : 450}
      >
        {data.length === 1 && (
          <Cell fill={formatPieColor(colors[0])} {...data[0].overrides} />
        )}
        {data.length > 1 &&
          data.map((_, index) => (
            <Cell
              key={index}
              fill={formatPieColor(colors[index])}
              {...(data[index].overrides ?? {})}
            />
          ))}
      </Pie>
    </RechartsPieChart>
  </ResponsiveContainer>
);
