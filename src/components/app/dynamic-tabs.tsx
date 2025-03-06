import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const tabClass = "w-full bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none data-[state=active]:shadow-none data-[state=active]:bg-transparent";

interface IProps {
    tabs: { label: string; value: string; content: React.ReactNode }[];
    defaultValue: string;
}

export const DynamicTabs = (props: IProps) => {
    const { tabs, defaultValue } = props;

    return (
        <section className="flex-1 bg-white shadow-sm rounded-sm border p-2 xl:p-4">
            <Tabs defaultValue={defaultValue} className="w-full overflow-x-auto">
                <TabsList className="flex gap-4 bg-white justify-around w-full overflow-x-auto scrollbar-hide">
                    {tabs.map((tab) => (
                        <TabsTrigger key={tab.value} value={tab.value} className={tabClass}>
                            {tab.label}
                        </TabsTrigger>
                    ))}
                </TabsList>
                {tabs.map((tab) => (
                    <TabsContent key={tab.value} value={tab.value} className="py-6 px-4">
                        {tab.content}
                    </TabsContent>
                ))}
            </Tabs>
        </section>
    );
};
