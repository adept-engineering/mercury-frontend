import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"

export const EntityCard = ({ title, details }: { title: string, details: Array<{ name: string, value: string }> }) => {
    return (
        <Card className=" mb-0 ">
            <CardHeader className="bg-gray-100 px-6 py-4  rounded-t-xl border-b">
                <CardTitle className="text-sm font-semibold text-foreground uppercase tracking-wide">
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                {!details || details.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
                        <div className="text-muted-foreground text-sm mb-2">
                            No data available
                        </div>
                        <div className="text-xs text-muted-foreground/70">
                            No {title.toLowerCase()} information found
                        </div>
                    </div>
                ) : (
                    details.map((item, index) => (
                        <div key={index} className={`flex justify-between items-start px-6 py-4 ${index !== details.length - 1 ? 'border-b border-border' : ''
                            }`}>
                            <span className="text-sm text-muted-foreground font-medium min-w-0 flex-1">
                                {item.name}
                            </span>
                            <span className="text-sm text-right font-medium max-w-xs break-words">
                                {item.value}
                            </span>
                        </div>
                    ))
                )}
            </CardContent>
        </Card>
    )
}