import { Button } from "@/components/ui/button";

const Component: React.FC = () => {
    return (
        <div className="text-whiteflex items-center w-full p-6 z-50 dark:bg-white">
            PageTalk
            <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground">
                <Button variant="ghost" size="sm">
                    Privacy Policy
                </Button>
                <Button variant="ghost" size="sm">
                    Terms & Conditions
                </Button>
            </div>
        </div>
    );
};

export default Component;
