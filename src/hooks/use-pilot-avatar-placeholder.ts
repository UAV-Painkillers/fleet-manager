import { map } from "lodash-es";

const placeholder = [
    '/pilot-id-placeholder-image/languages_froggo_cropped.png',
    '/pilot-id-placeholder-image/racoon_magician_pablo_noob_cropped.png',
    '/pilot-id-placeholder-image/racoon_processing-cropped.gif',
    '/pilot-id-placeholder-image/racoon_scientist_chichi_pro_cropped.png'
]

function mapIdToIndex(id: number) {
    let current = 0;
    let index = 0;
    while (current < id) {
        index++;
        if (index >= placeholder.length) {
            index = 0;
        }
        current++;
    }
    return index;
}

export function usePilotAvatarPlaceholder(pilotId: number) {
    const index = mapIdToIndex(pilotId);
    return placeholder[index];
}