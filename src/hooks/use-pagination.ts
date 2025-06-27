import { useState, useMemo, useEffect } from 'react';

interface UsePaginationProps<T> {
    data: T[];
    itemsPerPage: number;
    storageKey?: string; // Optional unique key for localStorage
}

interface UsePaginationReturn<T> {
    currentPage: number;
    paginatedData: T[];
    totalPages: number;
    startIndex: number;
    endIndex: number;
    goToPage: (page: number) => void;
    nextPage: () => void;
    previousPage: () => void;
    canGoNext: boolean;
    canGoPrevious: boolean;
}

export function usePagination<T>({ data, itemsPerPage, storageKey }: UsePaginationProps<T>): UsePaginationReturn<T> {
    const [currentPage, setCurrentPage] = useState(() => {
        if (storageKey && typeof window !== 'undefined') {
            try {
                const stored = localStorage.getItem(`pagination_${storageKey}`);
                return stored ? parseInt(stored, 10) : 1;
            } catch (error) {
                console.warn('Failed to read from localStorage:', error);
                return 1;
            }
        }
        return 1;
    });

    useEffect(() => {
        if (storageKey && typeof window !== 'undefined') {
            try {
                localStorage.setItem(`pagination_${storageKey}`, currentPage.toString());
            } catch (error) {
                console.warn('Failed to write to localStorage:', error);
            }
        }
    }, [currentPage, storageKey]);

    const paginationData = useMemo(() => {
        if (!data || !Array.isArray(data)) {
            return {
                paginatedData: [] as T[],
                totalPages: 0,
                startIndex: 0,
                endIndex: 0,
            };
        }

        // If data length is less than or equal to items per page, return data as-is
        if (data.length <= itemsPerPage) {
            return {
                paginatedData: data,
                totalPages: 1,
                startIndex: data.length > 0 ? 1 : 0,
                endIndex: data.length,
            };
        }

        const totalPages = Math.ceil(data.length / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedData = data.slice(startIndex, endIndex);

        return {
            paginatedData,
            totalPages,
            startIndex: startIndex + 1, // 1-based index for display
            endIndex: Math.min(endIndex, data.length),
        };
    }, [data, currentPage, itemsPerPage]);

    const goToPage = (page: number) => {
        const validPage = Math.max(1, Math.min(page, paginationData.totalPages));
        setCurrentPage(validPage);
    };

    const nextPage = () => {
        setCurrentPage(prev => Math.min(paginationData.totalPages, prev + 1));
    };

    const previousPage = () => {
        setCurrentPage(prev => Math.max(1, prev - 1));
    };

    const canGoNext = currentPage < paginationData.totalPages;
    const canGoPrevious = currentPage > 1;

    return {
        currentPage,
        ...paginationData,
        goToPage,
        nextPage,
        previousPage,
        canGoNext,
        canGoPrevious,
    };
} 