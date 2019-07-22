export interface IHeaderProps {
  noFilter?: boolean;
  handleSearch?: (query: string) => void;
  handleFilter?: (values: any) => void;
}
