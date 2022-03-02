import { ReactElement } from "react";
import { Column } from "react-table";

export type SortById<T> = Extract<keyof T, string> | "name";

export type TableProps<T extends object> = {
  createBtnIcon?: ReactElement;
  createBtnText?: string;
  createBtnOnClick?: () => void;
  columns: Column<T>[];
  data: T[];
  onSearch: (value: string) => void;
  dataLoading: boolean;
  pagination?: boolean;
  handlePagination?: (page: number, limit: number) => void;
  totalDocs?: number;
  sortById?: SortById<T>;
  columnsVisibility?: {
    base?: number[];
    sm?: number[];
    md?: number[];
    lg?: number[];
    xl?: number[];
    "2xl"?: number[];
  };
  secondaryButton?: ReactElement;
};
