import type { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export const metadata: Metadata = {
  title: "Settings | TradeWithAgent",
  description: "Manage your account settings and preferences",
};

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      </div>

      <Tabs defaultValue="account" className="space-y-4">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Update your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="Demo User" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue="abc@gmail.com" />
                </div>
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Trading Preferences</CardTitle>
              <CardDescription>
                Customize your trading experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="risk-level">Risk Level</Label>
                    <p className="text-sm text-muted-foreground">
                      Set your preferred risk level for trading
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="risk-level" className="text-sm">
                      Low
                    </Label>
                    <Input
                      id="risk-level"
                      type="range"
                      className="w-[120px]"
                      min="1"
                      max="10"
                      defaultValue="5"
                    />
                    <Label htmlFor="risk-level" className="text-sm">
                      High
                    </Label>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="auto-trade" />
                  <Label htmlFor="auto-trade">
                    Enable automatic trading based on AI insights
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="notifications" defaultChecked />
                  <Label htmlFor="notifications">
                    Receive trading opportunity notifications
                  </Label>
                </div>
              </div>
              <Button>Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Manage how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="email-notifications" defaultChecked />
                  <Label htmlFor="email-notifications">
                    Email Notifications
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="push-notifications" defaultChecked />
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="sms-notifications" />
                  <Label htmlFor="sms-notifications">SMS Notifications</Label>
                </div>
              </div>
              <Button>Save Notification Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Customize the look and feel of your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <div className="flex items-center space-x-4">
                    <Button variant="outline" className="w-full">
                      Light
                    </Button>
                    <Button variant="outline" className="w-full">
                      Dark
                    </Button>
                    <Button variant="outline" className="w-full">
                      System
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Dashboard Layout</Label>
                  <div className="flex items-center space-x-4">
                    <Button variant="outline" className="w-full">
                      Compact
                    </Button>
                    <Button variant="outline" className="w-full">
                      Standard
                    </Button>
                    <Button variant="outline" className="w-full">
                      Expanded
                    </Button>
                  </div>
                </div>
              </div>
              <Button>Save Appearance Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="two-factor" />
                  <Label htmlFor="two-factor">
                    Enable Two-Factor Authentication
                  </Label>
                </div>
              </div>
              <Button>Update Password</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
