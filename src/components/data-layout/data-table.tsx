'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DataLayout {
  id: string;
  name: string;
  description: string;
  segmentsUsed: number;
}

interface DataLayoutTableProps {
  data: DataLayout[];
}

export function DataLayoutTable({ data }: DataLayoutTableProps) {
  const handleEdit = (id: string) => {
    // TODO: Handle edit action
    console.log('Edit data layout:', id);
  };

  const handleDelete = (id: string) => {
    // TODO: Handle delete action
    console.log('Delete data layout:', id);
  };

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-6 text-center border border-gray-200 rounded-md">
        <div className="text-muted-foreground text-sm mb-2">No data layouts found</div>
        <div className="text-muted-foreground text-xs">Create your first data layout to get started</div>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-md">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="font-medium">Name</TableHead>
            <TableHead className="font-medium">Description</TableHead>
            <TableHead className="font-medium">Segments Used</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((layout) => (
            <TableRow key={layout.id} className="hover:bg-gray-50">
              <TableCell className="font-medium">{layout.name}</TableCell>
              <TableCell className="text-muted-foreground">
                {layout.description}
              </TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                  {layout.segmentsUsed}
                </span>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEdit(layout.id)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleDelete(layout.id)}
                      className="text-red-600"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 