function Icon({ size = 18, children, ...rest }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        {...rest}
      >
        {children}
      </svg>
    );
  }
  
  export const SearchIcon = (p) => (
    <Icon {...p}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></Icon>
  );
  export const FilterIcon = (p) => (
    <Icon {...p}><path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" /></Icon>
  );
  export const ChevronDownIcon = (p) => (
    <Icon {...p}><path d="m6 9 6 6 6-6" /></Icon>
  );
  export const TagIcon = (p) => (
    <Icon {...p}>
      <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
      <path d="M7 7h.01" />
    </Icon>
  );
  export const CalendarIcon = (p) => (
    <Icon {...p}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </Icon>
  );
  export const TrashIcon = (p) => (
    <Icon {...p}>
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </Icon>
  );
  export const CheckIcon = (p) => (
    <Icon {...p}><path d="M20 6 9 17l-5-5" /></Icon>
  );