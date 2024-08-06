import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Logo() {
    return (
        <div className="flex items-center">
            <Avatar className="size-32">
                <AvatarImage src={"./logo.png"} />
                <AvatarFallback>Logo</AvatarFallback>
            </Avatar>
            <span className="text-4xl font-extrabold sm:hidden">Trackr</span>
        </div>
    );
}
