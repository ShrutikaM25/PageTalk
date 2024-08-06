import { CardContent, Card } from "@/components/ui/card";

interface Props {
    className?: string;
    title?: string;
    description?: string;
}

const msgCard: React.FC<Props> = ({
    title = "Lorem Ipsum",
    description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tincidunt purus ante. Etiam commodo arcu ex, ac venenatis lacus tristique sed. jebriegi verngier oginerobinei rongoeinr iovenrio beinrgoi ewnr gieniob eiohngioe nrio. uygiu.",
}) => {
    return (
        <Card className="p-2 mx-1 duration-300 ease-in-out hover:scale-105">
            <CardContent className="">
                <h3 className="font-semibold">{title}</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 overflow-x-auto">
                    {description}
                </p>
            </CardContent>
        </Card>
    );
};

export default msgCard;
