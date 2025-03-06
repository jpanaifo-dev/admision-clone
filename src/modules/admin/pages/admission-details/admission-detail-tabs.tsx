import RequirementsStep from "@/modules/admin/pages/new-admissions/steps/requirements-step"
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SeatsView } from "./seats-view"
import { ScheduleList } from "./schedule-list"

const tabclass = "w-full bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none data-[state=active]:shadow-none data-[state=active]:bg-transparent"

export const AdmissionDetailTabs = () => {
    return (
        <section className="flex-1 bg-white shadow-sm rounded-sm border p-2 xl:p-4">
            <Tabs
                defaultValue="program-details"
                className="w-full overflow-x-auto"
            >
                <TabsList className="flex gap-4 bg-white justify-around w-full overflow-x-auto scrollbar-hide">
                    <TabsTrigger
                        value="program-details"
                        className={tabclass}
                    >
                        Requisitos
                    </TabsTrigger>
                    <TabsTrigger
                        value="study-plan"
                        className={tabclass}
                    >
                        Horarios
                    </TabsTrigger>
                    <TabsTrigger
                        value="inversion"
                        className={tabclass}
                    >
                        Vacantes
                    </TabsTrigger>
                </TabsList>
                <TabsContent
                    value="program-details"
                    className="py-6 px-4"
                >
                    <RequirementsStep />
                </TabsContent>

                <TabsContent
                    value="study-plan"
                    className="py-6 px-4"
                >
                    <ScheduleList />
                </TabsContent>
                <TabsContent
                    value="inversion"
                    className="py-6 px-4"
                >
                    <SeatsView />
                </TabsContent>
            </Tabs>
        </section>
    )
}
