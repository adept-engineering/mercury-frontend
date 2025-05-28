// Mock data for the NLP configuration
export const formatsData = {
    TRADACOMS: {
        name: 'TRADACOMS',
        versions: ['WARN01', 'VCHG02', 'TLOS01', 'STAT02']
    },
    EDIFACT: {
        name: 'EDIFACT',
        versions: ['RPRT02', 'RPRM03', 'RNWL02', 'RNCN04']
    },
    ODETTE: {
        name: 'ODETTE',
        versions: ['RNCN01', 'RMIT02', 'VIRM01']
    },
    TDCC: {
        name: 'TDCC',
        versions: ['TDCC01', 'TDCC02']
    },
    UCS: {
        name: 'UCS',
        versions: ['UCS01', 'UCS02']
    },
    X12: {
        name: 'X12',
        versions: ['X12_01', 'X12_02']
    }
};

export const versionDetails = {
    WARN01: {
        transactionSets: ['WARN01 - WARNING (1) 6-94'],
        segments: ['UNH - Message Header', 'BGM - Beginning of Message', 'DTM - Date/Time/Period', 'UNT - Message Trailer'],
        codeLists: ['Currency Codes', 'Country Codes', 'Date Format Codes']
    },
    VCHG02: {
        transactionSets: ['VCHG02 - Vehicle Charge (2) 7-95'],
        segments: ['UNH - Message Header', 'BGM - Beginning of Message', 'RFF - Reference', 'DTM - Date/Time/Period'],
        codeLists: ['Vehicle Types', 'Charge Types', 'Status Codes']
    },
    TLOS01: {
        transactionSets: ['TLOS01 - Transport Load Status (1) 5-96'],
        segments: ['UNH - Message Header', 'BGM - Beginning of Message', 'LOC - Place/Location', 'DTM - Date/Time/Period'],
        codeLists: ['Location Codes', 'Status Codes', 'Transport Modes']
    },
    STAT02: {
        transactionSets: ['STAT02 - Statistics (2) 8-97'],
        segments: ['UNH - Message Header', 'BGM - Beginning of Message', 'STA - Statistics', 'DTM - Date/Time/Period'],
        codeLists: ['Statistical Codes', 'Measurement Units', 'Period Codes']
    },
    RPRT02: {
        transactionSets: ['RPRT02 - Report (2) 3-98'],
        segments: ['UNH - Message Header', 'BGM - Beginning of Message', 'RFF - Reference', 'DTM - Date/Time/Period'],
        codeLists: ['Report Types', 'Reference Types', 'Status Codes']
    },
    RPRM03: {
        transactionSets: ['RPRM03 - Report Parameters (3) 4-99'],
        segments: ['UNH - Message Header', 'BGM - Beginning of Message', 'PAR - Parameters', 'DTM - Date/Time/Period'],
        codeLists: ['Parameter Types', 'Data Types', 'Validation Rules']
    },
    RNWL02: {
        transactionSets: ['RNWL02 - Renewal (2) 6-00'],
        segments: ['UNH - Message Header', 'BGM - Beginning of Message', 'RNW - Renewal', 'DTM - Date/Time/Period'],
        codeLists: ['Renewal Types', 'Status Codes', 'Period Codes']
    },
    RNCN04: {
        transactionSets: ['RNCN04 - Renewal Confirmation (4) 7-01'],
        segments: ['UNH - Message Header', 'BGM - Beginning of Message', 'CNF - Confirmation', 'DTM - Date/Time/Period'],
        codeLists: ['Confirmation Types', 'Status Codes', 'Response Codes']
    },
    RNCN01: {
        transactionSets: ['RNCN01 - Renewal Confirmation (1) 8-02'],
        segments: ['UNH - Message Header', 'BGM - Beginning of Message', 'CNF - Confirmation', 'DTM - Date/Time/Period'],
        codeLists: ['Confirmation Types', 'Status Codes', 'Response Codes']
    },
    RMIT02: {
        transactionSets: ['RMIT02 - Remittance (2) 9-03'],
        segments: ['UNH - Message Header', 'BGM - Beginning of Message', 'RMT - Remittance', 'DTM - Date/Time/Period'],
        codeLists: ['Payment Types', 'Currency Codes', 'Bank Codes']
    },
    VIRM01: {
        transactionSets: ['VIRM01 - Virtual (1) 10-04'],
        segments: ['UNH - Message Header', 'BGM - Beginning of Message', 'VIR - Virtual', 'DTM - Date/Time/Period'],
        codeLists: ['Virtual Types', 'Status Codes', 'Connection Types']
    }
};
