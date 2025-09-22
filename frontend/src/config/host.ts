// Centralized host/organizer configuration
// This file contains the organizer ID that should be used across all host-related components

export const HOST_CONFIG = {
    // Hardcoded organizer ID for all mutations and queries
    DEFAULT_ORGANIZER_ID: "68ce60987f494f963e88a8cb",

    // Alternative organizer ID for testing different scenarios
    TEST_ORGANIZER_ID: "68ce60987f494f963e88a8cb",
} as const;

// Helper function to get the current organizer ID
// Hardcoded for this application - all mutations and queries use this ID
export const getCurrentOrganizerId = (): string => {
    // Hardcoded organizer ID for all operations
    return HOST_CONFIG.DEFAULT_ORGANIZER_ID;
};
