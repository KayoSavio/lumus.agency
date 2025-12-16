import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    active?: boolean;
}

export function GlassCard({ children, className, active, ...props }: GlassCardProps) {
    return (
        <div
            className={cn(
                "glass-panel rounded-2xl p-6 transition-all duration-300 hover:border-lumus-blue/30 relative group overflow-hidden",
                active && "border-lumus-blue/50 shadow-[0_0_30px_rgba(100,198,252,0.1)]",
                className
            )}
            {...props}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">{children}</div>
        </div>
    );
}
