import { ListItem } from './list-item';

interface TabItemListProps {
    items: string[];
    onItemView?: (item: string, index: number) => void;
}

export function TabItemList({ items, onItemView }: TabItemListProps) {
    return (
        <div className="space-y-2">
            {items.map((item, index) => (
                <ListItem
                    key={index}
                    label={item}
                    onView={() => onItemView?.(item, index)}
                />
            ))}
        </div>
    );
} 