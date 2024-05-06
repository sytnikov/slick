import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";

interface LoginDrawerProps {
  drawerHeader: string;
  drawerDescription?: string;
  children?: React.ReactNode;
}

export default function PopUpDrawer({
  drawerHeader,
  drawerDescription,
  children,
}: LoginDrawerProps) {
  return (
    <Drawer>
      <DrawerTrigger>
        <div
          className={
            "flex flex-row items-center justify-center rounded-md bg-black p-2 text-white"
          }
        >
          Book now
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <div className={"mb-4 flex flex-col items-center justify-center"}>
            <DrawerTitle>
              <h4 className={"mb-2 text-2xl font-bold"}>{drawerHeader}</h4>
            </DrawerTitle>
            {drawerDescription && (
              <DrawerDescription>{drawerDescription}</DrawerDescription>
            )}
          </div>
        </DrawerHeader>
        <div className={"flex w-full flex-row items-center justify-center p-4"}>
          {children}
        </div>
        <DrawerFooter>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
