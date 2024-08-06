import {
    Card,
    CardContent,
    CardTitle,
    CardHeader,
    CardFooter,
    CardDescription,
} from "../ui/card";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

import { Image, Link } from "@nextui-org/react";

interface PdfCardProps {
    title: string;
    size: string;
    link: string;
    onChatPressed: () => void;
}

const Component: React.FC<PdfCardProps> = ({
    title = "Sample PDF",
    size = "1.1 MB",
    link = "/",
    onChatPressed,
}) => {
    return (
        <Card className="m-5 max-w-sm">
            <CardHeader>
                <CardTitle className="text-lg">{title}</CardTitle>
                <CardDescription>{size}</CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="grid place-items-center items-center">
                <Image
                    src="https://poainc.org/wp-content/uploads/2018/06/pdf-placeholder.png"
                    alt="pdf placeholder"
                    height="100px"
                    width="100px"
                />
            </CardContent>
            <Separator />
            <CardFooter className="mt-5 space-x-5 items-center">
                <Button onClick={onChatPressed}>Enter Workspace</Button>
            </CardFooter>
        </Card>
    );
};

export default Component;
