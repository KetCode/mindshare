import { LucideIcon } from "lucide-react";

interface StatItem {
    label: string;
    count: number;
    icon: LucideIcon;
    color: string;
}

interface StatsBadgesProps {
    stats: StatItem[];
}

export function StatsBagdes({ stats }: StatsBadgesProps) {

    return (
        <div className="flex flex-wrap items-center gap-2">
            {stats.map((stat) => {;
                return (
                    <div key={stat.label} className={`flex h-7 items-center justify-center gap-2 rounded-xl px-3 py-[6px] ${stat.color}`}>
                        <stat.icon className="h-[13px] w-[13px] text-gray-900" />

                        <span className="text-xs font-medium text-gray-900">
                            <strong>{stat.count}</strong> {stat.label}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}
