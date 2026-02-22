interface DataGridItem {
  label: string;
  value: React.ReactNode;
}

interface DataGridProps {
  items: DataGridItem[];
  columns?: 2 | 3;
}

export function DataGrid({ items, columns = 2 }: DataGridProps) {
  const gridCols = columns === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2';
  return (
    <dl className={`grid grid-cols-1 ${gridCols} gap-4`}>
      {items.map((item, i) => (
        <div key={i} className="py-2">
          <dt className="text-xs text-gray-400 uppercase tracking-wider">{item.label}</dt>
          <dd className="mt-1 text-sm font-medium text-cg-dark">{item.value || '-'}</dd>
        </div>
      ))}
    </dl>
  );
}
