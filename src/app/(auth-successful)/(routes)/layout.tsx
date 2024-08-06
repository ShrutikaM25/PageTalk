"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

import { useAppContext } from "@/state/appState";
import { clearLocalStorage } from "@/lib/localStorageControl";
import { BrowserRouter } from "react-router-dom";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClientComponentClient();
  const { state, dispatch } = useAppContext();
  const router = useRouter();

  const [selectedButton, setSelectedButton] = useState("");
  const [uploadedPDFs, setUploadedPDFs] = useState([]);

  const handlePDFUpload = async (file) => {
    // Upload the file to your storage service (e.g., Supabase Storage)
    const { data, error } = await supabase.storage
      .from('your-storage-bucket') // Replace 'your-storage-bucket' with your actual storage bucket name
      .upload(`pdfs/${file.name}`, file);
  
    if (error) {
      console.error('Error uploading PDF:', error);
      return;
    }
  
    // Update the state with the uploaded PDF
    setUploadedPDFs((prevPDFs) => [...prevPDFs, { name: file.name, url: data.Key }]);
  };
  

  const handleSidebarButtonClick = (buttonName: string) => {
    setSelectedButton(buttonName);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    dispatch({ type: "RESET_APP_STATE" });
    clearLocalStorage();
    router.replace("/");
  };

  const sidebarLinks: Record<string, string> = {
    Home: "/home",
  };

  const handlePDFSelection = (selectedPDF) => {
    // Implement the logic to handle the selected PDF
    console.log('Selected PDF:', selectedPDF);
  };  

  return (
    <div className="h-full">
      {/* Menu */}

      <Menubar className="rounded-none border-b border-none px-2 lg:px-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', color: 'white' }}>
        <MenubarMenu>
          <MenubarTrigger className="font-bold text-xl">
            PageTalk
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="relative">About Us</MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
  <MenubarTrigger>Workspaces</MenubarTrigger>
  <MenubarContent>
    <MenubarItem inset onClick={() => router.push('/home')}>
      Home
    </MenubarItem>
    {/* Add uploaded PDFs to the Workspaces dropdown */}
    {uploadedPDFs.map((pdf) => (
      <MenubarItem key={pdf.name} inset onClick={() => handlePDFSelection(pdf)}>
        {pdf.name}
      </MenubarItem>
    ))}
    {/* Other items in the Workspaces dropdown */}
  </MenubarContent>
</MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarSeparator />
            <MenubarItem inset disabled>
              Show Status Bar
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem inset>Hide Sidebar</MenubarItem>
            <MenubarItem disabled inset>
              Enter Full Screen
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      <div className="border-t">
        <div className="bg-background">
          <div className="grid sm:grid-cols-3 lg:grid-cols-5">
            {/* Sidebar */}
            <div className="pb-12 bg-gray-900 text-white" style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}>
              <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                  <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                    Discover
                  </h2>
                  {Object.keys(sidebarLinks).map((buttonName) => (
                    <Button
                      key={buttonName}
                      variant={
                        buttonName === selectedButton ? "secondary" : "ghost"
                      }
                      className="w-full justify-start"
                      onClick={() => {
                        handleSidebarButtonClick(buttonName);
                        router.push(sidebarLinks[buttonName]);
                      }}
                    >
                      {buttonName}
                    </Button>
                  ))}
                </div>
                <div className="py-2">
                  <h2 className="relative px-7 text-lg font-semibold tracking-tight">
                    Documents
                  </h2>
                  <ScrollArea className="h-[300px] px-1">
                    <div className="space-y-1 p-2">
                      {/* {playlists?.map((playlist, i) => (
                                                <Button
                                                    key={`${playlist}-${i}`}
                                                    variant="ghost"
                                                    className="w-full justify-start font-normal"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="mr-2 h-4 w-4"
                                                    >
                                                        <path d="M21 15V6" />
                                                        <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                                                        <path d="M12 12H3" />
                                                        <path d="M16 6H3" />
                                                        <path d="M12 18H3" />
                                                    </svg>
                                                    {playlist}
                                                </Button>
                                            ))} */}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </div>

            {/* Main */}
            <div className="col-span-3 lg:col-span-4 lg:border-l">
              <div>{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
