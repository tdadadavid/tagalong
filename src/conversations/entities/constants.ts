type VISIBILITY = 'PUBLIC' | 'PRIVATE' | 'SELECTED_FEW';

export const SPACE_VISIBILITY: Record<VISIBILITY, string> = {
    PUBLIC: 'public',
    PRIVATE: 'private',
    SELECTED_FEW: 'selected_few'
} as const;