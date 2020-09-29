export type Breakpoint =
    | boolean
    | 'auto'
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12;

export type Breakpoints = {
    xs?: Breakpoint;
    sm?: Breakpoint;
    md?: Breakpoint;
    lg?: Breakpoint;
    xl?: Breakpoint;
};
