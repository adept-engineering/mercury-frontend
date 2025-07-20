'use client'

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { DataLayoutTable } from '@/components/data-layout/data-table';
import { useRouter } from 'next/navigation';

interface DataLayout {
  id: string;
  name: string;
  description: string;
  segmentsUsed: number;
}

interface DataLayoutContainerProps {
  dataLayouts: DataLayout[];
}

export function DataLayoutContainer({ dataLayouts }: DataLayoutContainerProps) {
  const router = useRouter();
  const handleCreateNew = () => {
    router.push('/data-layout/create');
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl text-foreground font-semibold">Data Layouts</h1>
        <Button onClick={handleCreateNew} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Layout
        </Button>
      </div>
      
      <DataLayoutTable data={dataLayouts} />
    </div>
  );
}

