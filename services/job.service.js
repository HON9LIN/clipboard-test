export const JobService = {
    filters: async () => {
        return fetch('/api/filters').then(res => res.json());
    },
    query: async (keyword, sortType, sortDirection) => {
        return fetch(`/api/jobs?keyword=${keyword}&sortType=${sortType}&sortDirection=${sortDirection}`).then(res => res.json());
    }
};
