import { Button } from '@/components/ui/button';

interface ListItemProps {
    label: string;
    onView?: () => void;
    showViewButton?: boolean;
}

export function ListItem({ label, onView, showViewButton = true }: ListItemProps) {
    return (
        <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
            <span className="font-medium">{label}</span>
            {showViewButton && (
                <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600 border-red-200 hover:bg-red-50"
                    onClick={onView}
                >
                    View
                </Button>
            )}
        </div>
    );
} 