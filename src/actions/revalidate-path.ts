"use server";

import { revalidatePath } from "next/cache";

export async function updateTimelineStep(
    uuid: string
) {
    revalidatePath(`/admin/convocatorias/${uuid}/cronograma`);
}
