export function formatEDIData(ediData: string) {
    return ediData.split('\n').map((segment, index) => {
        const [segmentId, ...elements] = segment.split('*');
        return {
            segmentId,
            elements: elements.filter(Boolean),
            raw: segment
        };
    });
}

export function formatNLPData(nlpData: string) {
    try {
        return JSON.parse(nlpData);
    } catch (error) {
        return { error: "Invalid NLP data format" };
    }
} 