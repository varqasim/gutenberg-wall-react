import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AuthenticationMenu() {
  return (
    <Dialog>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <DialogTrigger asChild>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Login
              </NavigationMenuLink>
            </DialogTrigger>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <DialogTrigger asChild>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} bg-primary bg-primary text-primary-foreground`}
              >
                Register
              </NavigationMenuLink>
            </DialogTrigger>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Welcome to Gutenberg Wall!</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="login" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            Make changes to your account here.
          </TabsContent>
          <TabsContent value="register">Change your password here.</TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
