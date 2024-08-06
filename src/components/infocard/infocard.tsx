import {
    CardTitle,
    CardDescription,
    CardHeader,
    CardContent,
    CardFooter,
    Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface InfocardProps {
    title?: string;
    subtitle?: string;
    description?: string;
    button?: boolean;
    buttonText?: string;
    footer?: boolean;
    badge?: boolean;
    badgeText?: string;
    avatar?: boolean;
    avatarImg?: string;
    avatarImgAlt?: string;
    avatarFallbackText?: string;
    className?: string;
}

const Component: React.FC<InfocardProps> = ({
    title = "Lorem Ipsum",
    subtitle = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tincidunt purus ante.",
    description = "Etiam commodo arcu ex, ac venenatis lacus tristique sed. Morbi consectetur libero et mi auctor vehicula. Vivamus eu diam turpis. Proin at ligula at orci malesuada rutrum et laoreet lectus. Phasellus elementum imperdiet semper. Praesent at diam ultricies, pharetra mauris a, semper leo.",
    button = false,
    buttonText = "Lorem ipsum",
    footer = true,
    badge = true,
    badgeText = "AI Research",
    avatar = true,
    avatarImg = "https://cdn.iconscout.com/icon/free/png-256/free-avatar-372-456324.png",
    avatarImgAlt = "Placeholder Logo",
    avatarFallbackText = "Fallback",
    className = "",
}) => {
    return (
        <Card className={cn("bg-opacity-50 shadow-lg lg:max-w-lg", className)}>
            <CardHeader className="p-4">
                <CardTitle className="text-lg font-semibold">{title}</CardTitle>
                <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
                    {subtitle}
                </CardDescription>
            </CardHeader>
            <CardContent className="p-4">
                <div className="space-y-2">
                    <p className="text-sm">{description}</p>
                    {button && (
                        <Button className="mt-4" variant="outline">
                            {buttonText}
                        </Button>
                    )}
                </div>
            </CardContent>
            {footer && (
                <CardFooter className="p-4 flex justify-between items-center">
                    {badge && <Badge>{badgeText}</Badge>}
                    {avatar && (
                        <Avatar>
                            <AvatarImage alt={avatarImgAlt} src={avatarImg} />
                            <AvatarFallback>
                                {avatarFallbackText}
                            </AvatarFallback>
                        </Avatar>
                    )}
                </CardFooter>
            )}
        </Card>
    );
};

export default Component;
