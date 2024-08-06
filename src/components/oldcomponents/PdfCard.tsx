import React from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Divider,
    Link,
    Image,
    Button,
} from "@nextui-org/react";

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
        <div className="p-5">
            <Card className="max-w-[200px]">
                <CardHeader className="flex gap-3">
                    <div className="flex flex-col">
                        <p className="text-md overflow-clip">{title}</p>
                        <p className="text-small text-default-500">{size}</p>
                    </div>
                </CardHeader>
                <Divider />
                <CardBody className="items-center">
                    <Image
                        src="https://poainc.org/wp-content/uploads/2018/06/pdf-placeholder.png"
                        alt="pdf placeholder"
                        height="100px"
                        width="100px"
                    />
                </CardBody>
                <Divider />
                <CardFooter className="items-center">
                    <Button color="primary" variant="light" onPress={onChatPressed}>
                        Chat
                    </Button>
                    <Link isExternal href={link}>
                    <Button color="primary" variant="light">
                        Download
                    </Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Component;
